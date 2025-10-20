import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetWalletCapabilitiesTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_wallet_capabilities",
    {
      title: "Get Wallet Capabilities",
      description: "Get NWC-like capabilities for the connected wallet",
      inputSchema: {},
      outputSchema: {
        scopes: z.array(z.string()).describe("Available scopes"),
        methods: z.array(z.string()).describe("Available methods"),
        notificationTypes: z
          .array(z.string())
          .describe("Available notification types"),
      },
    },
    async () => {
      const caps = await client.get<any>("/api/wallet/capabilities");
      return {
        content: [{ type: "text", text: JSON.stringify(caps, null, 2) }],
        structuredContent: caps,
      };
    }
  );
}
