import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { HubHttpClient } from "./http_client.js";
import { registerGetBalancesTool } from "./tools/wallet/get_balances.js";
import { registerCreateInvoiceTool } from "./tools/invoices/create_invoice.js";
import { registerPayInvoiceTool } from "./tools/payments/pay_invoice.js";
import { registerGetHubInfoTool } from "./tools/system/get_hub_info.js";
import { registerCheckHealthTool } from "./tools/system/check_health.js";
import { registerGetWalletAddressTool } from "./tools/wallet/get_wallet_address.js";
import { registerGenerateNewAddressTool } from "./tools/wallet/generate_new_address.js";
import { registerGetWalletCapabilitiesTool } from "./tools/wallet/get_wallet_capabilities.js";
import { registerSignMessageTool } from "./tools/wallet/sign_message.js";
import { registerRedeemOnchainFundsTool } from "./tools/wallet/redeem_onchain_funds.js";
import { registerSyncWalletTool } from "./tools/wallet/sync_wallet.js";
import { registerListTransactionsTool } from "./tools/transactions/list_transactions.js";
import { registerLookupTransactionTool } from "./tools/transactions/lookup_transaction.js";
import { registerSendPaymentProbesTool } from "./tools/payments/send_payment_probes.js";
import { registerSendSpontaneousPaymentProbesTool } from "./tools/payments/send_spontaneous_payment_probes.js";
import { registerCreateOfferTool } from "./tools/invoices/create_offer.js";
import { registerListOnchainTransactionsTool } from "./tools/transactions/list_onchain_transactions.js";
import { registerListChannelsTool } from "./tools/channels/list_channels.js";
import { registerGetChannelSuggestionsTool } from "./tools/channels/get_channel_suggestions.js";
import { registerOpenChannelTool } from "./tools/channels/open_channel.js";
import { registerCloseChannelTool } from "./tools/channels/close_channel.js";
import { registerUpdateChannelTool } from "./tools/channels/update_channel.js";
import { registerRebalanceChannelTool } from "./tools/channels/rebalance_channel.js";
// Peers imports
import { registerListPeersTool } from "./tools/peers/list_peers.js";
import { registerConnectPeerTool } from "./tools/peers/connect_peer.js";
import { registerDisconnectPeerTool } from "./tools/peers/disconnect_peer.js";
// Apps imports
import { registerListAppsTool } from "./tools/apps/list_apps.js";
import { registerGetAppByPubkeyTool } from "./tools/apps/get_app_by_pubkey.js";
import { registerGetAppByIdTool } from "./tools/apps/get_app_by_id.js";
import { registerCreateAppTool } from "./tools/apps/create_app.js";
import { registerUpdateAppTool } from "./tools/apps/update_app.js";
import { registerDeleteAppTool } from "./tools/apps/delete_app.js";
import { registerTransferFundsTool } from "./tools/apps/transfer_funds.js";
// Lightning Address imports
import { registerCreateLightningAddressTool } from "./tools/lightning_address/create_lightning_address.js";
import { registerDeleteLightningAddressTool } from "./tools/lightning_address/delete_lightning_address.js";
// Swaps imports
import { registerListSwapsTool } from "./tools/swaps/list_swaps.js";
import {
  registerCreateSwapOutTool,
  registerCreateSwapInTool,
} from "./tools/swaps/create_swap.js";
import {
  registerGetSwapOutInfoTool,
  registerGetSwapInInfoTool,
} from "./tools/swaps/get_swap_info.js";
// Autoswap imports
import { registerGetAutoswapSettingsTool } from "./tools/autoswap/get_autoswap_settings.js";
import { registerUpdateAutoswapSettingsTool } from "./tools/autoswap/update_autoswap_settings.js";
import { registerDisableAutoswapTool } from "./tools/autoswap/disable_autoswap.js";
// Node imports
import { registerGetNodeStatusTool } from "./tools/node/get_node_status.js";
import { registerGetNodeConnectionInfoTool } from "./tools/node/get_node_connection_info.js";
import { registerGetNetworkGraphTool } from "./tools/node/get_network_graph.js";
// Logs imports
import { registerGetLogsTool } from "./tools/logs/get_logs.js";
// Settings imports
import { registerGetSettingsTool } from "./tools/settings/get_settings.js";
import { registerUpdateSettingsTool } from "./tools/settings/update_settings.js";
// Admin imports
import { registerStartHubTool } from "./tools/admin/start_hub.js";
import { registerStopHubTool } from "./tools/admin/stop_hub.js";
import { registerEncryptDiskTool } from "./tools/admin/encrypt_disk.js";
import { registerChangeUnlockPasswordTool } from "./tools/admin/change_unlock_password.js";
// Auth imports
import { registerSetupCredentialsTool } from "./tools/auth/setup_credentials.js";
import { registerUnlockHubTool } from "./tools/auth/unlock_hub.js";

