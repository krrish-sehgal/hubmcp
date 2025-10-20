import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";
import { MakeInvoiceRequest, Transaction } from "../../types.js";

export function registerCreateInvoiceTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "create_invoice",
    {
      title: "Create Invoice",
      description:
        "Create a lightning invoice with specified amount and description (requires full access token)",
      inputSchema: {
        amount: z
          .number()
          .positive()
          .describe("Amount in millisatoshis (msats)"),
        description: z.string().min(1).describe("Invoice description"),
      },
      outputSchema: {
        invoice: z.string().describe("BOLT-11 invoice string"),
        paymentHash: z.string().describe("Payment hash"),
        amount: z.number().describe("Invoice amount in msats"),
        state: z.string().describe("Invoice state"),
        createdAt: z.string().describe("Creation timestamp"),
        type: z.string().nullish().describe("Transaction type"),
        settledAt: z.string().nullish().describe("Settlement timestamp"),
        appId: z.string().nullish().describe("Application ID"),
        metadata: z.object({}).passthrough().nullish().describe("Metadata"),
      },
    },
    async (params) => {
      // Validate input
      if (params.amount <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      if (!params.description || params.description.trim().length === 0) {
        throw new Error("Description cannot be empty");
      }

      try {
        const request: MakeInvoiceRequest = {
          amount: params.amount,
          description: params.description,
        };

        const transaction = await client.post<Transaction>(
          "/api/invoices",
          request
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(transaction, null, 2),
            },
          ],
          structuredContent: transaction,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        // Provide more specific error messages
        if (
          errorMessage.includes("403") ||
          errorMessage.includes("Forbidden")
        ) {
          throw new Error(
            "Permission denied: This operation requires a full access token (readonly token provided)"
          );
        }

        throw new Error(`Failed to create invoice: ${errorMessage}`);
      }
    }
  );
}
