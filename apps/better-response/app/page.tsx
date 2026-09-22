import { CopyAddress } from "./copy-address";
import { DemoCard } from "./demo-card";
import "./styles.css";

const MCP_URL = "https://betterresponse.vercel.app/api/mcp";
const CURSOR_DEEPLINK =
  "cursor://anysphere.cursor-deeplink/mcp/install?name=visualize&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vYmV0dGVycmVzcG9uc2UudmVyY2VsLmFwcC9hcGkvbWNwIn0=";

const BUILDS = [
  {
    build: "Attain SLX",
    price: "EUR 1,399",
    weight: "9.6",
    worth: "Yes, if you want the lighter build",
  },
  {
    build: "Attain Pro",
    price: "EUR 1,099",
    weight: "10.1",
    worth: "Reasonable middle option",
  },
  {
    build: "Attain Race",
    price: "EUR 899",
    weight: "10.7",
    worth: "Only on a tight budget",
  },
];

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

          <div className="chat window">
            <div className="rail">
              <div className="top">
                <svg viewBox="0 0 20 20" className="solid" aria-hidden="true">
                  <path d="M10 2.5l1.2 4.8a2 2 0 0 0 1.5 1.5L17.5 10l-4.8 1.2a2 2 0 0 0-1.5 1.5L10 17.5l-1.2-4.8a2 2 0 0 0-1.5-1.5L2.5 10l4.8-1.2a2 2 0 0 0 1.5-1.5z" />
                </svg>
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <rect x="2.75" y="4.25" width="14.5" height="11.5" rx="2.25" />
                  <path d="M7.25 4.25v11.5" />
                </svg>
              </div>

              <span className="row on">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M8.5 3.5H5A1.5 1.5 0 0 0 3.5 5v10A1.5 1.5 0 0 0 5 16.5h10a1.5 1.5 0 0 0 1.5-1.5v-3.5" />
                  <path d="M14.1 3.9a1.9 1.9 0 0 1 2.7 2.7L10.4 13 7 14l1-3.4z" />
                </svg>
                New chat
              </span>
              <span className="row">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <circle cx="9" cy="9" r="5.25" />
                  <path d="M12.9 12.9l3.6 3.6" />
                </svg>
                Search chats
              </span>

              <span className="label">Chats</span>
              <span className="past">Pasta night</span>
              <span className="past">Which Attain is the real upgrade</span>
              <span className="past">Rewrite the onboarding email</span>
            </div>

            <div className="pane">
              <div className="bar">
                <span className="picker">
                  Your agent
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6 8.5l4 4 4-4" />
                  </svg>
                </span>
              </div>

              <ol className="thread">
                <li>
                  <p className="said">what do I need for pasta night?</p>
                </li>
                <li>
                  <p>Four things. Tick them off as you go.</p>
                  <p className="app">
                    <svg viewBox="0 -131.5 1449 1449" className="solid" aria-hidden="true">
                      <path d="M123 250.926C123 175.816 183.889 114.926 259 114.926H906V114.926C906 265.148 784.221 386.926 634 386.926H259C183.889 386.926 123 326.037 123 250.926V250.926Z" />
                      <path d="M123 592.926C123 517.816 183.889 456.926 259 456.926H634C784.221 456.926 906 578.705 906 728.926V728.926H259C183.889 728.926 123 668.037 123 592.926V592.926Z" />
                      <path d="M963 729C963 578.779 1084.78 457 1235 457H1292.09C1310.27 457 1325 471.733 1325 489.906V593C1325 668.111 1264.11 729 1189 729H963V729Z" />
                      <rect x="124.118" y="799.295" width="1201.99" height="271.705" rx="135.853" />
                    </svg>
                    Better Response
                  </p>
                  <DemoCard
                    src="/demo?view=checklist"
                    title="A shopping list rendered by Better Response"
                  />
                </li>
              </ol>

              <div className="composer">
                <span className="round">
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 4.5v11M4.5 10h11" />
                  </svg>
                </span>
                <span className="ask">Ask anything</span>
                <span className="round">
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 3.5A2.5 2.5 0 0 1 12.5 6v4a2.5 2.5 0 0 1-5 0V6A2.5 2.5 0 0 1 10 3.5z" />
                    <path d="M5.5 9.75A4.5 4.5 0 0 0 14.5 9.75" />
                    <path d="M10 14.25v2.25" />
                  </svg>
                </span>
                <span className="round send">
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 15.5V5M5.5 9.5L10 5l4.5 4.5" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <p className="caption">
            The window is a mock of the client you already use. The panel inside
            it is not — it is rendered live by the same code your agent runs.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="inner">
          <h2>The same answer, twice.</h2>
          <p className="lede">
            Your agent did the same work either way. The only thing that changes
            is what lands in the conversation. Both answers hold the same three
            bike builds: one you read, one you use.
          </p>

          <div className="compare">
            <figure>
              <figcaption>What it would have sent</figcaption>
              <div className="chat bare">
                <ol className="thread">
                  <li>
                    <p className="said">compare the 2026 Attain builds</p>
                  </li>
                  <li>
                    <p>Here’s how the three builds compare:</p>
                    <div className="rendered">
                      <table>
                        <thead>
                          <tr>
                            <th>Build</th>
                            <th>Price</th>
                            <th>kg</th>
                            <th>Worth it</th>
                          </tr>
                        </thead>
                        <tbody>
                          {BUILDS.map((row) => (
                            <tr key={row.build}>
                              <td>{row.build}</td>
                              <td>{row.price}</td>
                              <td>{row.weight}</td>
                              <td>{row.worth}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p>
                      Prices are manufacturer recommended and availability varies
                      by region.
                    </p>
                  </li>
                </ol>
              </div>
            </figure>

            <figure className="structured">
              <figcaption>What it sends instead</figcaption>
              <div className="chat bare">
                <ol className="thread">
                  <li>
                    <p className="said">compare the 2026 Attain builds</p>
                  </li>
                  <li>
                    <p className="app">
                      <svg viewBox="0 -131.5 1449 1449" className="solid" aria-hidden="true">
                        <path d="M123 250.926C123 175.816 183.889 114.926 259 114.926H906V114.926C906 265.148 784.221 386.926 634 386.926H259C183.889 386.926 123 326.037 123 250.926V250.926Z" />
                        <path d="M123 592.926C123 517.816 183.889 456.926 259 456.926H634C784.221 456.926 906 578.705 906 728.926V728.926H259C183.889 728.926 123 668.037 123 592.926V592.926Z" />
                        <path d="M963 729C963 578.779 1084.78 457 1235 457H1292.09C1310.27 457 1325 471.733 1325 489.906V593C1325 668.111 1264.11 729 1189 729H963V729Z" />
                        <rect x="124.118" y="799.295" width="1201.99" height="271.705" rx="135.853" />
                      </svg>
                      Better Response
                    </p>
                    <DemoCard
                      src="/demo"
                      title="A comparison rendered by Better Response"
                      lazy
                    />
                  </li>
                </ol>
              </div>
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
