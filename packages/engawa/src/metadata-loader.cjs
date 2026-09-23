const path = require("node:path");
const ts = require("typescript");

module.exports = function engawaMetadataLoader() {
  this.cacheable?.(true);

  const configPath = ts.findConfigFile(
    path.dirname(this.resourcePath),
    ts.sys.fileExists,
    "tsconfig.json",
  );

  if (!configPath) {
    throw new Error(`No tsconfig.json found from ${this.resourcePath}.`);
  }

  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) throw new Error(formatDiagnostic(config.error));

  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    path.dirname(configPath),
  );
  const program = ts.createProgram({
    rootNames: [...new Set([...parsed.fileNames, this.resourcePath])],
    options: parsed.options,
  });
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(this.resourcePath);

  if (!source) {
    throw new Error(`Engawa component collection not found: ${this.resourcePath}`);
  }

  const moduleSymbol = checker.getSymbolAtLocation(source);
  if (!moduleSymbol) {
    throw new Error(`${this.resourcePath} is not an inspectable module.`);
  }

  const metadata = {};
  const dependencies = new Set([configPath, this.resourcePath]);

  for (const exported of checker
    .getExportsOfModule(moduleSymbol)
    .sort((left, right) => left.name.localeCompare(right.name))) {
    const symbol =
      exported.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(exported)
        : exported;

    if (!(symbol.flags & ts.SymbolFlags.Value)) continue;

    const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
    if (!declaration) {
      throw new Error(`${exported.name} has no inspectable declaration.`);
    }
    dependencies.add(declaration.getSourceFile().fileName);

    const signature = checker
      .getTypeOfSymbolAtLocation(symbol, declaration)
      .getCallSignatures()[0];
    const parameter = signature?.getParameters()[0];

    if (!signature || !parameter) {
      throw new Error(
        `${exported.name} must be a function with one props parameter.`,
      );
    }

    const description = documentation(symbol, checker);

    const parameterDeclaration =
      parameter.valueDeclaration ?? parameter.declarations?.[0];
    if (!parameterDeclaration) {
      throw new Error(`${exported.name}'s props cannot be inspected.`);
    }
    dependencies.add(parameterDeclaration.getSourceFile().fileName);

    const propsType = checker.getTypeOfSymbolAtLocation(
      parameter,
      parameterDeclaration,
    );
    addTypeDependencies(propsType, dependencies);

    const props = {};
    let children = false;

    for (const property of checker.getPropertiesOfType(propsType)) {
      // Host/React internals and Engawa-forbidden props stay out of the agent schema.
      if (
        /^on/i.test(property.name) ||
        property.name === "ref" ||
        property.name === "key" ||
        property.name === "className" ||
        property.name === "style" ||
        property.name === "dangerouslySetInnerHTML"
      ) {
        continue;
      }

      const propertyDeclaration =
        property.valueDeclaration ?? property.declarations?.[0];
      if (propertyDeclaration) {
        dependencies.add(propertyDeclaration.getSourceFile().fileName);
      }

      const propertyDescription = documentation(property, checker);
      const propertyType = propertyDeclaration
        ? checker.getTypeOfSymbolAtLocation(property, propertyDeclaration)
        : checker.getTypeOfSymbol(property);
      addTypeDependencies(propertyType, dependencies);
      const parts = propertyType.isUnion() ? propertyType.types : [propertyType];
      const nullable = parts.some(
        (part) => (part.flags & ts.TypeFlags.Null) !== 0,
      );
      const optional =
        (property.flags & ts.SymbolFlags.Optional) !== 0 ||
        parts.some((part) => (part.flags & ts.TypeFlags.Undefined) !== 0);

      if (property.name === "children") {
        children = { description: propertyDescription, optional };
        continue;
      }

      const valueParts = parts.filter(
        (part) =>
          (part.flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)) === 0,
      );

      // A prop that accepts a React element is a slot: the renderer hydrates
      // serialized nodes into it, like children. ReactNode's own null is not
      // an agent-facing value, since absent props are omitted.
      if (
        valueParts.some((part) => part.getSymbol()?.getName() === "ReactElement")
      ) {
        props[property.name] = {
          description: propertyDescription,
          nullable: false,
          optional,
          type: "node",
        };
        continue;
      }

      const literals = literalEnum(valueParts);
      if (literals) {
        props[property.name] = {
          description: propertyDescription,
          enum: literals.enum,
          nullable,
          optional,
          type: literals.type,
        };
        continue;
      }

      const tokensAndNumber = stringEnumAndNumber(valueParts);
      if (tokensAndNumber) {
        props[property.name] = {
          description: propertyDescription,
          enum: tokensAndNumber.enum,
          nullable,
          optional,
          type: tokensAndNumber.type,
        };
        continue;
      }

      const kinds = serializableKinds(valueParts, checker);

      // Engawa-forbidden and non-payload members are omitted above / here.
      // Declared props that are simply outside the current serializable slice must
      // fail loudly so authors are not surprised by silent schema gaps.
      if (kinds.length === 0) {
        if (isNonPayloadType(valueParts)) continue;

        throw new Error(
          `${exported.name}.${property.name} uses unsupported type ${checker.typeToString(propertyType)}. ` +
            "The current registration slice accepts boolean, number, string, array, and object props.",
        );
      }

      props[property.name] = {
        description: propertyDescription,
        nullable,
        optional,
        type: kinds.length === 1 ? kinds[0] : kinds,
      };
    }

    metadata[exported.name] = { children, description, props };
  }

  if (Object.keys(metadata).length === 0) {
    throw new Error(`${this.resourcePath} exports no Engawa components.`);
  }

  for (const dependency of dependencies) this.addDependency(dependency);

  return `export default ${JSON.stringify(metadata)};`;
};

