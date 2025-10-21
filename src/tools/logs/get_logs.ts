import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerGetLogsTool(server: McpServer, client: HubHttpClient) {
  server.registerTool(
    "get_logs",
    {
      title: "Get Logs",
      description:
        "Retrieves application or node logs for debugging and monitoring. Log type must be either 'node' (LND logs) or 'app' (Alby Hub logs).",
      inputSchema: {
        type: z
          .enum(["node", "app"])
          .describe(
            "Type of logs to retrieve: 'node' for LND logs, 'app' for Alby Hub logs"
          ),
        maxLen: z
          .number()
          .int()
          .optional()
          .describe("Maximum number of log lines to return"),
      },
      outputSchema: {},
    },
    async (params) => {
      const queryParams: Record<string, string | number> = {};
      if (params.maxLen !== undefined) {
        queryParams.maxLen = params.maxLen;
      }

      const url = `/api/log/${params.type}`;
      const result = await client.get<{ logs: string }>(url, queryParams);

      // Return the logs string directly for better readability
      return {
        content: [{ type: "text" as const, text: result.logs }],
      };
    }
  );
}
