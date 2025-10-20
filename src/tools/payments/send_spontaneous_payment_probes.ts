import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerSendSpontaneousPaymentProbesTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "send_spontaneous_payment_probes",
    {
      title: "Send Spontaneous Payment Probes",
      description:
        "Probe routes for a spontaneous payment to a node (full access)",
      inputSchema: {
        amount: z.number().int().positive().describe("Amount in msats"),
        nodeId: z.string().min(1).describe("Target node public key"),
      },
      outputSchema: {
        error: z.string().nullish().describe("Error if any"),
      },
    },
    async (params) => {
      const result = await client.post<any>(
        "/api/send-spontaneous-payment-probes",
        {
          amount: params.amount,
          nodeId: params.nodeId,
        }
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        structuredContent: result,
      };
    }
  );
}
