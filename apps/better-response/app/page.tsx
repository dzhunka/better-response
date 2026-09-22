import { CopyAddress } from "./copy-address";
import "./styles.css";

const MCP_URL = "https://betterresponse.vercel.app/api/mcp";
const CURSOR_DEEPLINK =
  "cursor://anysphere.cursor-deeplink/mcp/install?name=visualize&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vYmV0dGVycmVzcG9uc2UudmVyY2VsLmFwcC9hcGkvbWNwIn0=";

const MARKDOWN_REPLY = `Here's how the three builds compare:

| Build | Price | kg | Available | Worth it |
| --- | --- | --- | --- | --- |
| Attain SLX | EUR 1399 | 9.6 | March 2026 | Yes, if you want the lighter build |
| Attain Pro | EUR 1099 | 10.1 | February 2026 | Reasonable middle option |
| Attain Race | EUR 899 | 10.7 | May 2026 | Only on a tight budget |

Prices are manufacturer recommended and availability varies by region.`;

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <div className="inner">
          <a className="wordmark" href="/">
            <svg viewBox="0 -131.5 1449 1449" fill="currentColor" aria-hidden="true">
              <path d="M123 250.926C123 175.816 183.889 114.926 259 114.926H906V114.926C906 265.148 784.221 386.926 634 386.926H259C183.889 386.926 123 326.037 123 250.926V250.926Z" />
              <path d="M123 592.926C123 517.816 183.889 456.926 259 456.926H634C784.221 456.926 906 578.705 906 728.926V728.926H259C183.889 728.926 123 668.037 123 592.926V592.926Z" />
              <path d="M963 729C963 578.779 1084.78 457 1235 457H1292.09C1310.27 457 1325 471.733 1325 489.906V593C1325 668.111 1264.11 729 1189 729H963V729Z" />
              <rect x="124.118" y="799.295" width="1201.99" height="271.705" rx="135.853" />
            </svg>
            Better Response
          </a>
          <span className="pill">Early preview</span>
          <span className="spacer" />
          <a href="https://github.com/dzhunka/better-response">GitHub</a>
          <a className="action" href="#install">
            Add to your agent
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="inner">
          <h1>Some answers shouldn’t arrive as a wall of text.</h1>
          <p className="lede">
            Better Response is a free plugin for the agent you already use. When
            an answer would be easier to work through as an interface, your agent
            builds one and puts it in the conversation.
          </p>

          <div className="actions">
            <a className="action" href="#install">
              Add to your agent
            </a>
            <CopyAddress value={MCP_URL} label="Copy the address" />
          </div>

          <div className="frame">
            <header>
              <span className="mono">your conversation</span>
              <span className="spacer" />
              <span className="dot" />
              <span className="mono">live render</span>
            </header>
            <div className="turns">
              <p className="said mono">what do I need for pasta night?</p>
              <p className="replied">Four things. Tick them off as you go.</p>
            </div>
            <iframe
              src="/demo?view=checklist"
              title="A shopping list rendered by Better Response"
            />
          </div>
        </div>
      </section>

      <section className="band">
        <div className="inner">
          <h2>The same answer, twice.</h2>
          <p className="lede">
            Your agent did the same work either way. The only thing that changes
            is what lands in the conversation. Both panels hold the same three
            bike builds, and the interface is rendered live by the same code that
            runs inside your agent.
          </p>

          <div className="compare">
            <figure>
              <figcaption>What it would have sent</figcaption>
              <pre className="mono">{MARKDOWN_REPLY}</pre>
            </figure>
            <figure className="structured">
              <figcaption>What it sends instead</figcaption>
              <iframe
                src="/demo"
                title="A comparison rendered by Better Response"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="band" id="install">
        <div className="inner">
          <h2>Add it to your agent.</h2>
          <p className="lede">
            Better Response is one address. Point your agent at it and the
            capability shows up in your next conversation. There is no account
            and no key.
          </p>

          <p className="address">
            <code className="mono">{MCP_URL}</code>
            <CopyAddress value={MCP_URL} label="Copy" />
          </p>

          <div className="hosts">
            <article>
              <div className="head">
                <h3>Cursor</h3>
                <span className="pill">
                  <span className="dot" />
                  Verified
                </span>
              </div>
              <a className="action" href={CURSOR_DEEPLINK}>
                Add to Cursor
              </a>
              <p>
                Or open Settings → MCP → New MCP Server and add the address above
                as an <code className="mono">http</code> server.
              </p>
            </article>

            <article>
              <div className="head">
                <h3>Codex</h3>
                <span className="pill">
                  <span className="dot" />
                  Verified
                </span>
              </div>
              <code className="block mono">
                codex mcp add visualize --url {MCP_URL}
              </code>
              <p>
                The entry lands in <code className="mono">~/.codex/config.toml</code>.
                Run <code className="mono">/mcp</code> in the Codex TUI to confirm
                it loaded.
              </p>
            </article>

            <article>
              <div className="head">
                <h3>Claude</h3>
                <span className="pill">Not tested yet</span>
              </div>
              <p>
                Go to Customize → Connectors, choose Add custom connector, and
                paste the address. On Team and Enterprise plans an owner adds it
                under Organization settings → Connectors.
              </p>
            </article>

            <article>
              <div className="head">
                <h3>ChatGPT</h3>
                <span className="pill">Not tested yet</span>
              </div>
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
        </div>
      </section>

      <footer>
        <div className="inner">
          <p className="site-links">
            <a href="https://github.com/dzhunka/better-response">GitHub</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/support">Support</a>
          </p>
          <p className="colophon">
            Free and noncommercial. MIT licensed. Made by dzhunka.
          </p>
          <p className="mission">Tools for agents. Software for humans.</p>
        </div>
      </footer>
    </main>
  );
}