function documentation(symbol, checker) {
  return ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();
}

function addTypeDependencies(type, dependencies) {
  for (const symbol of [type.aliasSymbol, type.getSymbol()]) {
    for (const declaration of symbol?.declarations ?? []) {
      dependencies.add(declaration.getSourceFile().fileName);
    }
  }

  if (type.isUnionOrIntersection()) {
    for (const part of type.types) addTypeDependencies(part, dependencies);
  }
}

function formatDiagnostic(diagnostic) {
  return ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
}

function literalEnum(types) {
  if (types.length === 0) return undefined;

  const values = [];
  let kind;

  for (const type of types) {
    if ((type.flags & ts.TypeFlags.StringLiteral) !== 0) {
      if (kind !== undefined && kind !== "string") return undefined;
      if (typeof type.value !== "string") return undefined;
      kind = "string";
      values.push(type.value);
      continue;
    }

    if ((type.flags & ts.TypeFlags.NumberLiteral) !== 0) {
      if (kind !== undefined && kind !== "number") return undefined;
      if (typeof type.value !== "number") return undefined;
      kind = "number";
      values.push(type.value);
      continue;
    }

    return undefined;
  }

  return { type: kind, enum: values };
}

function stringEnumAndNumber(types) {
  if (types.length === 0) return undefined;

  const values = [];
  let hasNumber = false;

  for (const type of types) {
    if ((type.flags & ts.TypeFlags.StringLiteral) !== 0) {
      if (typeof type.value !== "string") return undefined;
      values.push(type.value);
      continue;
    }

    if (
      (type.flags & ts.TypeFlags.Number) !== 0 &&
      (type.flags & ts.TypeFlags.NumberLiteral) === 0
    ) {
      hasNumber = true;
      continue;
    }

    return undefined;
  }

  if (values.length === 0 || !hasNumber) return undefined;
  return { type: ["string", "number"], enum: values };
}

function serializableKinds(types, checker) {
  const kinds = [];

  for (const type of types) {
    if ((type.flags & ts.TypeFlags.BooleanLike) !== 0) {
      if (!kinds.includes("boolean")) kinds.push("boolean");
      continue;
    }

    if ((type.flags & ts.TypeFlags.NumberLike) !== 0) {
      if (!kinds.includes("number")) kinds.push("number");
      continue;
    }

    if ((type.flags & ts.TypeFlags.StringLike) !== 0) {
      if (!kinds.includes("string")) kinds.push("string");
      continue;
    }

    if (checker.isArrayType(type) || checker.isTupleType(type)) {
      if (!kinds.includes("array")) kinds.push("array");
      continue;
    }

    if (isPlainObjectType(type, checker)) {
      if (!kinds.includes("object")) kinds.push("object");
    }
  }

  return kinds;
}

function isPlainObjectType(type, checker) {
  if ((type.flags & ts.TypeFlags.Object) === 0) return false;
  if (type.getCallSignatures().length > 0) return false;
  if (type.getConstructSignatures().length > 0) return false;
  if (checker.isArrayType(type) || checker.isTupleType(type)) return false;

  const name = type.aliasSymbol?.getName() ?? type.getSymbol()?.getName();
  if (
    name === "ReactElement" ||
    name === "Element" ||
    name === "ReactNode" ||
    name === "Function" ||
    name === "Date"
  ) {
    return false;
  }

  return true;
}

function isNonPayloadType(types) {
  return (
    types.length > 0 &&
    types.every((type) => {
      if (type.getCallSignatures().length > 0) return true;
      if (type.getConstructSignatures().length > 0) return true;

      const name = type.getSymbol()?.getName();
      return (
        name === "ReactElement" || name === "Element" || name === "ReactNode"
      );
    })
  );
}
