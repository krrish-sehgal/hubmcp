import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerListAppsTool(server: McpServer, client: HubHttpClient) {
  server.registerTool(
    "list_apps",
    {
      title: "List Apps",
      description:
        "Lists all connected apps (NWC clients) with optional filters.",
      inputSchema: {
        limit: z.number().int().optional(),
        offset: z.number().int().optional(),
        name: z.string().optional(),
        appStoreAppId: z.string().optional(),
        unused: z.boolean().optional(),
        subWallets: z.boolean().optional(),
      },
      outputSchema: {
        apps: z.array(z.unknown()),
        totalCount: z.number().int(),
      },
    },
    async (params) => {
      const apps = await client.get<any>("/api/apps", params);
      return {
        content: [{ type: "text", text: JSON.stringify(apps, null, 2) }],
        structuredContent: apps,
      };
    }
  );
}
