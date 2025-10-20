# Alby Hub MCP Tools Reference

This document provides a comprehensive reference for all available MCP tools in the Alby Hub server. Each tool includes its function, description, required inputs, and example prompts for testing in Goose.

---

## System Tools

### get_hub_info

**Function:** `GET /api/info`  
**Description:** Retrieves comprehensive metadata about your Alby Hub instance, including version number, network (mainnet/testnet/regtest), node backend type (LND/CLN), setup status, and whether it's running in an isolated environment. This is useful for confirming your hub is properly configured and identifying the underlying lightning implementation.  
**Required Input:** None  
**Test Prompt:** "Show me information about my Alby Hub"

### check_health

**Function:** `GET /api/health`  
**Description:** Performs a health check on your Alby Hub and connected lightning node. Returns an array of alarms indicating any issues with node connectivity, channel states, or other critical services. An empty alarms array means everything is healthy.  
**Required Input:** None  
**Test Prompt:** "Check if my Alby Hub is healthy"

---

## Wallet Tools

### get_balances

**Function:** `GET /api/balances`  
**Description:** Retrieves your current lightning and onchain balances. Shows available balance (spendable funds), pending balance (incoming payments), and onchain confirmed/unconfirmed balances. All amounts are returned in satoshis (sats).  
**Required Input:** None  
**Test Prompt:** "What are my current balances?"

### get_wallet_address

**Function:** `GET /api/wallet/address`  
**Description:** Returns an unused onchain Bitcoin address from your wallet. This is the address you can share to receive onchain bitcoin payments to your hub.  
**Required Input:** None  
**Test Prompt:** "Give me an onchain address to receive bitcoin"

### generate_new_address

**Function:** `POST /api/wallet/new-address`  
**Description:** Generates a fresh onchain Bitcoin address. Unlike get_wallet_address which may return a previously generated unused address, this always creates a new one. **Requires full access token.**  
**Required Input:** None  
**Test Prompt:** "Generate a new onchain address"

### get_wallet_capabilities

**Function:** `GET /api/wallet/capabilities`  
**Description:** Returns the wallet's NWC (Nostr Wallet Connect) capabilities including supported scopes (permissions), notification types, and available methods. Useful for understanding what operations your wallet can perform.  
**Required Input:** None  
**Test Prompt:** "What capabilities does my wallet have?"

### sign_message

**Function:** `POST /api/wallet/sign-message`  
**Description:** Signs an arbitrary message using your node's private key. Returns a signature that can be verified by others to prove the message came from your node. **Requires full access token.**  
**Required Input:**

- `message` (string, required): The message to sign

**Test Prompt:** "Sign the message 'Hello Alby Hub' with my node key"

### redeem_onchain_funds

**Function:** `POST /api/wallet/redeem-onchain-funds`  
**Description:** Sends onchain bitcoin from your hub to an external Bitcoin address. You can specify the amount in sats, set a custom fee rate, or use the sendAll option to send your entire onchain balance. **Requires full access token.** This is how you withdraw bitcoin from your hub to a regular Bitcoin wallet.  
**Required Input:**

- `toAddress` (string, required): Bitcoin address to send to
- `amount` (number, optional): Amount in satoshis (not needed if sendAll is true)
- `feeRate` (number, optional): Custom fee rate in sat/vB
- `sendAll` (boolean, optional): Send entire onchain balance

**Test Prompt:** "Send 10000 sats onchain to bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

### sync_wallet

**Function:** `POST /api/wallet/sync`  
**Description:** Triggers a manual wallet rescan to discover new transactions. Useful if you suspect your wallet is out of sync with the blockchain. **Requires full access token.** Returns a 204 No Content on success.  
**Required Input:** None  
**Test Prompt:** "Sync my wallet with the blockchain"

---

## Transaction Tools

### list_transactions

**Function:** `GET /api/transactions`  
**Description:** Lists all lightning transactions processed by your hub with pagination support. You can filter by appId to see transactions for a specific connected app, and use limit/offset for pagination. Returns transaction details including payment hash, amount, fees, preimage, and timestamps.  
**Required Input:**

- `appId` (string, optional): Filter by app ID
- `limit` (number, optional): Number of results (default: 20)
- `offset` (number, optional): Pagination offset (default: 0)

**Test Prompt:** "Show me my last 10 lightning transactions"

### lookup_transaction

**Function:** `GET /api/transactions/:paymentHash`  
**Description:** Retrieves detailed information about a specific transaction using its payment hash (hex-encoded hash of the payment preimage). Returns full transaction details including amount, state, app ID, and metadata.  
**Required Input:**

