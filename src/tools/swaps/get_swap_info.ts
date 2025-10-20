import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetSwapInfoTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "get_swap_info",
    {
      title: "Get Swap Info",
      description: "Retrieves information about a specific swap by its ID.",
      inputSchema: {
        swapId: z.string().min(1),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.get<any>(`/api/swaps/${params.swapId}`);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
