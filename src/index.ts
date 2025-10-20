#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ErrorCode, McpError } from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";
import express from "express";
import { createMCPServer } from "./mcp_server.js";
import { HubHttpClient } from "./http_client.js";
import { addStreamableHttpEndpoints } from "./streamable_http.js";
import { HubConfig } from "./types.js";

// Load environment variables from .env file
dotenv.config();

class HubMCPServer {
  async runSTDIO() {
    try {
      // Required environment variables
      const ALBY_HUB_URL = process.env.ALBY_HUB_URL;
      const ALBY_HUB_API_TOKEN = process.env.ALBY_HUB_API_TOKEN;

      if (!ALBY_HUB_URL) {
        throw new Error("ALBY_HUB_URL environment variable is required");
      }

      if (!ALBY_HUB_API_TOKEN) {
        throw new Error("ALBY_HUB_API_TOKEN environment variable is required");
      }

      const config: HubConfig = {
        baseUrl: ALBY_HUB_URL,
        apiToken: ALBY_HUB_API_TOKEN,
        hubName: process.env.ALBY_HUB_NAME,
        hubRegion: process.env.ALBY_HUB_REGION,
        requestTimeout: process.env.REQUEST_TIMEOUT
          ? parseInt(process.env.REQUEST_TIMEOUT)
          : undefined,
      };

      const client = new HubHttpClient(config);
      const transport = new StdioServerTransport();
      const server = createMCPServer(client);
      await server.connect(transport);

      // Log to stderr so it doesn't interfere with stdio communication
      console.error("Alby Hub MCP Server running in STDIO mode");
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to connect to Alby Hub: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async runHTTP() {
    const app = express();

    addStreamableHttpEndpoints(app);

    const port = parseInt(process.env.PORT || "3000");
    app.listen(port);
    console.log("Alby Hub MCP Server running in HTTP mode on port", port);
  }
}

const mode = process.env.MODE || "stdio";
switch (mode.toLowerCase()) {
  case "http":
    new HubMCPServer().runHTTP().catch(console.error);
    break;
  case "stdio":
    new HubMCPServer().runSTDIO().catch(console.error);
    break;
  default:
    console.error("Unknown mode: " + mode + ". Use 'stdio' or 'http'");
    process.exit(1);
}
