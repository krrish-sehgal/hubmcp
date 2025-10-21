import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerUpdateSettingsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "update_settings",
    {
      title: "Update Settings",
      description:
        "Updates the hub currency setting. Only currency can be updated via this endpoint.",
      inputSchema: {
        currency: z
          .string()
          .describe("Currency code (e.g., 'USD', 'EUR', 'BTC')"),
      },
      outputSchema: {},
    },
    async (params) => {
      // PATCH /api/settings - only currency can be updated
      const result = await client.request<any>("/api/settings", {
        method: "PATCH",
        body: { currency: params.currency },
      });
      // If 204 No Content, return a success message
      return {
        content: [
          {
            type: "text",
            text: `Currency updated to ${params.currency} successfully (HTTP 204)`,
          },
        ],
      };
    }
  );
}
