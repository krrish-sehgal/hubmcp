import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetNodeStatusTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_node_status",
    {
      title: "Get Node Status",
      description:
        "Retrieves the current status and connection info of the lightning node.",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      const result = await client.get<any>("/api/node/status");
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
