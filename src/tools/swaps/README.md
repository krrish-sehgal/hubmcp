# Swap Tools Reference

## Tools in this category: 5

Submarine swaps exchange onchain bitcoin for lightning bitcoin (and vice versa).

---

## list_swaps

**Function:** `GET /api/swaps`  
**Description:** Lists all submarine swaps with their status, amounts, and details.  
**Required Input:** None  
**Test Prompt:** "Show me all my swaps"

---

## get_swap_out_info

**Function:** `GET /api/swaps/out/info`  
**Description:** Retrieves fee and limit information for swap out operations (Lightning to On-chain). Shows Alby service fee, Boltz service fee, network fee, and min/max amounts.  
**Required Input:** None  
**Test Prompt:** "What are the fees for swapping lightning to onchain?"

---

## get_swap_in_info

**Function:** `GET /api/swaps/in/info`  
**Description:** Retrieves fee and limit information for swap in operations (On-chain to Lightning). Shows Alby service fee, Boltz service fee, network fee, and min/max amounts.  
**Required Input:** None  
**Test Prompt:** "What are the fees for swapping onchain to lightning?"

---

## create_swap_out

**Function:** `POST /api/swaps/out`  
**Description:** Creates a swap out operation to exchange Lightning funds for on-chain bitcoin. **Requires full access token.**  
**Required Input:**

- `swapAmount` (number, required): Amount in satoshis to swap
- `destination` (string, required): Bitcoin on-chain address to receive funds

**Test Prompt:** "Swap 50000 sats from lightning to onchain address bcrt1q..."

---

## create_swap_in

**Function:** `POST /api/swaps/in`  
**Description:** Creates a swap in operation to exchange on-chain bitcoin for Lightning funds. **Requires full access token.**  
**Required Input:**

- `swapAmount` (number, required): Amount in satoshis to swap

**Test Prompt:** "Swap 50000 sats from onchain to lightning"

---

## Testing Notes

- **CAUTION**: Swaps involve real bitcoin and fees!
- Check fee info before creating swaps
- Minimum amount: 25,000 sats (25k)
- Maximum amount: 25,000,000 sats (25M)
- Test with small amounts first
- Monitor swap status (can take time to complete)
- Use testnet/regtest for learning
