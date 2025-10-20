import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerDeleteAppTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "delete_app",
    {
      title: "Delete App",
      description: "Deletes an app connection.",
      inputSchema: {
        pubkey: z.string().min(1),
      },
      outputSchema: {},
    },
    async (params) => {
      await client.request<void>(
        `/api/apps/${encodeURIComponent(params.pubkey)}`,
        {
          method: "DELETE",
        }
      );
      return {
        content: [{ type: "text", text: `App ${params.pubkey} deleted` }],
        structuredContent: {},
      };
    }
  );
}
