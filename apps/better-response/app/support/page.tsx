import type { Metadata } from "next";

import "../styles.css";

export const metadata: Metadata = {
  title: "Support · Better Response",
  description: "How to report a problem with Better Response or ask a question.",
};

export default function Support() {
  return (
    <main className="legal">
      <section>
        <h1>Support</h1>
        <p className="updated">Last updated 22 September 2026</p>

        <p>
          Problems, questions, and suggestions all go to the public issue
          tracker:
        </p>
        <p>
          <a href="https://github.com/dzhunka/better-response/issues">
            github.com/dzhunka/better-response/issues
          </a>
        </p>
        <p>
          Better Response is a free, noncommercial project maintained by one
          person, so support is best-effort rather than a guaranteed response
          time. Issues are handled in the open so other people can find the
          answer.
        </p>

        <h2>Reporting a problem</h2>
        <p>
          The most useful report says which agent host you were using, what you
          asked for, what the interface showed, and what you expected instead. A
          screenshot of the rendered view usually settles it faster than a
          description.
        </p>

        <h2>Privacy when reporting</h2>
        <p>
          An issue you open is public. Redact anything from your conversation
          you would not want published before pasting it in.
        </p>

        <p className="back">
          <a href="/">Back to Better Response</a>
        </p>
      </section>
    </main>
  );
}