- `paymentHash` (string, required): Hex-encoded payment hash

**Test Prompt:** "Look up transaction with payment hash abc123..."

### list_onchain_transactions

**Function:** `GET /api/node/transactions`  
**Description:** Lists all onchain Bitcoin transactions associated with your node. Shows transaction IDs, amounts, confirmation status, and timestamps for deposits and withdrawals to your hub's onchain wallet.  
**Required Input:** None  
**Test Prompt:** "Show me all my onchain transactions"

---

## Payment & Invoice Tools

### create_invoice

**Function:** `POST /api/invoices`  
**Description:** Creates a new lightning invoice that someone can pay to send you sats. You can specify the amount in satoshis and include a description/memo. Returns a BOLT11 invoice string that you share with the payer.  
**Required Input:**

- `amount` (number, required): Amount in satoshis
- `description` (string, optional): Invoice description/memo

**Test Prompt:** "Create an invoice for 5000 sats with description 'Coffee payment'"

### pay_invoice

**Function:** `POST /api/payments`  
**Description:** Pays a BOLT11 lightning invoice. Provide the invoice string and the payment will be routed through the lightning network. Returns the preimage as proof of payment. **Requires full access token.**  
**Required Input:**

- `invoice` (string, required): BOLT11 invoice string to pay

**Test Prompt:** "Pay invoice lnbc50n1..."

### send_payment_probes

**Function:** `POST /api/send-payment-probes`  
**Description:** Probes potential payment routes for a given invoice without actually sending the payment. This lets you check if a payment is likely to succeed and discover the probable route before committing to pay. **Requires full access token.** Useful for large payments to verify routability.  
**Required Input:**

- `invoice` (string, required): BOLT11 invoice to probe

**Test Prompt:** "Probe payment routes for invoice lnbc100n1..."

### send_spontaneous_payment_probes

**Function:** `POST /api/send-spontaneous-payment-probes`  
**Description:** Probes routes for a spontaneous payment (keysend) to a specific node without an invoice. You provide the amount in millisatoshis and the recipient's node public key. **Requires full access token.** This checks if you can reach the node before attempting a real keysend payment.  
**Required Input:**

- `amount` (number, required): Amount in millisatoshis (msats)
- `nodeId` (string, required): Recipient node public key (66-char hex)

**Test Prompt:** "Probe a 10000 millisat spontaneous payment to node 03abc..."

### create_offer

**Function:** `POST /api/offers`  
**Description:** Creates a BOLT12 offer (reusable payment request). Unlike BOLT11 invoices which are single-use, BOLT12 offers can be paid multiple times and don't expose the amount upfront. You provide a description and get back an offer string starting with "lno...". **Requires full access token.**  
**Required Input:**

- `description` (string, required): Offer description

**Test Prompt:** "Create a BOLT12 offer for donations"

---

## Channel Tools

### list_channels

**Function:** `GET /api/channels`  
**Description:** Lists all your lightning channels showing capacity, local/remote balance, channel state (active/inactive/pending), peer information, fees, and other channel properties. Essential for understanding your liquidity and routing capability.  
**Required Input:** None  
**Test Prompt:** "Show me all my lightning channels"

### get_channel_suggestions

**Function:** `GET /api/channels/suggestions`  
**Description:** Returns suggested peers for opening new channels. These suggestions are typically well-connected nodes that would improve your routing and liquidity. Useful when deciding where to allocate channel capacity.  
**Required Input:** None  
**Test Prompt:** "Suggest good peers for opening channels"

### open_channel

**Function:** `POST /api/channels`  
**Description:** Opens a new lightning channel to a peer node. You specify the peer's public key, channel capacity in sats, whether the channel should be public (announced to the network), and optionally the peer's host and port for connection. **Requires full access token.** This is how you increase your lightning network liquidity.  
**Required Input:**

- `pubkey` (string, required): Peer node public key
- `capacity` (number, required): Channel capacity in satoshis
- `public` (boolean, optional): Make channel public (default: false)
- `host` (string, optional): Peer host address
- `port` (number, optional): Peer port number

**Test Prompt:** "Open a 500000 sat public channel to node 02abc..."

### close_channel

**Function:** `DELETE /api/peers/:peerId/channels/:channelId`  
**Description:** Closes an existing lightning channel. You can choose cooperative close (normal) or force close (unilateral). Force closing should be used only when the peer is unresponsive, as it results in longer settlement times and potentially higher fees. **Requires full access token.**  
**Required Input:**

