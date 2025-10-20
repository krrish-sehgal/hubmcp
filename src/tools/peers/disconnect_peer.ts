import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerDisconnectPeerTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "disconnect_peer",
    {
      title: "Disconnect Peer",
      description: "Disconnects from a lightning peer.",
      inputSchema: {
        peerId: z.string().min(1),
      },
      outputSchema: {},
    },
    async (params) => {
      await client.request<void>(
        `/api/peers/${encodeURIComponent(params.peerId)}`,
        {
          method: "DELETE",
        }
      );
      return {
        content: [
          { type: "text", text: `Peer ${params.peerId} disconnect initiated` },
        ],
        structuredContent: {},
      };
    }
  );
}
