import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerCreateSwapOutTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "create_swap_out",
    {
      title: "Create Swap Out",
      description:
        "Creates a swap out operation to exchange Lightning funds for on-chain bitcoin. Sends lightning, receives on-chain.",
      inputSchema: {
        swapAmount: z.number().int().describe("Amount in satoshis to swap"),
        destination: z
          .string()
          .describe("Bitcoin on-chain address to receive funds"),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.post<any>("/api/swaps/out", {
        swapAmount: params.swapAmount,
        destination: params.destination,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}

export function registerCreateSwapInTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "create_swap_in",
    {
      title: "Create Swap In",
      description:
        "Creates a swap in operation to exchange on-chain bitcoin for Lightning funds. Sends on-chain, receives lightning.",
      inputSchema: {
        swapAmount: z.number().int().describe("Amount in satoshis to swap"),
      },
      outputSchema: {},
    },
    async (params) => {
      const result = await client.post<any>("/api/swaps/in", {
        swapAmount: params.swapAmount,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
