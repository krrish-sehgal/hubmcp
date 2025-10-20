import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetLightningAddressByIdTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_lightning_address_by_id",
    {
      title: "Get Lightning Address By ID",
      description: "Retrieves a lightning address by its app ID.",
      inputSchema: {
        appId: z.number().int(),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.get<any>(
        `/api/lightning-addresses/${params.appId}`
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
