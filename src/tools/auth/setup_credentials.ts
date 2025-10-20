import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerSetupCredentialsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "setup_credentials",
    {
      title: "Setup Credentials",
      description: "Sets up initial credentials for hub access.",
      inputSchema: {
        email: z.string().email().optional(),
        password: z.string().min(8),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.post<any>("/api/setup", params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
