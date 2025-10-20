import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerSendPaymentProbesTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "send_payment_probes",
    {
      title: "Send Payment Probes",
      description: "Probe routes for a given invoice (full access)",
      inputSchema: {
        invoice: z.string().min(1).describe("BOLT11/12 invoice to probe"),
      },
      outputSchema: {
        error: z.string().nullish().describe("Error if any"),
      },
    },
    async (params) => {
      const result = await client.post<any>("/api/send-payment-probes", {
        invoice: params.invoice,
      });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
