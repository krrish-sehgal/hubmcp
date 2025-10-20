import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerSignMessageTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "sign_message",
    {
      title: "Sign Message",
      description: "Sign an arbitrary message using the wallet (full access)",
      inputSchema: {
        message: z.string().min(1).describe("Message to sign"),
      },
      outputSchema: {
        message: z.string(),
        signature: z.string(),
      },
    },
    async (params) => {
      const result = await client.post<any>("/api/wallet/sign-message", {
        message: params.message,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
