# Logs Tools Reference

## Tools in this category: 1

---

## get_logs

**Function:** `GET /api/logs`  
**Description:** Retrieves application logs for debugging and monitoring with pagination support.  
**Required Input:**

- `limit` (number, optional): Number of log entries to return
- `offset` (number, optional): Pagination offset

**Test Prompt:** "Show me the last 50 log entries"

---

## Testing Notes

- Read-only operation, safe to use
- Use limit to avoid large responses
- Useful for troubleshooting issues
- May contain sensitive information
