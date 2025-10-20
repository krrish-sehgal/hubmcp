import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetAppByPubkeyTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_app_by_pubkey",
    {
      title: "Get App By Pubkey",
      description: "Gets app details by pubkey.",
      inputSchema: {
        pubkey: z.string().min(1),
      },
      outputSchema: {
        app: z.unknown(),
      },
    },
    async (params) => {
      const app = await client.get<any>(
        `/api/apps/${encodeURIComponent(params.pubkey)}`
      );
      return {
        content: [{ type: "text", text: JSON.stringify(app, null, 2) }],
        structuredContent: { app },
      };
    }
  );
}
