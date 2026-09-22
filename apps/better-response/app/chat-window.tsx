"use client";

import { useState } from "react";
import { DemoCard } from "./demo-card";
import { Mark } from "./mark";

const CONVERSATIONS = [
  {
    id: "pasta",
    title: "Pasta night",
    said: "what do I need for pasta night?",
    replied: "Four things. Tick them off as you go.",
    src: "/demo?view=checklist",
    rendered: "A shopping list rendered by Better Response",
  },
  {
    id: "attain",
    title: "2026 Attain builds",
    said: "compare the 2026 Attain builds",
    replied: "All three, side by side.",
    src: "/demo",
    rendered: "A comparison rendered by Better Response",
  },
];

export function ChatWindow() {
  const [openId, setOpenId] = useState(CONVERSATIONS[0].id);
  const open = CONVERSATIONS.find((one) => one.id === openId) ?? CONVERSATIONS[0];

  return (
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

        <span className="row">
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
        {CONVERSATIONS.map((one) => (
          <button
            key={one.id}
            type="button"
            className={one.id === openId ? "past on" : "past"}
            aria-pressed={one.id === openId}
            onClick={() => setOpenId(one.id)}
          >
            {one.title}
          </button>
        ))}
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
            <p className="said">{open.said}</p>
          </li>
          <li>
            <p>{open.replied}</p>
            <p className="app">
              <Mark className="solid" />
              Better Response
            </p>
            <div className="cards">
              {CONVERSATIONS.map((one) => (
                <DemoCard
                  key={one.id}
                  src={one.src}
                  title={one.rendered}
                  inactive={one.id !== openId}
                />
              ))}
            </div>
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
  );
}
