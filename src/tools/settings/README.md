# Settings Tools Reference

## Tools in this category: 2

---

## get_settings

**Function:** `GET /api/settings`  
**Description:** Retrieves all hub configuration settings.  
**Required Input:** None  
**Test Prompt:** "Show me my hub settings"

---

## update_settings

**Function:** `PATCH /api/settings`  
**Description:** Updates hub configuration settings. **Requires full access token.**  
**Required Input:**

- `settings` (object, required): Settings object with key-value pairs to update

**Test Prompt:** "Update my hub settings to enable feature X"

---

## Testing Notes

- get_settings is read-only and safe
- **CAUTION**: Changing settings can affect hub behavior!
- Backup current settings before updating
- Test on non-production hub first
- Some settings may require hub restart