export function createMCPServer(client: HubHttpClient): McpServer {
  const server = new McpServer({
    name: "@alby/hubmcp",
    version: "1.0.0",
    title: "Alby Hub MCP Server",
  });

  // Register tools
  // System
  registerGetHubInfoTool(server, client);
  registerCheckHealthTool(server, client);

  // Wallet
  registerGetBalancesTool(server, client);
  registerGetWalletAddressTool(server, client);
  registerGenerateNewAddressTool(server, client);
  registerGetWalletCapabilitiesTool(server, client);
  registerSignMessageTool(server, client);
  registerRedeemOnchainFundsTool(server, client);
  registerSyncWalletTool(server, client);

  // Transactions
  registerListTransactionsTool(server, client);
  registerLookupTransactionTool(server, client);
  registerListOnchainTransactionsTool(server, client);

  // Payments & Invoices
  registerCreateInvoiceTool(server, client);
  registerPayInvoiceTool(server, client);
  registerSendPaymentProbesTool(server, client);
  registerSendSpontaneousPaymentProbesTool(server, client);
  registerCreateOfferTool(server, client);

  // Channels
  registerListChannelsTool(server, client);
  registerGetChannelSuggestionsTool(server, client);
  registerOpenChannelTool(server, client);
  registerCloseChannelTool(server, client);
  registerUpdateChannelTool(server, client);
  registerRebalanceChannelTool(server, client);

  // Peers
  registerListPeersTool(server, client);
  registerConnectPeerTool(server, client);
  registerDisconnectPeerTool(server, client);

  // Apps (NWC)
  registerListAppsTool(server, client);
  registerGetAppByPubkeyTool(server, client);
  registerGetAppByIdTool(server, client);
  registerCreateAppTool(server, client);
  registerUpdateAppTool(server, client);
  registerDeleteAppTool(server, client);
  registerTransferFundsTool(server, client);

  // Lightning Addresses
  registerCreateLightningAddressTool(server, client);
  registerDeleteLightningAddressTool(server, client);

  // Swaps
  registerListSwapsTool(server, client);
  registerGetSwapOutInfoTool(server, client);
  registerGetSwapInInfoTool(server, client);
  registerCreateSwapOutTool(server, client);
  registerCreateSwapInTool(server, client);

  // Autoswap
  registerGetAutoswapSettingsTool(server, client);
  registerUpdateAutoswapSettingsTool(server, client);
  registerDisableAutoswapTool(server, client);

  // Node
  registerGetNodeStatusTool(server, client);
  registerGetNodeConnectionInfoTool(server, client);
  registerGetNetworkGraphTool(server, client);

  // Logs
  registerGetLogsTool(server, client);

  // Settings
  registerGetSettingsTool(server, client);
  registerUpdateSettingsTool(server, client);

  // Admin
  registerStartHubTool(server, client);
  registerStopHubTool(server, client);
  registerEncryptDiskTool(server, client);
  registerChangeUnlockPasswordTool(server, client);

  // Auth
  registerSetupCredentialsTool(server, client);
  registerUnlockHubTool(server, client);

  return server;
}
