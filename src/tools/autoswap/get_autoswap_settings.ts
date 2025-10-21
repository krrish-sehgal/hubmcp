import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetAutoswapSettingsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_autoswap_settings",
    {
      title: "Get Autoswap Settings",
      description:
        "Retrieves current autoswap configuration settings including enabled status, balance threshold, swap amount, and destination address.",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      const result = await client.get<any>("/api/autoswap");
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
