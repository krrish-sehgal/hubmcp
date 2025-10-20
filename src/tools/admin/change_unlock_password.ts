import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerChangeUnlockPasswordTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "change_unlock_password",
    {
      title: "Change Unlock Password",
      description: "Changes the hub's unlock password.",
      inputSchema: {
        oldPassword: z.string().min(1),
        newPassword: z.string().min(8),
      },
      outputSchema: {},
    },
    async (params) => {
      await client.post<void>("/api/change-unlock-password", params);
      return {
        content: [
          { type: "text", text: "Unlock password changed successfully" },
        ],
        structuredContent: {},
      };
    }
  );
}
