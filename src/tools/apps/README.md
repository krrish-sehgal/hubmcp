# Apps (NWC) Tools Reference

## Tools in this category: 7

Apps represent Nostr Wallet Connect (NWC) client connections to your hub.

---

## list_apps

**Function:** `GET /api/apps`  
**Description:** Lists all connected apps/NWC clients with their permissions, budgets, and status.  
**Required Input:** None  
**Test Prompt:** "Show me all my connected apps"

---

## get_app_by_pubkey

**Function:** `GET /api/apps?pubkey=:pubkey`  
**Description:** Retrieves a specific app by its nostr pubkey.  
**Required Input:**

- `pubkey` (string, required): App's nostr public key

**Test Prompt:** "Get app with pubkey abc123..."

---

## get_app_by_id

**Function:** `GET /api/apps/:id`  
**Description:** Retrieves a specific app by its ID.  
**Required Input:**

- `id` (number, required): App ID

**Test Prompt:** "Get app with ID 5"

---

## create_app

**Function:** `POST /api/apps`  
**Description:** Creates a new app connection (NWC client) with specified permissions and budget limits. **Requires full access token.**  
**Required Input:**

- `name` (string, required): App name
- `pubkey` (string, required): App's nostr pubkey
- `maxAmount` (number, optional): Maximum payment amount
- `budgetRenewal` (string, optional): Budget renewal period
- `expiresAt` (string, optional): Expiration timestamp
- `scopes` (array, optional): Permission scopes
- `isolated` (boolean, optional): Isolated mode
- `metadata` (object, optional): Additional metadata
- `returnTo` (string, optional): Return URL
- `unlockPassword` (string, optional): Unlock password

**Test Prompt:** "Create an app called 'MyApp' with pubkey abc123..."

---

## update_app

**Function:** `PATCH /api/apps/:id`  
**Description:** Updates an existing app's settings, permissions, or budget. **Requires full access token.**  
**Required Input:**

- `id` (number, required): App ID to update
- `name` (string, optional): New app name
- `maxAmount` (number, optional): New max amount
- `budgetRenewal` (string, optional): New budget renewal
- `scopes` (array, optional): New scopes

**Test Prompt:** "Update app 5 to increase max amount to 10000"

---

## delete_app

**Function:** `DELETE /api/apps/:id`  
**Description:** Deletes an app connection. **Requires full access token.**  
**Required Input:**

- `id` (number, required): App ID to delete

**Test Prompt:** "Delete app with ID 5"

---

## transfer_funds

**Function:** `POST /api/apps/:fromAppId/transfer`  
**Description:** Transfers funds between isolated app wallets. **Requires full access token.**  
**Required Input:**

- `fromAppId` (number, required): Source app ID
- `toAppId` (number, required): Destination app ID
- `amount` (number, required): Amount in sats

**Test Prompt:** "Transfer 1000 sats from app 3 to app 5"

---

## Testing Notes

- list/get operations are read-only and safe
- create_app is safe but requires valid nostr pubkey
- Test with small budget limits first
- delete_app revokes app access immediately
- transfer_funds only works with isolated apps
