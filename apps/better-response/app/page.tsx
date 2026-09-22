import "./styles.css";

const MCP_URL = "https://betterresponse.vercel.app/api/mcp";
const CURSOR_DEEPLINK =
  "cursor://anysphere.cursor-deeplink/mcp/install?name=visualize&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vYmV0dGVycmVzcG9uc2UudmVyY2VsLmFwcC9hcGkvbWNwIn0=";

const MARKDOWN_REPLY = `Here's how the three builds compare:

| Build | 2026 price | Weight | Available | Worth the jump |
| --- | --- | --- | --- | --- |
| Attain SLX | EUR 1399 | 9.6 kg | March 2026 | Yes, if you want the lighter build |
| Attain Pro | EUR 1099 | 10.1 kg | February 2026 | Reasonable middle option |
| Attain Race | EUR 899 | 10.7 kg | May 2026 | Only on a tight budget |`;

export default function Home() {
  return (
    <main>
      <section className="hero">
        <img
          className="logo"
          src="/better-response.svg"
          alt=""
          width="112"
          height="112"
        />
        <p className="eyebrow">Better Response · Early preview</p>
        <h1>Make the agent&apos;s reply easier to use than plain text.</h1>
        <p className="description">
          When a conversation is hard to work through as Markdown, Better
          Response turns it into a small interface you can actually use.
        </p>
        <p className="tagline">Tools for agents. Software for humans.</p>
      </section>

      <section className="band">
        <h2>The same answer, twice</h2>
        <p className="lede">
          Your agent already worked out the answer. Better Response changes how
          it hands that answer to you — the interface below is rendered live by
          the same code that runs inside your agent.
        </p>

        <div className="compare">
          <figure>
            <figcaption>Without it</figcaption>
            <pre>{MARKDOWN_REPLY}</pre>
          </figure>
          <figure>
            <figcaption>With it</figcaption>
            <iframe
              src="/demo"
              title="A comparison rendered by Better Response"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section className="band">
        <h2>Add it to your agent</h2>
        <p className="lede">
          Better Response is one address. Point your agent at it and the
          capability shows up in your next conversation — no account, no key,
          nothing to configure.
        </p>
        <p className="endpoint">
          <code>{MCP_URL}</code>
        </p>

        <div className="hosts">
          <article>
            <h3>Cursor</h3>
            <p className="verified">Verified</p>
            <p>
              <a className="action" href={CURSOR_DEEPLINK}>
                Add to Cursor
              </a>
            </p>
            <p>
              Or open Settings → MCP → New MCP Server and add the address above
              as an <code>http</code> server.
            </p>
          </article>

          <article>
            <h3>Codex</h3>
            <p className="verified">Verified</p>
            <p>
              <code className="block">
                codex mcp add visualize --url {MCP_URL}
              </code>
            </p>
            <p>
              The entry lands in <code>~/.codex/config.toml</code>. Run{" "}
              <code>/mcp</code> in the Codex TUI to confirm it loaded.
            </p>
          </article>

          <article>
            <h3>Claude</h3>
            <p className="untested">Untested</p>
            <p>
              Go to Customize → Connectors, choose Add custom connector, and
              paste the address. On Team and Enterprise plans an owner adds it
              under Organization settings → Connectors.
            </p>
          </article>

          <article>
            <h3>ChatGPT</h3>
            <p className="untested">Untested</p>
            <p>
              Turn on Developer mode in Settings, then open{" "}
              <a href="https://chatgpt.com/plugins">chatgpt.com/plugins</a> and
              create an app from the address. Developer mode is web-only.
            </p>
          </article>
        </div>

        <p className="note">
          Better Response draws its interface through MCP Apps. Cursor and Codex
          are the two hosts it has been verified in; Claude and ChatGPT accept
          the address but have not been tested, and a directory listing for each
          is still under review.
        </p>
      </section>

      <footer>
        <p className="site-links">
          <a href="https://github.com/dzhunka/better-response">GitHub</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/support">Support</a>
        </p>
        <p className="colophon">
          Free and noncommercial. MIT licensed. Made by dzhunka.
        </p>
      </footer>
    </main>
  );
}
