import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerRebalanceChannelTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "rebalance_channel",
    {
      title: "Rebalance Channel",
      description:
        "Rebalance a channel by routing through a peer (full access)",
      inputSchema: {
        receiveThroughNodePubkey: z
          .string()
          .min(1)
          .describe("Node pubkey to receive through"),
        amountSat: z.number().int().positive().describe("Amount in sats"),
      },
      outputSchema: {
        totalFeeSat: z.number().int().describe("Total fee paid in sats"),
      },
    },
    async (params) => {
      const result = await client.post<any>("/api/channels/rebalance", {
        receiveThroughNodePubkey: params.receiveThroughNodePubkey,
        amountSat: params.amountSat,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
