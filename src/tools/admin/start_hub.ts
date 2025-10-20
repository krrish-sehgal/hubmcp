import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerStartHubTool(server: McpServer, client: HubHttpClient) {
  server.registerTool(
    "start_hub",
    {
      title: "Start Hub",
      description: "Starts the Alby Hub service.",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      await client.post<void>("/api/start", {});
      return {
        content: [{ type: "text", text: "Hub started successfully" }],
        structuredContent: {},
      };
    }
  );
}
