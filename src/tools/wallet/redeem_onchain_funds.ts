import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerRedeemOnchainFundsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "redeem_onchain_funds",
    {
      title: "Redeem Onchain Funds",
      description: "Send onchain funds to an address (full access)",
      inputSchema: {
        toAddress: z.string().min(1).describe("Destination onchain address"),
        amount: z.number().int().positive().describe("Amount in sats"),
        feeRate: z.number().int().positive().nullish().describe("Fee rate"),
        sendAll: z.boolean().describe("Send all available funds"),
      },
      outputSchema: {
        txId: z.string().describe("Transaction ID"),
      },
    },
    async (params) => {
      const result = await client.post<any>(
        "/api/wallet/redeem-onchain-funds",
        {
          toAddress: params.toAddress,
          amount: params.amount,
          feeRate: params.feeRate || undefined,
          sendAll: params.sendAll,
        }
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
