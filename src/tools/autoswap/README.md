# Autoswap Tools Reference

## Tools in this category: 3

Autoswap automatically swaps Lightning funds to on-chain when your Lightning balance exceeds a threshold.

---

## get_autoswap_settings

**Function:** `GET /api/autoswap`  
**Description:** Retrieves current autoswap configuration including enabled status, balance threshold, swap amount, and destination address.  
**Required Input:** None  
**Test Prompt:** "Show me my autoswap settings"

**Response includes:**

- `type` - Swap type (always "out" for Lightning → On-chain)
- `enabled` - Whether autoswap is active
- `balanceThreshold` - Lightning balance threshold in sats
- `swapAmount` - Amount to swap each time in sats
- `destination` - Bitcoin address for swapped funds

---

## update_autoswap_settings

**Function:** `POST /api/autoswap`  
**Description:** Enables and configures autoswap to automatically swap Lightning funds to on-chain when balance exceeds threshold. **Requires full access token.**  
**Required Input:**

- `balanceThreshold` (number, required): Balance threshold in satoshis - autoswap triggers when Lightning balance exceeds this
- `swapAmount` (number, required): Amount in satoshis to swap out each time
- `destination` (string, required): Bitcoin on-chain address to receive swapped funds

**Test Prompt:** "Enable autoswap with threshold 1000000, swap amount 100000, to address bcrt1q..."

---

## disable_autoswap

**Function:** `DELETE /api/autoswap`  
**Description:** Disables autoswap feature. Stops automatic swapping of Lightning funds to on-chain. **Requires full access token.**  
**Required Input:** None  
**Test Prompt:** "Disable autoswap"

---

## Testing Notes

- `get_autoswap_settings` is read-only and safe
- **CAUTION**: Autoswap triggers automatic swaps (costs fees!)
- Test with conservative thresholds first
- Autoswap only works in one direction: Lightning → On-chain
- Monitor swap activity after enabling
- Consider fee implications (see swap out info for current fees)
- Disable when not needed to avoid unexpected swaps
