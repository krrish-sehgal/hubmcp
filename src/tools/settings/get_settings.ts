import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetSettingsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_settings",
    {
      title: "Get Settings",
      description: "Retrieves hub configuration settings.",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      // The correct endpoint is /api/info
      const result = await client.get<any>("/api/info");
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
