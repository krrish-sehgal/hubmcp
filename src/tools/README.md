# Alby Hub MCP Tools - Quick Reference Index

This directory contains all MCP tools organized by category. Each category has its own README with detailed tool documentation.

---

## 📁 Tool Categories

### [System Tools](./system/README.md) - 2 tools

Core hub information and health monitoring.

- `get_hub_info` - Get hub metadata
- `check_health` - Health check

### [Wallet Tools](./wallet/README.md) - 8 tools

Wallet operations and balance management.

- `get_balances` - View balances
- `get_wallet_address` - Get receive address
- `generate_new_address` - Generate new address
- `get_wallet_capabilities` - View capabilities
- `sign_message` - Sign messages
- `redeem_onchain_funds` - Send onchain bitcoin
- `sync_wallet` - Sync wallet state

### [Transaction Tools](./transactions/README.md) - 3 tools

Query transaction history.

- `list_transactions` - List lightning txs
- `lookup_transaction` - Get tx details
- `list_onchain_transactions` - List onchain txs

### [Payment Tools](./payments/README.md) - 3 tools

Send lightning payments and probes.

- `pay_invoice` - Pay lightning invoice
- `send_payment_probes` - Probe payment routes
- `send_spontaneous_payment_probes` - Probe keysend routes

### [Invoice Tools](./invoices/README.md) - 2 tools

Create payment requests.

- `create_invoice` - Create BOLT11 invoice
- `create_offer` - Create BOLT12 offer

### [Channel Tools](./channels/README.md) - 6 tools

Lightning channel management.

- `list_channels` - List all channels
- `get_channel_suggestions` - Get peer suggestions
- `open_channel` - Open new channel
- `close_channel` - Close channel
- `update_channel` - Update channel settings
- `rebalance_channel` - Rebalance liquidity

### [Peer Tools](./peers/README.md) - 3 tools

Peer connection management.

- `list_peers` - List connected peers
- `connect_peer` - Connect to peer
- `disconnect_peer` - Disconnect peer

### [Apps (NWC) Tools](./apps/README.md) - 7 tools

Nostr Wallet Connect app management.

- `list_apps` - List all apps
- `get_app_by_pubkey` - Get app by pubkey
- `get_app_by_id` - Get app by ID
- `create_app` - Create new app
- `update_app` - Update app settings
- `delete_app` - Delete app
- `transfer_funds` - Transfer between apps

### [Lightning Address Tools](./lightning_address/README.md) - 2 tools

Lightning address management.

- `create_lightning_address` - Create address
- `delete_lightning_address` - Delete address

### [Swap Tools](./swaps/README.md) - 5 tools

Onchain ↔ Lightning swaps.

- `list_swaps` - List all swaps
- `get_swap_out_info` - Get swap out fees/limits
- `get_swap_in_info` - Get swap in fees/limits
- `create_swap_out` - Create swap out (Lightning -> On-chain)
- `create_swap_in` - Create swap in (On-chain -> Lightning)

### [Autoswap Tools](./autoswap/README.md) - 2 tools

Automatic balance management.

- `get_autoswap_settings` - Get settings
- `update_autoswap_settings` - Update settings

### [Node Tools](./node/README.md) - 3 tools

Node status and network info.

- `get_node_status` - Get node status
- `get_node_connection_info` - Get connection info
- `get_network_graph` - Get network graph

### [Logs Tools](./logs/README.md) - 1 tool

Application logging.

- `get_logs` - Retrieve logs

### [Settings Tools](./settings/README.md) - 2 tools

Hub configuration.

- `get_settings` - Get all settings
- `update_settings` - Update settings

### [Admin Tools](./admin/README.md) - 4 tools ⚠️

System administration (use with caution!).

- `start_hub` - Start hub service
- `stop_hub` - Stop hub service
- `encrypt_disk` - Enable disk encryption
- `change_unlock_password` - Change password

### [Auth Tools](./auth/README.md) - 2 tools

Authentication and setup.

- `setup_credentials` - Initial setup
- `unlock_hub` - Unlock hub

---

## 📊 Total: 59 Tools

## 🚀 Quick Start

1. **Read-Only Testing** (Safe to start with):

   - System: `get_hub_info`, `check_health`
   - Wallet: `get_balances`, `get_wallet_address`
   - Channels: `list_channels`
   - Transactions: `list_transactions`

2. **Basic Operations**:

   - Receiving: `create_invoice`
   - Sending: `pay_invoice` (test with small amounts!)
   - Monitoring: `list_transactions`, `get_logs`

3. **Advanced Operations**:

   - Channel management
   - App/NWC management
   - Swaps and autoswap

4. **Admin Operations** ⚠️:
   - **Only on test/development instances!**
   - Always backup first
   - Understand implications

---

## 🔑 Token Requirements

- **Read-Only**: Most GET operations work with read-only tokens
- **Full Access**: POST/DELETE/PATCH operations require full access token

Set in your environment:

```bash
ALBY_HUB_URL=http://localhost:8080
ALBY_HUB_API_TOKEN=<your-token>
```

---

## 📝 Testing Tips

1. **Start Small**: Test read-only operations first
2. **Use Testnet**: For learning and development
3. **Small Amounts**: When testing payments/channels
4. **Probe First**: Use payment probes before real payments
5. **Backup**: Always backup before admin operations

---

## 🔗 Project Structure

```
src/tools/
├── README.md (this file)
├── system/
├── wallet/
├── transactions/
├── payments/
├── invoices/
├── channels/
├── peers/
├── apps/
├── lightning_address/
├── swaps/
├── autoswap/
├── node/
├── logs/
├── settings/
├── admin/
└── auth/
```

Each directory contains:

- Tool implementation files (`.ts`)
- Category README with detailed documentation

---

## 📚 Additional Resources

- [Main Project README](../../README.md)
- [Alby Hub Documentation](https://github.com/getAlby/hub)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)

---

**Happy Testing! ⚡**
