# Alby Hub MCP Server

A comprehensive Model Context Protocol (MCP) server for interacting with [Alby Hub](https://albyhub.com/) - your self-custodial Lightning node and Bitcoin wallet.

This MCP server provides **58 tools** across 16 categories, giving AI agents complete control over your Lightning Network operations, on-chain transactions, channel management, and more.

## 🚀 Features

- ✅ **58 Tools** across 16 categories - Complete Alby Hub API coverage
- ✅ **STDIO transport** (default) - Perfect for local AI agents like Goose, Claude Desktop
- ✅ **HTTP Streamable transport** - For remote/hosted scenarios
- ✅ **Bearer authentication** - Secure API token-based authentication
- ✅ **TypeScript** - Full type safety and excellent IDE support
- ✅ **Organized structure** - Tools categorized by functionality
- ✅ **Comprehensive docs** - README for each category with examples

## 📦 Tool Categories

- **System** (2 tools) - Hub info, health checks
- **Wallet** (8 tools) - Balances, addresses, signing, on-chain operations
- **Transactions** (3 tools) - Lightning and on-chain transaction history
- **Payments** (3 tools) - Send payments, route probing
- **Invoices** (2 tools) - Create BOLT11/BOLT12 invoices
- **Channels** (6 tools) - Open, close, rebalance Lightning channels
- **Peers** (3 tools) - Connect to Lightning Network peers
- **Apps (NWC)** (7 tools) - Nostr Wallet Connect app management
- **Lightning Address** (2 tools) - Lightning address management
- **Swaps** (5 tools) - Submarine swaps (on-chain ↔ Lightning)
- **Autoswap** (3 tools) - Automatic balance management
- **Node** (3 tools) - Node status and network graph
- **Logs** (1 tool) - Application logs
- **Settings** (2 tools) - Hub configuration
- **Admin** (4 tools) - Hub administration

> **📖 Full tool reference:** See [src/tools/README.md](./src/tools/README.md) for complete documentation

## Quick Start

### Prerequisites

- Node.js 18+ or compatible runtime
- An Alby Hub instance (local or hosted)
- An API token from your Alby Hub

### Installation

```bash
npm install
npm run build
```

### Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env`:

```env
ALBY_HUB_URL=http://localhost:8080
ALBY_HUB_API_TOKEN=your_api_token_here

# Optional for hosted hub:
# ALBY_HUB_NAME=your_hub_name
# ALBY_HUB_REGION=your_region

# Optional:
# REQUEST_TIMEOUT=30000
# MODE=stdio
```

### Get Your API Token

1. Open your Alby Hub
2. Go to Settings → Developer
3. Create a new API token
4. Choose "readonly" for balances only, or "full access" for creating/paying invoices
5. Copy the token to your `.env` file

## Usage

### With Goose CLI

1. Run `goose configure`
2. Select "Add extension" → "Command Line Extension"
3. Name: `alby-hub`
4. Command: `node /path/to/hubmcp/build/index.js`
5. Timeout: 30
6. Add environment variables:
   - `ALBY_HUB_URL`: Your hub URL
   - `ALBY_HUB_API_TOKEN`: Your API token

Now you can ask Goose natural language commands like:

- "Check my Alby Hub balance"
- "Create a 1000 sat invoice for coffee"
- "Pay this invoice: lnbc..."
- "Open a channel to this node with 500k sats"
- "What are the fees for swapping lightning to on-chain?"
- "Show me my recent transactions"

### With Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "alby-hub": {
      "command": "node",
      "args": ["/absolute/path/to/hubmcp/build/index.js"],
      "env": {
        "ALBY_HUB_URL": "http://localhost:8080",
        "ALBY_HUB_API_TOKEN": "your_token_here"
      }
    }
  }
}
```

### HTTP Mode (for remote access)

Set `MODE=http` in your `.env`:

```env
MODE=http
PORT=3000
```

Then run:

```bash
npm start
```

The server will be available at `http://localhost:3000/mcp`

**Security Note**: When using HTTP mode, implement your own authentication layer. Don't expose this directly to the internet with just the API token.

## 📚 Documentation

### Tool Categories & Examples

**💰 Wallet & Balances**

