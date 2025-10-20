# Autoswap Tools Reference

## Tools in this category: 2

Autoswap automatically swaps between onchain and lightning to maintain target balances.

---

## get_autoswap_settings

**Function:** `GET /api/autoswap/settings`  
**Description:** Retrieves current autoswap configuration including enabled status and balance thresholds.  
**Required Input:** None  
**Test Prompt:** "Show me my autoswap settings"

---

## update_autoswap_settings

**Function:** `PATCH /api/autoswap/settings`  
**Description:** Updates autoswap configuration to automatically maintain balance between onchain and lightning. **Requires full access token.**  
**Required Input:**

- `enabled` (boolean, optional): Enable/disable autoswap
- `minBalanceSats` (number, optional): Minimum balance threshold
- `maxBalanceSats` (number, optional): Maximum balance threshold

**Test Prompt:** "Enable autoswap with min balance 100000 and max balance 500000"

---

## Testing Notes

- get_autoswap_settings is read-only and safe
- **CAUTION**: Autoswap can trigger automatic swaps (costs fees!)
- Test with conservative thresholds first
- Monitor swap activity after enabling
- Consider fee implications
