import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerListTransactionsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "list_transactions",
    {
      title: "List Transactions",
      description: "List hub transactions with pagination",
      inputSchema: {
        appId: z.number().int().nullish(),
        limit: z.number().int().positive().nullish(),
        offset: z.number().int().nonnegative().nullish(),
      },
      outputSchema: {
        totalCount: z.number().int(),
        transactions: z.array(z.unknown()),
      },
    },
    async (params) => {
      const result = await client.get<any>("/api/transactions", {
        appId: params.appId ?? undefined,
        limit: params.limit ?? undefined,
        offset: params.offset ?? undefined,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
