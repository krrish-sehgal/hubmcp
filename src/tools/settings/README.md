# Settings Tools Reference

## Tools in this category: 2

---

## get_settings

**Function:** `GET /api/info`  
**Description:** Retrieves all hub configuration settings and status information.  
**Required Input:** None  
**Test Prompt:** "Show me my hub settings"

---

## update_settings

**Function:** `PATCH /api/settings`  
**Description:** Updates the hub currency setting. **Only currency can be updated via this endpoint. Requires full access token.**  
**Required Input:**

- `currency` (string, required): Currency code (e.g., "USD", "EUR", "BTC")

**Test Prompt:** "Change my currency to EUR"

---

## Testing Notes

- `get_settings` is read-only and safe
- `update_settings` only accepts currency changes
- Common currency codes: USD, EUR, GBP, BTC, SAT
- Returns HTTP 204 (No Content) on success
