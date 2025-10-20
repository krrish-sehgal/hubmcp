# Peer Tools Reference

## Tools in this category: 3

---

## list_peers

**Function:** `GET /api/peers`  
**Description:** Lists all connected lightning network peers. Shows peer pubkeys, connection status, and associated channels.  
**Required Input:** None  
**Test Prompt:** "Show me all my connected peers"

---

## connect_peer

**Function:** `POST /api/peers`  
**Description:** Connects to a new peer node on the lightning network. You need to provide the peer's pubkey and connection string (host:port).  
**Required Input:**

- `pubkey` (string, required): Peer node public key (66-char hex)
- `host` (string, required): Peer host address
- `port` (number, required): Peer port number

**Test Prompt:** "Connect to peer 02abc... at host example.com port 9735"

---

## disconnect_peer

**Function:** `DELETE /api/peers/:peerId`  
**Description:** Disconnects from a peer node. Note: This only disconnects the peer connection, it doesn't close channels. Use close_channel to close channels.  
**Required Input:**

- `peerId` (string, required): Peer ID to disconnect

**Test Prompt:** "Disconnect from peer xyz789"

---

## Testing Notes

- list_peers is read-only and safe
- Connecting peers doesn't cost anything
- Disconnecting doesn't affect existing channels
- You need peer connections before opening channels
