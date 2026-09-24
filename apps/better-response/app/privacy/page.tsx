import type { Metadata } from "next";

import "../styles.css";

export const metadata: Metadata = {
  title: "Privacy Policy · Better Response",
  description: "What Better Response receives, what it stores, and for how long.",
};

export default function Privacy() {
  return (
    <main className="legal">
      <section>
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated 22 September 2026</p>

        <p>
          Better Response is a free, noncommercial plugin published by dzhunka.
          It has no accounts, no sign-in, no cookies, and no analytics. This
          policy describes the only data that reaches it.
        </p>

        <h2>What it receives</h2>
        <p>
          Better Response exposes one tool, <code>visualize</code>. When your
          agent calls it, the plugin receives a single argument: the interface
          tree the agent authored. That tree is written by your agent from your
          conversation, so whatever the agent chooses to put on screen — labels,
          list items, table values — arrives with the call. The plugin has no
          access to the rest of the conversation, to your files, or to anything
          your agent did not place in that tree.
        </p>
        <p>
          The tool is the only entry point. Better Response does not read from
          or write to any other system on your behalf.
        </p>

        <h2>What it stores</h2>
        <p>
          Nothing. The server renders the tree back to your agent host and keeps
          no copy. There is no database, no file store, and no logging of tool
          payloads in production. Retention is therefore zero: there is nothing
          to delete, export, or request a copy of.
        </p>
        <p>
          The interface renders inside a sandboxed frame supplied by your agent
          host. Anything you do there — ticking a box, sorting a column — stays
          in that frame&apos;s memory and is discarded when it closes. Those
          interactions are never sent back to the plugin.
        </p>

        <h2>Hosting</h2>
        <p>
          The service runs on Vercel, which processes each request in order to
          serve it and records ordinary operational request metadata such as IP
          address, user agent, and timestamp under its own retention defaults.
          Better Response does not export, analyse, enrich, or retain that data.
        </p>

        <h2>Who else sees it</h2>
        <p>
          No one. Data is not sold, shared with advertisers, passed to
          analytics providers, or used to train any model. Vercel, as the
          hosting provider described above, is the only third party involved.
        </p>

        <h2>Your controls</h2>
        <p>
          Better Response acts only when your agent calls it, and it holds
          nothing afterwards. Uninstalling the plugin from your agent host stops
          every call and leaves no residue to erase.
        </p>

        <h2>Changes and contact</h2>
        <p>
          Material changes to this policy will be published on this page with a
          new date. Questions go to{" "}
          <a href="https://github.com/Enkind/better-response/issues">
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
