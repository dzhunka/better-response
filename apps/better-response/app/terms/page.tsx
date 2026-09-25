import type { Metadata } from "next";

import "../styles.css";

export const metadata: Metadata = {
  title: "Terms of Use · Better Response",
  description: "The terms under which Better Response is offered.",
};

export default function Terms() {
  return (
    <main className="legal">
      <section>
        <h1>Terms of Use</h1>
        <p className="updated">Last updated 22 September 2026</p>

        <p>
          These terms cover the Better Response plugin and the service at
          betterresponse.vercel.app, published by dzhunka. Installing or calling
          the plugin means accepting them.
        </p>

        <h2>What the service is</h2>
        <p>
          Better Response is a free, noncommercial plugin. It renders an
          interface your agent authored, in place of a plain-text reply. There
          is no fee, no account, no subscription, and no paid tier.
        </p>

        <h2>Early preview</h2>
        <p>
          The plugin is pre-release software. Its interface vocabulary,
          behaviour, and endpoint may change, and the service may be
          interrupted or withdrawn at any time without notice. Do not rely on
          it where an interruption would cause harm.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Use the service through a supported agent host, as intended. Do not
          attempt to overload, probe, or disrupt the endpoint, and do not use it
          to render content that is unlawful or that infringes someone
          else&apos;s rights.
        </p>

        <h2>Content</h2>
        <p>
          The interface content comes from your agent, not from Better
          Response. You are responsible for what you ask your agent to produce;
          Better Response neither reviews nor stores it.
        </p>

        <h2>No warranty</h2>
        <p>
          The service is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;, without warranty of any kind, express or implied,
          including fitness for a particular purpose and uninterrupted or
          error-free operation.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, the publisher is not liable
          for any indirect, incidental, or consequential loss arising from use
          of the service, including lost data, lost profits, or decisions made
          on the basis of a rendered interface.
        </p>

        <h2>Changes and contact</h2>
        <p>
          Updated terms will be published on this page with a new date.
          Questions go to{" "}
          <a href="https://github.com/enkind/better-response/issues">
            the public issue tracker
          </a>
          .
        </p>

        <p className="back">
          <a href="/">Back to Better Response</a>
        </p>
      </section>
    </main>
  );
}
