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
        "Updates autoswap configuration settings to automatically swap between onchain and lightning.",
      inputSchema: {
        enabled: z.boolean().optional(),
        minBalanceSats: z.number().int().optional(),
        maxBalanceSats: z.number().int().optional(),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.request<any>("/api/autoswap/settings", {
        method: "PATCH",
        body: params,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
