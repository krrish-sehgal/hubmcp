import { Express, Request, Response } from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { json } from "express";
import { createMCPServer } from "./mcp_server.js";
import { HubHttpClient } from "./http_client.js";
import { getApiToken } from "./auth.js";
import { HubConfig } from "./types.js";

export function addStreamableHttpEndpoints(app: Express) {
  app.post("/mcp", json(), async (req: Request, res: Response) => {
    // In stateless mode, create a new instance for each request
    try {
      const apiToken = getApiToken(
        req.header("Authorization"),
        req.query.token as string
      );

      if (!apiToken) {
        res
          .status(400)
          .send(
            "Bearer auth with API token or token query parameter not provided"
          );
        return;
      }

      const baseUrl = (req.query.hub_url as string) || process.env.ALBY_HUB_URL;
      if (!baseUrl) {
        res.status(400).send("ALBY_HUB_URL must be provided");
        return;
      }

      const config: HubConfig = {
        baseUrl,
        apiToken,
        hubName: (req.query.hub_name as string) || process.env.ALBY_HUB_NAME,
        hubRegion:
          (req.query.hub_region as string) || process.env.ALBY_HUB_REGION,
        requestTimeout: process.env.REQUEST_TIMEOUT
          ? parseInt(process.env.REQUEST_TIMEOUT)
          : undefined,
      };

      const client = new HubHttpClient(config);
      const server = createMCPServer(client);
      const transport: StreamableHTTPServerTransport =
        new StreamableHTTPServerTransport({
          sessionIdGenerator: undefined,
        });

      res.on("close", () => {
        console.log("Request closed");
        transport.close();
        server.close();
      });

      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: {
            code: -32603,
            message: "Internal server error",
          },
          id: null,
        });
      }
    }
  });
}
