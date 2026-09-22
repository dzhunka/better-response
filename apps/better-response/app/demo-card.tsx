"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The render reflows with the width it is given, so its height is only knowable
 * at runtime. The demo document is same-origin, so the card reads that height
 * directly instead of carrying a fixed one per breakpoint.
 */
export function DemoCard({
  src,
  title,
  lazy,
}: {
  src: string;
  title: string;
  lazy?: boolean;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const element = frame.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(() => {
      const body = element.contentDocument?.body;

      if (body) {
        setHeight(body.scrollHeight);
      }
    });

    const watch = () => {
      const body = element.contentDocument?.body;

      if (body) {
        observer.observe(body);
        setHeight(body.scrollHeight);
      }
    };

    element.addEventListener("load", watch);
    watch();

    return () => {
      element.removeEventListener("load", watch);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="card">
      <iframe
        ref={frame}
        src={src}
        title={title}
        loading={lazy ? "lazy" : undefined}
        style={height ? { height } : undefined}
      />
    </div>
  );
}
