import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetSwapOutInfoTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_swap_out_info",
    {
      title: "Get Swap Out Info",
      description:
        "Retrieves fee and limit information for swap out operations (Lightning to On-chain).",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      const result = await client.get<any>("/api/swaps/out/info");
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}

export function registerGetSwapInInfoTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_swap_in_info",
    {
      title: "Get Swap In Info",
      description:
        "Retrieves fee and limit information for swap in operations (On-chain to Lightning).",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      const result = await client.get<any>("/api/swaps/in/info");
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
