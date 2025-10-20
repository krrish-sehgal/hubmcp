import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerCreateAppTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "create_app",
    {
      title: "Create App",
      description: "Creates a new app connection (NWC client).",
      inputSchema: {
        name: z.string().min(1),
        pubkey: z.string().min(1),
        maxAmount: z.number().int().optional(),
        budgetRenewal: z.string().optional(),
        expiresAt: z.string().optional(),
        scopes: z.array(z.string()).optional(),
        isolated: z.boolean().optional(),
        metadata: z.unknown().optional(),
        returnTo: z.string().optional(),
        unlockPassword: z.string().optional(),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.post<any>("/api/apps", params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
