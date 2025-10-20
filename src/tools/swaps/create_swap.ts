import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerCreateSwapTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "create_swap",
    {
      title: "Create Swap",
      description:
        "Creates a new submarine swap to exchange onchain bitcoin for lightning or vice versa.",
      inputSchema: {
        amount: z.number().int(),
        direction: z.enum(["onchain_to_lightning", "lightning_to_onchain"]),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.post<any>("/api/swaps", params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
