import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerEncryptDiskTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "encrypt_disk",
    {
      title: "Encrypt Disk",
      description: "Encrypts the hub's data storage with a password.",
      inputSchema: {
        password: z.string().min(8),
      },
      outputSchema: {},
    },
    async (params) => {
      await client.post<void>("/api/encrypt-disk", params);
      return {
        content: [
          { type: "text", text: "Disk encryption enabled successfully" },
        ],
        structuredContent: {},
      };
    }
  );
}
