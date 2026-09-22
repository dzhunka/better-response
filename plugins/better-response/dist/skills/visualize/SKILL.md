---
name: visualize
description: Improve the agent's current reply with a usable view via Better Response Visualize. Always use when the user selects this skill, invokes /visualize, or asks to visualize. Also use proactively when a view would be materially easier to use than static prose or Markdown. Call the Visualize MCP visualize tool; do not substitute a Markdown response. Do not use when a view adds no practical value or input must return to the agent.
---

# Visualize

1. Use the current conversation as the source; do not ask the user to restate it.
2. Always call the Visualize MCP `visualize` tool. Follow that tool's schema and component contract exactly.
3. Preserve the conversation's facts and choose the smallest interface shape that materially improves usability.
4. Treat controls as local-only. Do not use them when the user's choice or input must reach the agent, and do not claim that their state is sent back.
5. When this skill triggers proactively, call the tool directly without first asking whether the user wants a view.

Do not generate application code or substitute a Markdown response for the tool call.
