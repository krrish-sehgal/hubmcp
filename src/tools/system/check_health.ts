import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerCheckHealthTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "check_health",
    {
      title: "Check Health",
      description: "Check hub health and alarms",
      inputSchema: {},
      outputSchema: {
        alarms: z
          .array(
            z.object({
              kind: z.enum([
                "alby_service",
                "node_not_ready",
                "channels_offline",
                "nostr_relay_offline",
                "vss_no_subscription",
              ]),
              rawDetails: z.unknown().nullish(),
            })
          )
          .nullish(),
      },
    },
    async () => {
      const health = await client.get<any>("/api/health");
      return {
        content: [{ type: "text", text: JSON.stringify(health, null, 2) }],
        structuredContent: health,
      };
    }
  );
}
