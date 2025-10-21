import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerDisableAutoswapTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "disable_autoswap",
    {
      title: "Disable Autoswap",
      description:
        "Disables autoswap feature. Stops automatic swapping of Lightning funds to on-chain. **Requires full access token.**",
      inputSchema: {},
      outputSchema: {},
    },
    async () => {
      const result = await client.request<any>("/api/autoswap", {
        method: "DELETE",
      });
      return {
        content: [{ type: "text", text: "Autoswap disabled successfully" }],
      };
    }
  );
}
