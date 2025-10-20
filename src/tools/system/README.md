# System Tools Reference

## Tools in this category: 2

---

## get_hub_info

**Function:** `GET /api/info`  
**Description:** Retrieves comprehensive metadata about your Alby Hub instance, including version number, network (mainnet/testnet/regtest), node backend type (LND/CLN), setup status, and whether it's running in an isolated environment. This is useful for confirming your hub is properly configured and identifying the underlying lightning implementation.  
**Required Input:** None  
**Test Prompt:** "Show me information about my Alby Hub"

---

## check_health

**Function:** `GET /api/health`  
**Description:** Performs a health check on your Alby Hub and connected lightning node. Returns an array of alarms indicating any issues with node connectivity, channel states, or other critical services. An empty alarms array means everything is healthy.  
**Required Input:** None  
**Test Prompt:** "Check if my Alby Hub is healthy"

---

## Testing Notes

- These are read-only operations that don't require special permissions
- Safe to run anytime without side effects
- Useful for monitoring and troubleshooting
