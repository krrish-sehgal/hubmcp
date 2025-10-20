import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerListPeersTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "list_peers",
    {
      title: "List Peers",
      description: "Lists all connected lightning peers with details.",
      inputSchema: {},
      outputSchema: {
        peers: z.array(z.unknown()).describe("Peer details array"),
      },
    },
    async () => {
      const peers = await client.get<any[]>("/api/peers");
      return {
        content: [{ type: "text", text: JSON.stringify(peers, null, 2) }],
        structuredContent: { peers },
      };
    }
  );
}
