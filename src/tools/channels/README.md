# Channel Tools Reference

## Tools in this category: 6

---

## list_channels

**Function:** `GET /api/channels`  
**Description:** Lists all your lightning channels showing capacity, local/remote balance, channel state (active/inactive/pending), peer information, fees, and other channel properties. Essential for understanding your liquidity and routing capability.  
**Required Input:** None  
**Test Prompt:** "Show me all my lightning channels"

---

## get_channel_suggestions

**Function:** `GET /api/channels/suggestions`  
**Description:** Returns suggested peers for opening new channels. These suggestions are typically well-connected nodes that would improve your routing and liquidity. Useful when deciding where to allocate channel capacity.  
**Required Input:** None  
**Test Prompt:** "Suggest good peers for opening channels"

---

## open_channel

**Function:** `POST /api/channels`  
**Description:** Opens a new lightning channel to a peer node. You specify the peer's public key, channel capacity in sats, whether the channel should be public (announced to the network), and optionally the peer's host and port for connection. **Requires full access token.** This is how you increase your lightning network liquidity.  
**Required Input:**

- `pubkey` (string, required): Peer node public key
- `capacity` (number, required): Channel capacity in satoshis
- `public` (boolean, optional): Make channel public (default: false)
- `host` (string, optional): Peer host address
- `port` (number, optional): Peer port number

**Test Prompt:** "Open a 500000 sat public channel to node 02abc..."

---

## close_channel

**Function:** `DELETE /api/peers/:peerId/channels/:channelId`  
**Description:** Closes an existing lightning channel. You can choose cooperative close (normal) or force close (unilateral). Force closing should be used only when the peer is unresponsive, as it results in longer settlement times and potentially higher fees. **Requires full access token.**  
**Required Input:**

- `peerId` (string, required): Peer ID
- `channelId` (string, required): Channel ID to close
- `force` (boolean, optional): Force close channel (default: false)

**Test Prompt:** "Close channel abc123 with peer xyz789"

---

## update_channel

**Function:** `PATCH /api/peers/:peerId/channels/:channelId`  
**Description:** Updates channel settings, primarily forwarding fee parameters. You can set the base fee (in millisatoshis) and proportional fee (in millionths) charged for routing payments through this channel. **Requires full access token.** Used to optimize your routing revenue.  
**Required Input:**

- `peerId` (string, required): Peer ID
- `channelId` (string, required): Channel ID to update
- `forwardingFeeBaseMsat` (number, optional): Base forwarding fee in millisatoshis
- `forwardingFeeProportionalMillionths` (number, optional): Proportional fee in millionths

**Test Prompt:** "Set base fee to 1000 msats and proportional fee to 100 for channel abc123"

---

## rebalance_channel

**Function:** `POST /api/channels/rebalance`  
**Description:** Performs circular rebalancing by routing a payment to yourself through a specific peer. This lets you move liquidity between your channels to optimize balance distribution. You specify the peer's pubkey to receive through and the amount in sats. **Requires full access token.** This is essential for maintaining routing capability.  
**Required Input:**

- `receiveThroughNodePubkey` (string, required): Node pubkey to route through
- `amountSat` (number, required): Amount in satoshis to rebalance

**Test Prompt:** "Rebalance 100000 sats through peer 03xyz..."

---

## Testing Notes

- **CAUTION**: Channel operations affect real funds!
- Use testnet for learning
- Always backup channel state before force-closing
- Start with list/get operations (read-only)
- Consider channel opening costs (onchain fees)
