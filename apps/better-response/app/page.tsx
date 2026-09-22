import { ChatWindow } from "./chat-window";
import { CopyAddress } from "./copy-address";
import { DemoCard } from "./demo-card";
import { Mark } from "./mark";
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
            <Mark />
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

          <ChatWindow />

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
                      <Mark className="solid" />
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
