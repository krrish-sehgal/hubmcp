import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetNodeConnectionInfoTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_node_connection_info",
    {
      title: "Get Node Connection Info",
      description: "Retrieves connection information for the lightning node.",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      const result = await client.get<any>("/api/node/connection-info");
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
