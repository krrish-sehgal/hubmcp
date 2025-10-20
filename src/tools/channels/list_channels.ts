import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerListChannelsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "list_channels",
    {
      title: "List Channels",
      description: "List all lightning channels",
      inputSchema: {},
      outputSchema: {
        channels: z.array(z.unknown()).describe("Channel list"),
      },
    },
    async () => {
      const channels = await client.get<any[]>("/api/channels");
      return {
        content: [{ type: "text", text: JSON.stringify(channels, null, 2) }],
        structuredContent: { channels },
      };
    }
  );
}
