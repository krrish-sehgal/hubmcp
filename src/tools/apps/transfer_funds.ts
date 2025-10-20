import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerTransferFundsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "transfer_funds",
    {
      title: "Transfer Funds",
      description: "Transfers funds between sub-wallets/apps.",
      inputSchema: {
        amountSat: z.number().int(),
        fromAppId: z.number().int().optional(),
        toAppId: z.number().int().optional(),
      },
      outputSchema: {},
    },
    async (params) => {
      await client.post<void>("/api/transfers", params);
      return {
        content: [
          {
            type: "text",
            text: `Transfer of ${params.amountSat} sats initiated`,
          },
        ],
        structuredContent: {},
      };
    }
  );
}
