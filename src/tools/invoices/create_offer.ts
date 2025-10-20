import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerCreateOfferTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "create_offer",
    {
      title: "Create Offer",
      description: "Create a BOLT12 offer (full access)",
      inputSchema: {
        description: z.string().min(1).describe("Offer description"),
      },
      outputSchema: {
        offer: z.string().describe("BOLT12 offer string"),
      },
    },
    async (params) => {
      const offer = await client.post<string>("/api/offers", {
        description: params.description,
      });
      return {
        content: [{ type: "text", text: offer }],
        structuredContent: { offer },
      };
    }
  );
}
