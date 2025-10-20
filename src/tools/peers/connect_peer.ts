import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerConnectPeerTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "connect_peer",
    {
      title: "Connect Peer",
      description:
        "Connects to a new lightning peer using pubkey and optional host/port.",
      inputSchema: {
        pubkey: z.string().min(1),
        host: z.string().optional(),
        port: z.number().int().optional(),
      },
      outputSchema: {},
    },
    async (params) => {
      await client.post<void>("/api/peers", {
        pubkey: params.pubkey,
        host: params.host,
        port: params.port,
      });
      return {
        content: [
          { type: "text", text: `Peer ${params.pubkey} connect initiated` },
        ],
        structuredContent: {},
      };
    }
  );
}
