import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerCloseChannelTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "close_channel",
    {
      title: "Close Channel",
      description: "Close a lightning channel (full access)",
      inputSchema: {
        peerId: z.string().min(1).describe("Peer ID"),
        channelId: z.string().min(1).describe("Channel ID"),
        force: z.boolean().nullish().describe("Force close"),
      },
      outputSchema: {},
    },
    async (params) => {
      const force = params.force ?? false;
      await client.request<void>(
        `/api/peers/${encodeURIComponent(
          params.peerId
        )}/channels/${encodeURIComponent(params.channelId)}`,
        {
          method: "DELETE",
          query: { force: String(force) },
        }
      );
      return {
        content: [
          { type: "text", text: `Channel ${params.channelId} close initiated` },
        ],
        structuredContent: {},
      } as any;
    }
  );
}
