# Node Tools Reference

## Tools in this category: 3

---

## get_node_status

**Function:** `GET /api/node/status`  
**Description:** Retrieves the current status of your lightning node including connection state, sync status, and version information.  
**Required Input:** None  
**Test Prompt:** "Show me my node status"

---

## get_node_connection_info

**Function:** `GET /api/node/connection-info`  
**Description:** Gets connection information for your node including public key, connection URIs, and network addresses.  
**Required Input:** None  
**Test Prompt:** "Get my node connection info"

---

## get_network_graph

**Function:** `GET /api/node/network-graph`  
**Description:** Retrieves the lightning network graph data showing nodes and channels. **Warning**: This can return very large responses.  
**Required Input:** None  
**Test Prompt:** "Get the network graph"

---

## Testing Notes

- All are read-only operations
- get_network_graph can be very large (use carefully)
- Useful for monitoring and diagnostics
- Connection info needed for others to connect to you
