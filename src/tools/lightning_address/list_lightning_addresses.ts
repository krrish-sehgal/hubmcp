import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerListLightningAddressesTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "list_lightning_addresses",
    {
      title: "List Lightning Addresses",
      description: "Lists all lightning addresses for your apps.",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      const result = await client.get<any>("/api/lightning-addresses");
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
