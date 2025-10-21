# Lightning Address Tools Reference

## Tools in this category: 2

Lightning addresses are email-like identifiers (user@domain.com) for receiving lightning payments.

**Note:** The Alby Hub API only provides create and delete endpoints for lightning addresses. To view existing lightning addresses, use the `list_apps` tool which includes lightning address information for each app.

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

## Related Tools

- `list_apps` - View all apps with their lightning addresses
- `get_app_by_id` - Get details for a specific app including its lightning address

---

## Testing Notes

- list/get operations are safe and read-only
- Address must be unique on your domain
- Only one address per app
- Deleting doesn't affect the app itself
