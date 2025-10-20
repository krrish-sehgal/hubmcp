import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGenerateNewAddressTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "generate_new_address",
    {
      title: "Generate New Address",
      description: "Generate a new onchain address (full access)",
      inputSchema: {},
      outputSchema: {
        address: z.string().describe("New onchain address"),
      },
    },
    async () => {
      const address = await client.post<string>("/api/wallet/new-address");
      return {
        content: [{ type: "text", text: address }],
        structuredContent: { address },
      };
    }
  );
}
