# Lightning Address Tools Reference

## Tools in this category: 4

Lightning addresses are email-like identifiers (user@domain.com) for receiving lightning payments.

---

## list_lightning_addresses

**Function:** `GET /api/lightning-addresses`  
**Description:** Lists all lightning addresses configured for your apps.  
**Required Input:** None  
**Test Prompt:** "Show me all my lightning addresses"

---

## get_lightning_address_by_id

**Function:** `GET /api/lightning-addresses/:appId`  
**Description:** Retrieves the lightning address for a specific app.  
**Required Input:**

- `appId` (number, required): App ID

**Test Prompt:** "Get lightning address for app 5"

---

## create_lightning_address

**Function:** `POST /api/lightning-addresses`  
**Description:** Creates a new lightning address for an app. **Requires full access token.**  
**Required Input:**

- `address` (string, required): Lightning address (e.g., "user")
- `appId` (number, required): App ID to associate with

**Test Prompt:** "Create lightning address 'myaddress' for app 5"

---

## delete_lightning_address

**Function:** `DELETE /api/lightning-addresses/:appId`  
**Description:** Deletes the lightning address for an app. **Requires full access token.**  
**Required Input:**

- `appId` (number, required): App ID

**Test Prompt:** "Delete lightning address for app 5"

---

## Testing Notes

- list/get operations are safe and read-only
- Address must be unique on your domain
- Only one address per app
- Deleting doesn't affect the app itself