- `peerId` (string, required): Peer ID
- `channelId` (string, required): Channel ID to close
- `force` (boolean, optional): Force close channel (default: false)

**Test Prompt:** "Close channel abc123 with peer xyz789"

### update_channel

**Function:** `PATCH /api/peers/:peerId/channels/:channelId`  
**Description:** Updates channel settings, primarily forwarding fee parameters. You can set the base fee (in millisatoshis) and proportional fee (in millionths) charged for routing payments through this channel. **Requires full access token.** Used to optimize your routing revenue.  
**Required Input:**

- `peerId` (string, required): Peer ID
- `channelId` (string, required): Channel ID to update
- `forwardingFeeBaseMsat` (number, optional): Base forwarding fee in millisatoshis
- `forwardingFeeProportionalMillionths` (number, optional): Proportional fee in millionths

**Test Prompt:** "Set base fee to 1000 msats and proportional fee to 100 for channel abc123"

### rebalance_channel

**Function:** `POST /api/channels/rebalance`  
**Description:** Performs circular rebalancing by routing a payment to yourself through a specific peer. This lets you move liquidity between your channels to optimize balance distribution. You specify the peer's pubkey to receive through and the amount in sats. **Requires full access token.** This is essential for maintaining routing capability.  
**Required Input:**

- `receiveThroughNodePubkey` (string, required): Node pubkey to route through
- `amountSat` (number, required): Amount in satoshis to rebalance

**Test Prompt:** "Rebalance 100000 sats through peer 03xyz..."

---

## Peer Tools

### list_peers

**Function:** `GET /api/peers`
**Description:** Lists all connected lightning peers with details.
**Required Input:** None
**Test Prompt:** "List all my connected peers"

### connect_peer

**Function:** `POST /api/peers`
**Description:** Connects to a new lightning peer using pubkey and optional host/port.
**Required Input:**

- `pubkey` (string, required): Peer node public key
- `host` (string, optional): Peer host address
- `port` (number, optional): Peer port number
  **Test Prompt:** "Connect to peer 03abc... at host example.com port 9735"

### disconnect_peer

**Function:** `DELETE /api/peers/:peerId`
**Description:** Disconnects from a lightning peer.
**Required Input:**

- `peerId` (string, required): Peer ID to disconnect
  **Test Prompt:** "Disconnect peer 03abc..."

---

## App/NWC Tools

### list_apps

**Function:** `GET /api/apps`
**Description:** Lists all connected apps (NWC clients) with optional filters.
**Required Input:**

- `limit` (number, optional)
- `offset` (number, optional)
- `name` (string, optional)
- `appStoreAppId` (string, optional)
- `unused` (boolean, optional)
- `subWallets` (boolean, optional)
  **Test Prompt:** "List all my apps"

### get_app_by_pubkey

**Function:** `GET /api/apps/:pubkey`
**Description:** Gets app details by pubkey.
**Required Input:**

- `pubkey` (string, required)
  **Test Prompt:** "Get app with pubkey 03abc..."

### get_app_by_id

**Function:** `GET /api/v2/apps/:id`
**Description:** Gets app details by ID.
**Required Input:**

- `id` (number, required)
  **Test Prompt:** "Get app with ID 123"

### create_app

**Function:** `POST /api/apps`
**Description:** Creates a new app connection (NWC client).
**Required Input:**

- `name` (string, required)
- `pubkey` (string, required)
- `maxAmount` (number, optional)
- `budgetRenewal` (string, optional)
- `expiresAt` (string, optional)
- `scopes` (array, optional)
- `isolated` (boolean, optional)
- `metadata` (object, optional)
- `returnTo` (string, optional)
- `unlockPassword` (string, optional)
  **Test Prompt:** "Create app named 'MyApp' with pubkey 03abc..."

### update_app

**Function:** `PATCH /api/apps/:pubkey`
**Description:** Updates an app's settings.
**Required Input:**

- `pubkey` (string, required)
- Other fields as in create_app
  **Test Prompt:** "Update app 03abc... with new maxAmount"

### delete_app

**Function:** `DELETE /api/apps/:pubkey`
**Description:** Deletes an app connection.
**Required Input:**

- `pubkey` (string, required)
  **Test Prompt:** "Delete app 03abc..."

### transfer_funds

**Function:** `POST /api/transfers`
**Description:** Transfers funds between sub-wallets/apps.
**Required Input:**

- `amountSat` (number, required)
- `fromAppId` (number, optional)
- `toAppId` (number, optional)
  **Test Prompt:** "Transfer 10000 sats from app 1 to app 2"

