import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetChannelSuggestionsTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_channel_suggestions",
    {
      title: "Get Channel Suggestions",
      description: "Get suggested peers for opening channels",
      inputSchema: {},
      outputSchema: {
        suggestions: z.array(z.unknown()).describe("Suggested peers"),
      },
    },
    async () => {
      const suggestions = await client.get<any[]>("/api/channels/suggestions");
      return {
        content: [{ type: "text", text: JSON.stringify(suggestions, null, 2) }],
        structuredContent: { suggestions },
      };
    }
  );
}
