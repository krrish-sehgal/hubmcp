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
      description: "Updates hub configuration settings.",
      inputSchema: {
        settings: z.record(z.unknown()),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.request<any>("/api/settings", {
        method: "PATCH",
        body: params.settings,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
