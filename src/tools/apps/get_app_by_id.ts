import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetAppByIdTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_app_by_id",
    {
      title: "Get App By ID",
      description: "Gets app details by ID.",
      inputSchema: {
        id: z.number().int(),
      },
      outputSchema: {
        app: z.unknown(),
      },
    },
    async (params) => {
      const app = await client.get<any>(`/api/v2/apps/${params.id}`);
      return {
        content: [{ type: "text", text: JSON.stringify(app, null, 2) }],
        structuredContent: { app },
      };
    }
  );
}