- Get balances (Lightning + on-chain)
- Generate new addresses
- Sign messages
- Send on-chain bitcoin

**⚡ Lightning Operations**

- Create invoices (BOLT11/BOLT12)
- Pay invoices
- Send spontaneous payments (keysend)
- Probe payment routes

**🔌 Channel Management**

- List channels
- Open new channels with peers
- Close channels
- Rebalance channels
- Get channel recommendations

**🔄 Swaps & Autoswap**

- Swap Lightning ↔ On-chain
- Get swap fees and limits
- Configure automatic swapping
- Enable/disable autoswap

**👥 Apps & Connections**

- Manage Nostr Wallet Connect apps
- Create Lightning addresses
- Connect to peers
- Transfer funds between apps

**⚙️ Administration**

- View hub info and settings
- Update currency preferences
- Access logs
- Manage hub services

> **📖 Complete API reference:** [src/tools/README.md](./src/tools/README.md)

## Error Handling

The server provides clear error messages:

- **401 Unauthorized**: Invalid or missing API token
- **403 Forbidden**: Operation requires full access token (readonly token provided)
- **400 Bad Request**: Invalid input (e.g., missing amount for zero-amount invoice)
- **500 Internal Server Error**: Server-side issues
- **Timeout**: Request exceeded configured timeout

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev

# Inspect tools (test without an LLM)
npm run inspect
```

## Transports

### STDIO (Default)

Best for local AI agents and editors. No network exposure.

### HTTP Streamable

For remote/hosted scenarios. Requires additional authentication layer for production use.

To use HTTP transport, set `MODE=http` in environment variables.

## 🧪 Testing

### Test with readonly token:

1. Set a readonly token in `.env`
2. Read-only tools should work (balances, info, lists)
3. Write operations should return 403 Forbidden

### Test with full access token:

1. Set a full access token in `.env`
2. All 58 tools should work
3. Test incrementally (start with safe read operations)
4. Use testnet/regtest for learning

### Quick Tests

```bash
# Test available (in project root)
node test-settings.js      # Test settings endpoints
node test-swaps.js         # Test swap operations
node test-autoswap.js      # Test autoswap configuration
node test-app-logs.js      # Test log retrieval
```

## 🔒 Security

- ⚠️ **Never commit `.env`** - Contains sensitive API tokens
- 🔑 **Token permissions** - Use readonly tokens when possible
- 🌐 **HTTP mode** - Add authentication layer for production
- 🚫 **Don't expose publicly** - Local use recommended
- 🧪 **Test on regtest** - Learn safely without real funds
- 📝 **Be cautious** - Tools can send real bitcoin and trigger swaps

## ⚡ What is Alby Hub?

[Alby Hub](https://albyhub.com/) is your self-custodial Lightning node and Bitcoin wallet:

- 🏠 **Self-custodial** - You control your keys
- ⚡ **Lightning Network** - Send/receive instant payments
- 🔗 **Multiple backends** - LND, Core Lightning, Phoenixd, Breez SDK
- 🌐 **Nostr Wallet Connect** - Connect to Nostr apps
- 💼 **Multi-app support** - Isolated budgets and permissions
- 🔄 **Submarine swaps** - Exchange Lightning ↔ On-chain seamlessly

## License

Apache-2.0

## 📖 Resources

- **Tool Documentation**: [src/tools/README.md](./src/tools/README.md) - Complete tool reference
- **Alby Hub**: [albyhub.com](https://albyhub.com/) - Download and setup
- **Alby Support**: [support.getalby.com](https://support.getalby.com/) - Help and tutorials
- **MCP Specification**: [modelcontextprotocol.io](https://modelcontextprotocol.io/) - Learn about MCP
- **Goose**: [block.github.io/goose](https://block.github.io/goose/) - AI agent framework

## 🤝 Support & Contributing

- 🐛 **Issues**: Open an issue on GitHub for bugs or feature requests
- 💡 **Ideas**: Share your suggestions and use cases
- 🔧 **Pull Requests**: Contributions welcome!
- 💬 **Community**: Join [Alby Discord](https://discord.gg/satoshispritz) for discussions

## 📄 License

MIT License

---

**Made with ⚡ for the Lightning Network**
