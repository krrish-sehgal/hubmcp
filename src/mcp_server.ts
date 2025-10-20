import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { HubHttpClient } from "./http_client.js";
import { registerGetBalancesTool } from "./tools/get_balances.js";
import { registerCreateInvoiceTool } from "./tools/create_invoice.js";
import { registerPayInvoiceTool } from "./tools/pay_invoice.js";

export function createMCPServer(client: HubHttpClient): McpServer {
  const server = new McpServer({
    name: "@alby/hubmcp",
    version: "1.0.0",
    title: "Alby Hub MCP Server",
  });

  // Register tools
  registerGetBalancesTool(server, client);
  registerCreateInvoiceTool(server, client);
  registerPayInvoiceTool(server, client);

  return server;
}