---

## Lightning Address Tools

### create_lightning_address

**Function:** `POST /api/lightning-addresses`
**Description:** Creates a new lightning address for an app.
**Required Input:**

- `address` (string, required)
- `appId` (number, required)
  **Test Prompt:** "Create lightning address 'me@alby.com' for app 1"

### delete_lightning_address

**Function:** `DELETE /api/lightning-addresses/:appId`
**Description:** Deletes a lightning address for an app.
**Required Input:**

- `appId` (number, required)
  **Test Prompt:** "Delete lightning address for app 1"

---

## Swap Tools

### list_swaps

**Function:** `GET /api/swaps`
**Description:** Lists all submarine swaps (lightning <-> onchain).
**Required Input:** None
**Test Prompt:** "List all swaps"

### lookup_swap

**Function:** `GET /api/swaps/:swapId`
**Description:** Gets swap details by swapId.
**Required Input:**

- `swapId` (string, required)
  **Test Prompt:** "Get swap with ID abc123"

### get_swap_out_info

**Function:** `GET /api/swaps/out/info`
**Description:** Gets info for swap-out (lightning to onchain).
**Required Input:** None
**Test Prompt:** "Get swap-out info"

### get_swap_in_info

**Function:** `GET /api/swaps/in/info`
**Description:** Gets info for swap-in (onchain to lightning).
**Required Input:** None
**Test Prompt:** "Get swap-in info"

### initiate_swap_out

**Function:** `POST /api/swaps/out`
**Description:** Initiates a swap-out (lightning to onchain).
**Required Input:**

- `swapAmount` (number, required)
- `destination` (string, required)
  **Test Prompt:** "Swap out 100000 sats to bc1..."

### initiate_swap_in

**Function:** `POST /api/swaps/in`
**Description:** Initiates a swap-in (onchain to lightning).
**Required Input:**

- `swapAmount` (number, required)
- `destination` (string, optional)
  **Test Prompt:** "Swap in 100000 sats"

### refund_swap

**Function:** `POST /api/swaps/refund`
**Description:** Refunds a swap to a given address.
**Required Input:**

- `swapId` (string, required)
- `address` (string, required)
  **Test Prompt:** "Refund swap abc123 to bc1..."

### get_swap_mnemonic

**Function:** `GET /api/swaps/mnemonic`
**Description:** Gets the swap mnemonic phrase.
**Required Input:** None
**Test Prompt:** "Get swap mnemonic"

---

## Auto-swap Tools

### get_autoswap_config

**Function:** `GET /api/autoswap`
**Description:** Gets current auto-swap configuration.
**Required Input:** None
**Test Prompt:** "Get auto-swap config"

### enable_autoswap

**Function:** `POST /api/autoswap`
**Description:** Enables auto-swap with config.
**Required Input:**

- `balanceThreshold` (number, required)
- `swapAmount` (number, required)
- `destination` (string, required)
  **Test Prompt:** "Enable auto-swap with threshold 100000 sats"

### disable_autoswap

**Function:** `DELETE /api/autoswap`
**Description:** Disables auto-swap.
**Required Input:** None
**Test Prompt:** "Disable auto-swap"

---

## Node Tools

### get_node_connection_info

**Function:** `GET /api/node/connection-info`
**Description:** Gets node connection info (pubkey, address, etc).
**Required Input:** None
**Test Prompt:** "Get node connection info"

### get_node_status

**Function:** `GET /api/node/status`
**Description:** Gets node status (online, synced, etc).
**Required Input:** None
**Test Prompt:** "Get node status"

### get_network_graph

**Function:** `GET /api/node/network-graph`
**Description:** Gets the lightning network graph (optionally filtered).
**Required Input:**

- `nodeIds` (array, optional)
  **Test Prompt:** "Get network graph for node 03abc..."

### set_node_alias

**Function:** `POST /api/node/alias`
**Description:** Sets the node alias.
**Required Input:**

- `nodeAlias` (string, required)
  **Test Prompt:** "Set node alias to 'MyNode'"

### request_lsp_order

**Function:** `POST /api/lsp-orders`
**Description:** Requests a channel from a Lightning Service Provider.
**Required Input:**

- `amount` (number, required)
- `lspType` (string, required)
- `lspIdentifier` (string, required)
- `public` (boolean, required)
  **Test Prompt:** "Request LSP channel for 100000 sats"

### get_channel_offer

**Function:** `GET /api/channel-offer`
**Description:** Gets current channel offer from LSP.
**Required Input:** None
**Test Prompt:** "Get channel offer"

