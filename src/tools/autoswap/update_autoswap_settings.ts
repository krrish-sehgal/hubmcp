import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerUpdateAutoswapSettingsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "update_autoswap_settings",
    {
      title: "Update Autoswap Settings",
      description:
        "Enables and configures autoswap to automatically swap Lightning funds to on-chain when balance exceeds threshold. **Requires full access token.**",
      inputSchema: {
        balanceThreshold: z
          .number()
          .int()
          .describe(
            "Balance threshold in satoshis - autoswap triggers when Lightning balance exceeds this"
          ),
        swapAmount: z
          .number()
          .int()
          .describe("Amount in satoshis to swap out each time"),
        destination: z
          .string()
          .describe("Bitcoin on-chain address to receive swapped funds"),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.post<any>("/api/autoswap", {
        balanceThreshold: params.balanceThreshold,
        swapAmount: params.swapAmount,
        destination: params.destination,
      });
      return {
        content: [
          { type: "text", text: "Autoswap settings updated successfully" },
        ],
      };
    }
  );
}
