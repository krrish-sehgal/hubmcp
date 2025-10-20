import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerUpdateAppTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "update_app",
    {
      title: "Update App",
      description: "Updates an app's settings.",
      inputSchema: {
        pubkey: z.string().min(1),
        name: z.string().optional(),
        maxAmount: z.number().int().optional(),
        budgetRenewal: z.string().optional(),
        expiresAt: z.string().optional(),
        scopes: z.array(z.string()).optional(),
        isolated: z.boolean().optional(),
        metadata: z.unknown().optional(),
      },
      outputSchema: {},
    },
    async (params) => {
      const { pubkey, ...body } = params;
      await client.request<void>(`/api/apps/${encodeURIComponent(pubkey)}`, {
        method: "PATCH",
        body,
      });
      return {
        content: [{ type: "text", text: `App ${pubkey} updated` }],
        structuredContent: {},
      };
    }
  );
}