### get_mempool_info

**Function:** `GET /api/mempool`
**Description:** Gets mempool info (fee estimates, etc).
**Required Input:** None
**Test Prompt:** "Get mempool info"

### get_forwards

**Function:** `GET /api/forwards`
**Description:** Gets forwarding/routing stats.
**Required Input:** None
**Test Prompt:** "Get forwarding stats"

---

## Log Tools

### get_app_logs

**Function:** `GET /api/log/app?maxLen={int}`
**Description:** Gets application logs (optionally limited).
**Required Input:**

- `maxLen` (number, optional)
  **Test Prompt:** "Get app logs"

### get_node_logs

**Function:** `GET /api/log/node?maxLen={int}`
**Description:** Gets node logs (optionally limited).
**Required Input:**

- `maxLen` (number, optional)
  **Test Prompt:** "Get node logs"

---

## Settings & Admin Tools

### update_settings

**Function:** `PATCH /api/settings`
**Description:** Updates hub settings (e.g., currency).
**Required Input:**

- `currency` (string, required)
  **Test Prompt:** "Set currency to USD"

### get_custom_node_commands

**Function:** `GET /api/commands`
**Description:** Lists custom node commands.
**Required Input:** None
**Test Prompt:** "List custom node commands"

### execute_custom_node_command

**Function:** `POST /api/command`
**Description:** Executes a custom node command.
**Required Input:**

- `command` (string, required)
  **Test Prompt:** "Run custom command 'getinfo'"

### change_unlock_password

**Function:** `PATCH /api/unlock-password`
**Description:** Changes the unlock password.
**Required Input:**

- `currentUnlockPassword` (string, required)
- `newUnlockPassword` (string, required)
  **Test Prompt:** "Change unlock password"

### auto_unlock

**Function:** `PATCH /api/auto-unlock`
**Description:** Enables auto-unlock with password.
**Required Input:**

- `unlockPassword` (string, required)
  **Test Prompt:** "Enable auto-unlock"

### backup_reminder

**Function:** `PATCH /api/backup-reminder`
**Description:** Sets next backup reminder date.
**Required Input:**

- `nextBackupReminder` (string, required)
  **Test Prompt:** "Set backup reminder for tomorrow"

### migrate_node_storage

**Function:** `POST /api/node/migrate-storage`
**Description:** Migrates node storage to a new location.
**Required Input:**

- `to` (string, required)
  **Test Prompt:** "Migrate node storage to SSD"

### reset_router

**Function:** `POST /api/reset-router`
**Description:** Resets the router (admin).
**Required Input:**

- `key` (string, required)
  **Test Prompt:** "Reset router with key 'admin123'"

### stop_hub

**Function:** `POST /api/stop`
**Description:** Stops the hub (admin).
**Required Input:** None
**Test Prompt:** "Stop the hub"

---

## Authentication Tools

### start

**Function:** `POST /api/start`
**Description:** Starts the hub and returns an API token.
**Required Input:**

- `unlockPassword` (string, required)
  **Test Prompt:** "Start hub with unlock password"

### unlock

**Function:** `POST /api/unlock`
**Description:** Unlocks the hub and returns an API token.
**Required Input:**

- `unlockPassword` (string, required)
- `tokenExpiryDays` (number, optional)
- `permission` (string, required: 'full' or 'readonly')
  **Test Prompt:** "Unlock hub for 7 days with full access"

---

## Notes

- **Full Access Required:** Tools marked with "Requires full access token" need a full-access API token. Read-only tokens will be rejected.
- **Amount Units:**
  - Lightning balances and invoice amounts are in **satoshis (sats)**
  - Some API fields use **millisatoshis (msats)** = 1/1000 of a satoshi
  - Onchain amounts are in **satoshis**
- **Payment Hashes:** Use hex-encoded format for transaction lookups
- **Node Pubkeys:** Lightning node public keys are 66-character hex strings
- **Channel IDs:** Channel identifiers are channel-point format or short channel IDs

## Testing Tips

When testing with Goose:

1. Start with read-only operations (balances, info, list operations)
2. Verify full-access operations with small amounts first
3. Use probes before sending real payments
4. Check health status regularly
5. Always backup channel state before force-closing

## Token Configuration

Set your environment variables in Goose Desktop:

```
ALBY_HUB_URL=http://localhost:8080
ALBY_HUB_API_TOKEN=<your-full-access-token>
```

Optional headers:

```
ALBY_HUB_NAME=<optional-hub-name>
ALBY_HUB_REGION=<optional-region>
```
