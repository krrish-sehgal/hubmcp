# Logs Tools Reference

## Tools in this category: 1

---

## get_logs

**Function:** `GET /api/log/:type?maxLen=<number>`  
**Description:** Retrieves application or node logs for debugging and monitoring. Log type must be either 'node' (LND logs) or 'app' (Alby Hub logs).  
**Required Input:**

- `type` (string, required): Type of logs to retrieve - either "node" for LND logs (This should not be supported as node logs are huge and can't fit in grpc limit) or "app" for Alby Hub logs
- `maxLen` (number, optional): Maximum number of log lines to return

**Response Format:**

```json
{
  "logs": "...log content as a string..."
}
```

**Test Prompts:**

- "Show me the Alby Hub application logs"
- "Get the last 100 lines of node logs"
- "Show me LND logs"

---

## Testing Notes

- Read-only operation, safe to use
- Use `type: "app"` for Alby Hub application logs
- Use `type: "node"` for LND node logs
- Use `maxLen` to limit the number of log lines returned
- Useful for troubleshooting issues
- May contain sensitive information
