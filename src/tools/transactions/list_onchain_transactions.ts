import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerListOnchainTransactionsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "list_onchain_transactions",
    {
      title: "List Onchain Transactions",
      description: "List onchain transactions from the node",
      inputSchema: {},
      outputSchema: {
        transactions: z.array(z.unknown()).describe("Onchain transactions"),
      },
    },
    async () => {
      const txs = await client.get<any[]>("/api/node/transactions");
      return {
        content: [{ type: "text", text: JSON.stringify(txs, null, 2) }],
        structuredContent: { transactions: txs },
      };
    }
  );
}
