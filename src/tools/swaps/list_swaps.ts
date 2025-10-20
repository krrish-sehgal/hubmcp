import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerListSwapsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "list_swaps",
    {
      title: "List Swaps",
      description:
        "Lists all submarine swaps (onchain <-> lightning exchanges).",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      const result = await client.get<any>("/api/swaps");
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
