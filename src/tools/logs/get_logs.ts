import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetLogsTool(server: McpServer, client: HubHttpClient) {
  server.registerTool(
    "get_logs",
    {
      title: "Get Logs",
      description: "Retrieves application logs for debugging and monitoring.",
      inputSchema: {
        limit: z.number().int().optional(),
        offset: z.number().int().optional(),
      },
      outputSchema: {},
    },
    async (params) => {
      const queryParams = new URLSearchParams();
      if (params.limit) queryParams.append("limit", params.limit.toString());
      if (params.offset) queryParams.append("offset", params.offset.toString());

      const url = `/api/logs${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;
      const result = await client.get<any>(url);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
