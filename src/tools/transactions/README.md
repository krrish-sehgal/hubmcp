# Transaction Tools Reference

## Tools in this category: 3

---

## list_transactions

**Function:** `GET /api/transactions`  
**Description:** Lists all lightning transactions processed by your hub with pagination support. You can filter by appId to see transactions for a specific connected app, and use limit/offset for pagination. Returns transaction details including payment hash, amount, fees, preimage, and timestamps.  
**Required Input:**

- `appId` (string, optional): Filter by app ID
- `limit` (number, optional): Number of results (default: 20)
- `offset` (number, optional): Pagination offset (default: 0)

**Test Prompt:** "Show me my last 10 lightning transactions"

---

## lookup_transaction

**Function:** `GET /api/transactions/:paymentHash`  
**Description:** Retrieves detailed information about a specific transaction using its payment hash (hex-encoded hash of the payment preimage). Returns full transaction details including amount, state, app ID, and metadata.  
**Required Input:**

- `paymentHash` (string, required): Hex-encoded payment hash

**Test Prompt:** "Look up transaction with payment hash abc123..."

---

## list_onchain_transactions

**Function:** `GET /api/node/transactions`  
**Description:** Lists all onchain Bitcoin transactions associated with your node. Shows transaction IDs, amounts, confirmation status, and timestamps for deposits and withdrawals to your hub's onchain wallet.  
**Required Input:** None  
**Test Prompt:** "Show me all my onchain transactions"

---

## Testing Notes

- All are read-only operations, safe to test
- Use pagination to avoid large responses
- Payment hashes are 64-character hex strings
- Useful for auditing and reconciliation
