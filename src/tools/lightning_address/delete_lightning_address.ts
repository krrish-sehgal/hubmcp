import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerDeleteLightningAddressTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "delete_lightning_address",
    {
      title: "Delete Lightning Address",
      description: "Deletes a lightning address for an app.",
      inputSchema: {
        appId: z.number().int(),
      },
      outputSchema: {},
    },
    async (params) => {
      await client.request<void>(`/api/lightning-addresses/${params.appId}`, {
        method: "DELETE",
      });
      return {
        content: [
          {
            type: "text",
            text: `Lightning address for app ${params.appId} deleted`,
          },
        ],
        structuredContent: {},
      };
    }
  );
}
