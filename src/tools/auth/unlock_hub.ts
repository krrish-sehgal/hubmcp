import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerUnlockHubTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "unlock_hub",
    {
      title: "Unlock Hub",
      description: "Unlocks the hub with the unlock password.",
      inputSchema: {
        password: z.string().min(1),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.post<any>("/api/unlock", params);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
