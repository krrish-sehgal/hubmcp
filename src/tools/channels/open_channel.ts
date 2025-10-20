import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerOpenChannelTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "open_channel",
    {
      title: "Open Channel",
      description: "Open a lightning channel to a peer (full access)",
      inputSchema: {
        pubkey: z.string().min(1).describe("Peer node public key"),
        capacity: z
          .number()
          .int()
          .positive()
          .describe("Channel capacity in sats"),
        public: z.boolean().nullish().describe("Whether channel is public"),
        host: z.string().nullish().describe("Peer host (optional)"),
        port: z
          .number()
          .int()
          .positive()
          .nullish()
          .describe("Peer port (optional)"),
      },
      outputSchema: {
        fundingTxId: z.string().nullish().describe("Funding transaction ID"),
      },
    },
    async (params) => {
      const result = await client.post<any>("/api/channels", {
        pubkey: params.pubkey,
        capacity: params.capacity,
        public: params.public ?? undefined,
        host: params.host ?? undefined,
        port: params.port ?? undefined,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
