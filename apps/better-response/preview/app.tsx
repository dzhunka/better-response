import {
  CheckCircle2Icon,
  CircleAlertIcon,
  RotateCcwIcon,
} from "lucide-react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@better-response/common/ui/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@better-response/common/ui/alert";
import { Badge } from "@better-response/common/ui/badge";
import { Button } from "@better-response/common/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@better-response/common/ui/card";
import { Checkbox } from "@better-response/common/ui/checkbox";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@better-response/common/ui/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "@better-response/common/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@better-response/common/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@better-response/common/ui/tabs";
import "@better-response/common/styles.css";

const root = document.querySelector<HTMLElement>("#app");

if (!root) {
  throw new Error("Missing preview root");
}

function BetterResponsePreview() {
  const [checkedItems, setCheckedItems] = useState([true, false, false]);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const completed = checkedItems.filter(Boolean).length;

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl content-start gap-8 bg-background p-6 text-foreground md:p-10">
      <header className="grid max-w-2xl gap-2">
        <Badge variant="secondary">Exploratory UI compositions</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Better Response with shadcn + Base UI
        </h1>
        <p className="text-muted-foreground">
          These are private composition sketches, not exported components or
          Engawa schema contracts.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Checklist sketch</CardTitle>
            <CardDescription>
              Closed local completion state composed from UI.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Progress value={completed} max={checkedItems.length}>
              <ProgressLabel>Morning setup</ProgressLabel>
              <ProgressValue>
                {(_formattedValue, value) =>
                  `${value ?? 0}/${checkedItems.length}`}
              </ProgressValue>
            </Progress>
            <div className="grid gap-2">
              {["Review priorities", "Clear inbox", "Start focus block"].map(
                (label, index) => (
                  <label
                    className="flex items-center gap-3 rounded-lg border p-3 text-sm"
                    key={label}
                  >
                    <Checkbox
                      checked={checkedItems[index]}
                      onCheckedChange={(checked) => {
                        setCheckedItems((current) =>
                          current.map((value, itemIndex) =>
                            itemIndex === index ? checked : value,
                          ),
                        );
                      }}
                    />
                    <span
                      className={
                        checkedItems[index]
                          ? "text-muted-foreground line-through"
                          : undefined
                      }
                    >
                      {label}
                    </span>
                  </label>
                ),
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCheckedItems([false, false, false])}
            >
              <RotateCcwIcon data-icon="inline-start" />
              Reset
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparison sketch</CardTitle>
            <CardDescription>
              Structured evidence with local focus and disclosure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Option</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Train</TableCell>
                      <TableCell>2h 10m</TableCell>
                      <TableCell>€38</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bus</TableCell>
                      <TableCell>3h</TableCell>
                      <TableCell>€18</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="details">
                <Accordion defaultValue={["tradeoffs"]}>
                  <AccordionItem value="tradeoffs">
                    <AccordionTrigger>Trade-offs</AccordionTrigger>
                    <AccordionContent>
                      Train is faster and more comfortable. Bus is cheaper and
                      has a later departure.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="assumptions">
                    <AccordionTrigger>Assumptions</AccordionTrigger>
                    <AccordionContent>
                      Prices exclude local transit and assume booking today.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quiz sketch</CardTitle>
            <CardDescription>
              A button with complete, component-owned local semantics.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="font-medium">
              Which layer is exposed to the Engawa registry?
            </p>
            <RadioGroup
              value={answer}
              onValueChange={(value) => {
                setAnswer(value);
                setSubmitted(false);
              }}
            >
              {["UI", "Components", "Base UI primitives"].map((label) => (
                <label
                  className="flex items-center gap-3 rounded-lg border p-3 text-sm"
                  key={label}
                >
                  <RadioGroupItem value={label} />
                  {label}
                </label>
              ))}
            </RadioGroup>
            {submitted ? (
              <Alert variant={answer === "Components" ? "default" : "destructive"}>
                {answer === "Components" ? (
                  <CheckCircle2Icon />
                ) : (
                  <CircleAlertIcon />
                )}
                <AlertTitle>
                  {answer === "Components" ? "Correct" : "Not quite"}
                </AlertTitle>
                <AlertDescription>
                  Only serializable components cross the registry boundary.
                </AlertDescription>
              </Alert>
            ) : null}
          </CardContent>
          <CardFooter>
            <Button
              disabled={!answer}
              onClick={() => setSubmitted(true)}
            >
              Check answer
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}

createRoot(root).render(<BetterResponsePreview />);
