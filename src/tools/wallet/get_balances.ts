import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";
import { BalancesResponse } from "../../types.js";

export function registerGetBalancesTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_balances",
    {
      title: "Get Balances",
      description:
        "Get current lightning and onchain balances from Alby Hub (readonly operation)",
      inputSchema: {},
      outputSchema: {
        onchain: z
          .object({
            spendable: z.number().describe("Spendable onchain balance"),
            total: z.number().describe("Total onchain balance"),
          })
          .nullish()
          .describe("Onchain balance information"),
        lightning: z
          .object({
            totalSpendable: z
              .number()
              .describe("Total spendable lightning balance"),
            totalReceivable: z
              .number()
              .describe("Total receivable lightning balance"),
            nextMaxSpendable: z
              .number()
              .describe("Next maximum spendable amount"),
            nextMaxReceivable: z
              .number()
              .describe("Next maximum receivable amount"),
          })
          .nullish()
          .describe("Lightning balance information"),
      },
    },
    async () => {
      try {
        const balances = await client.get<BalancesResponse>("/api/balances");

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(balances, null, 2),
            },
          ],
          structuredContent: balances,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to get balances: ${errorMessage}`);
      }
    }
  );
}
