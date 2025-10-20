# Alby Hub MCP Server

A Model Context Protocol (MCP) server for interacting with [Alby Hub](https://albyhub.com/) via its experimental developer API.

This MCP server exposes three tools to interact with your Alby Hub:

- **get_balances** (readonly) - Get current lightning and onchain balances
- **create_invoice** (full access) - Create a lightning invoice
- **pay_invoice** (full access) - Pay a lightning invoice (BOLT11/BOLT12)

## Features

- ✅ STDIO transport (default) - perfect for local AI agents like Goose, Claude Desktop
- ✅ HTTP Streamable transport - for remote/hosted scenarios
- ✅ Bearer authentication support
- ✅ Clear error messages for auth failures, validation errors
- ✅ Timeout configuration
- ✅ TypeScript with full type safety

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

Now you can ask Goose to:

- "Check my Alby Hub balance"
- "Create a lightning invoice for 1000 sats with description 'Coffee'"
- "Pay this invoice: lnbc..."

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

## Tools Reference

### get_balances

Get current wallet balances (readonly operation).

**Input**: None

**Output**:

```json
{
  "onchain": {
    "spendable": 50000,
    "total": 50000
  },
  "lightning": {
    "totalSpendable": 100000,
    "totalReceivable": 50000,
    "nextMaxSpendable": 100000,
    "nextMaxReceivable": 50000
  }
}
```

### create_invoice

Create a lightning invoice (requires full access token).

**Input**:

- `amount` (number): Amount in millisatoshis (msats)
- `description` (string): Invoice description

**Output**:

```json
{
  "invoice": "lnbc...",
  "paymentHash": "abc123...",
  "amount": 1000000,
  "state": "created",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### pay_invoice

Pay a lightning invoice (requires full access token).

**Input**:

- `invoice` (string): BOLT11 or BOLT12 invoice
- `amount` (number, optional): Amount in msats (required for zero-amount invoices)
- `metadata` (object, optional): Additional metadata

**Output**:

```json
{
  "type": "outgoing",
  "state": "settled",
  "paymentHash": "xyz789...",
  "amount": 1000000,
  "feesPaid": 100,
  "createdAt": "2024-01-01T00:00:00Z",
  "settledAt": "2024-01-01T00:00:01Z"
}
```

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

## Testing

### Test with readonly token:

1. Set a readonly token in `.env`
2. `get_balances` should work
3. `create_invoice` should return 403

### Test with full access token:

1. Set a full access token in `.env`
2. All tools should work
3. Create an invoice and verify the invoice string
4. Pay a valid invoice (ensure sufficient balance)

## Security

- Never commit `.env` file or expose API tokens
- Use readonly tokens when only balance checking is needed
- Use full access tokens only when necessary
- In HTTP mode, add your own auth layer (don't rely solely on API token)
- Enable CORS appropriately for HTTP mode
- Don't log secrets

## License

Apache-2.0

## Support

For issues with:

- This MCP server: Open an issue on GitHub
- Alby Hub API: Visit [Alby Support](https://support.getalby.com/)
- Goose integration: Check [Goose documentation](https://block.github.io/goose/)

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.
