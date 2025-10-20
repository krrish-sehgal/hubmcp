import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HubHttpClient } from "../../http_client.js";

export function registerUpdateChannelTool(
  server: McpServer,
  client: HubHttpClient
) {
  server.registerTool(
    "update_channel",
    {
      title: "Update Channel",
      description: "Update channel settings like forwarding fees (full access)",
      inputSchema: {
        peerId: z.string().min(1).describe("Peer ID"),
        channelId: z.string().min(1).describe("Channel ID"),
        forwardingFeeBaseMsat: z
          .number()
          .int()
          .nonnegative()
          .nullish()
          .describe("Base fee in msats"),
        forwardingFeeProportionalMillionths: z
          .number()
          .int()
          .nonnegative()
          .nullish()
          .describe("Proportional fee"),
      },
      outputSchema: {},
    },
    async (params) => {
      const body: any = {};
      if (
        params.forwardingFeeBaseMsat !== undefined &&
        params.forwardingFeeBaseMsat !== null
      ) {
        body.forwardingFeeBaseMsat = params.forwardingFeeBaseMsat;
      }
      if (
        params.forwardingFeeProportionalMillionths !== undefined &&
        params.forwardingFeeProportionalMillionths !== null
      ) {
        body.forwardingFeeProportionalMillionths =
          params.forwardingFeeProportionalMillionths;
      }
      await client.request<void>(
        `/api/peers/${encodeURIComponent(
          params.peerId
        )}/channels/${encodeURIComponent(params.channelId)}`,
        {
          method: "PATCH",
          body,
        }
      );
      return {
        content: [
          { type: "text", text: `Channel ${params.channelId} updated` },
        ],
        structuredContent: {},
      } as any;
    }
  );
}
