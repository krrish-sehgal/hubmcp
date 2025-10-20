# Admin Tools Reference

## Tools in this category: 4

**⚠️ CRITICAL WARNING**: These tools perform system-level operations. Use with extreme caution!

---

## start_hub

**Function:** `POST /api/start`  
**Description:** Starts the Alby Hub service. **Requires full access token.**  
**Required Input:** None  
**Test Prompt:** "Start the hub"

---

## stop_hub

**Function:** `POST /api/stop`  
**Description:** Stops the Alby Hub service. **Requires full access token.**  
**Required Input:** None  
**Test Prompt:** "Stop the hub"

---

## encrypt_disk

**Function:** `POST /api/encrypt-disk`  
**Description:** Enables disk encryption for the hub's data storage. **Requires full access token.**  
**Required Input:**

- `password` (string, required): Encryption password (minimum 8 characters)

**Test Prompt:** "Enable disk encryption with password 'securepass123'"

---

## change_unlock_password

**Function:** `POST /api/change-unlock-password`  
**Description:** Changes the hub's unlock password. **Requires full access token.**  
**Required Input:**

- `oldPassword` (string, required): Current password
- `newPassword` (string, required): New password (minimum 8 characters)

**Test Prompt:** "Change unlock password from 'oldpass' to 'newpass123'"

---

## Testing Notes

- **⚠️ NEVER test these on production!**
- Only use on development/test instances
- start/stop affect hub availability
- encrypt_disk is irreversible without password
- Backup all data before using these tools
- Document passwords securely
