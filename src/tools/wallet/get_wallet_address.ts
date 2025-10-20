import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetWalletAddressTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_wallet_address",
    {
      title: "Get Wallet Address",
      description: "Get an unused onchain address",
      inputSchema: {},
      outputSchema: {
        address: z.string().describe("Unused onchain address"),
      },
    },
    async () => {
      const address = await client.get<string>("/api/wallet/address");
      return {
        content: [{ type: "text", text: address }],
        structuredContent: { address },
      };
    }
  );
}
