import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerCreateLightningAddressTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "create_lightning_address",
    {
      title: "Create Lightning Address",
      description: "Creates a new lightning address for an app.",
      inputSchema: {
        address: z.string().min(1),
        appId: z.number().int(),
      },
      outputSchema: {},
    },
    async (params) => {
      await client.post<void>("/api/lightning-addresses", params);
      return {
        content: [
          {
            type: "text",
            text: `Lightning address ${params.address} created for app ${params.appId}`,
          },
        ],
        structuredContent: {},
      };
    }
  );
}
