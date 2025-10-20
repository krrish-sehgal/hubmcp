import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetNetworkGraphTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_network_graph",
    {
      title: "Get Network Graph",
      description: "Retrieves the lightning network graph data.",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      const result = await client.get<any>("/api/node/network-graph");
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
