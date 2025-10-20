import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { HubHttpClient } from "../../http_client.js";

export function registerSyncWalletTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "sync_wallet",
    {
      title: "Sync Wallet",
      description: "Trigger wallet rescan/sync (full access)",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      await client.post<void>("/api/wallet/sync");
      return {
        content: [{ type: "text", text: "Wallet sync triggered" }],
        structuredContent: {},
      } as any;
    }
  );
}
