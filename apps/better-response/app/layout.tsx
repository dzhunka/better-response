import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Better Response",
  description:
    "Turn conversational context into an interface that is easier to use than a static response.",
  icons: {
    icon: "/better-response.svg",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
