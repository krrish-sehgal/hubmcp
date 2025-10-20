import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerStopHubTool(server: McpServer, client: HubHttpClient) {
  server.registerTool(
    "stop_hub",
    {
      title: "Stop Hub",
      description: "Stops the Alby Hub service.",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      await client.post<void>("/api/stop", {});
      return {
        content: [{ type: "text", text: "Hub stopped successfully" }],
        structuredContent: {},
      };
    }
  );
}
