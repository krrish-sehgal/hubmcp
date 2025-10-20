import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";
import { PayInvoiceRequest, Transaction } from "../../types.js";

export function registerPayInvoiceTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "pay_invoice",
    {
      title: "Pay Invoice",
      description:
        "Pay a lightning invoice (BOLT11/BOLT12). Provide amount for zero-amount invoices (requires full access token)",
      inputSchema: {
        invoice: z.string().min(1).describe("BOLT11 or BOLT12 invoice to pay"),
        amount: z
          .number()
          .positive()
          .nullish()
          .describe(
            "Amount in millisatoshis (msats) - required for zero-amount invoices"
          ),
        metadata: z
          .object({})
          .passthrough()
          .nullish()
          .describe("Optional metadata to include with the payment"),
      },
      outputSchema: {
        type: z.string().describe("Transaction type"),
        state: z.string().describe("Transaction state"),
        invoice: z.string().nullish().describe("BOLT-11 invoice"),
        paymentHash: z.string().describe("Payment hash"),
        amount: z.number().describe("Amount in msats"),
        feesPaid: z.number().nullish().describe("Fees paid in msats"),
        createdAt: z.string().describe("Creation timestamp"),
        updatedAt: z.string().nullish().describe("Update timestamp"),
        settledAt: z.string().nullish().describe("Settlement timestamp"),
        appId: z.string().nullish().describe("Application ID"),
        metadata: z
          .object({})
          .passthrough()
          .nullish()
          .describe("Transaction metadata"),
        failureReason: z
          .string()
          .nullish()
          .describe("Failure reason if payment failed"),
      },
    },
    async (params) => {
      // Validate input
      if (!params.invoice || params.invoice.trim().length === 0) {
        throw new Error("Invoice cannot be empty");
      }

      if (
        params.amount !== undefined &&
        params.amount !== null &&
        params.amount <= 0
      ) {
        throw new Error("Amount must be greater than 0");
      }

      try {
        const request: PayInvoiceRequest = {};

        if (params.amount !== undefined && params.amount !== null) {
          request.amount = params.amount;
        }

        if (params.metadata) {
          request.metadata = params.metadata;
        }

        const transaction = await client.post<Transaction>(
          `/api/payments/${encodeURIComponent(params.invoice)}`,
          Object.keys(request).length > 0 ? request : undefined
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

        if (
          errorMessage.includes("400") ||
          errorMessage.includes("Bad Request")
        ) {
          throw new Error(
            "Invalid request: Check if the invoice is valid and amount is provided for zero-amount invoices"
          );
        }

        throw new Error(`Failed to pay invoice: ${errorMessage}`);
      }
    }
  );
}
