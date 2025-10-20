import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerLookupTransactionTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "lookup_transaction",
    {
      title: "Lookup Transaction",
      description: "Lookup a transaction by payment hash",
      inputSchema: {
        paymentHash: z.string().min(1).describe("Payment hash"),
      },
      outputSchema: {
        // Transaction shape varies by backend; expose as passthrough
        transaction: z.unknown().describe("Transaction details"),
      },
    },
    async (params) => {
      const result = await client.get<any>(
        `/api/transactions/${encodeURIComponent(params.paymentHash)}`
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: { transaction: result },
      };
    }
  );
}
