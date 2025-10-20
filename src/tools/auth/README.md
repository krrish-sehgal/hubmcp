# Auth Tools Reference

## Tools in this category: 2

---

## setup_credentials

**Function:** `POST /api/setup`  
**Description:** Sets up initial credentials for hub access during first-time setup. **Requires full access token.**  
**Required Input:**

- `email` (string, optional): Email address
- `password` (string, required): Password (minimum 8 characters)

**Test Prompt:** "Setup credentials with password 'securepass123'"

---

## unlock_hub

**Function:** `POST /api/unlock`  
**Description:** Unlocks the hub using the unlock password (typically after restart or when locked).  
**Required Input:**

- `password` (string, required): Unlock password

**Test Prompt:** "Unlock the hub with password 'mypassword'"

---

## Testing Notes

- setup_credentials typically used only once
- unlock_hub needed after hub restart or lock
- **Store passwords securely!**
- Test on development hub first
