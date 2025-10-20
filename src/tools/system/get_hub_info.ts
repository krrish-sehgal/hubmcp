import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetHubInfoTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_hub_info",
    {
      title: "Get Hub Info",
      description: "Return general information about the hub",
      inputSchema: {},
      outputSchema: {
        backendType: z.string().nullish(),
        setupCompleted: z.boolean().nullish(),
        running: z.boolean().nullish(),
        unlocked: z.boolean().nullish(),
        version: z.string().nullish(),
        network: z.string().nullish(),
        currency: z.string().nullish(),
        relay: z.string().nullish(),
        nodeAlias: z.string().nullish(),
        mempoolUrl: z.string().nullish(),
        autoUnlockPasswordSupported: z.boolean().nullish(),
        autoUnlockPasswordEnabled: z.boolean().nullish(),
      },
    },
    async () => {
      const info = await client.get<any>("/api/info");
      return {
        content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
        structuredContent: info,
      };
    }
  );
}
