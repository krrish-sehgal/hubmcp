# Swap Tools Reference

## Tools in this category: 3

Submarine swaps exchange onchain bitcoin for lightning bitcoin (and vice versa).

---

## list_swaps

**Function:** `GET /api/swaps`  
**Description:** Lists all submarine swaps with their status, amounts, and details.  
**Required Input:** None  
**Test Prompt:** "Show me all my swaps"

---

## create_swap

**Function:** `POST /api/swaps`  
**Description:** Creates a new submarine swap to exchange onchain bitcoin for lightning or vice versa. **Requires full access token.**  
**Required Input:**

- `amount` (number, required): Amount in satoshis
- `direction` (string, required): "onchain_to_lightning" or "lightning_to_onchain"

**Test Prompt:** "Create a swap to convert 100000 sats from onchain to lightning"

---

## get_swap_info

**Function:** `GET /api/swaps/:swapId`  
**Description:** Retrieves detailed information about a specific swap including status and transaction details.  
**Required Input:**

- `swapId` (string, required): Swap ID

**Test Prompt:** "Get info for swap abc123"

---

## Testing Notes

- **CAUTION**: Swaps involve real bitcoin and fees!
- Test with small amounts first
- Monitor swap status (can take time to complete)
- Understand swap fees before creating
- Use testnet for learning
