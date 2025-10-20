# Wallet Tools Reference

## Tools in this category: 8

---

## get_balances

**Function:** `GET /api/balances`  
**Description:** Retrieves your current lightning and onchain balances. Shows available balance (spendable funds), pending balance (incoming payments), and onchain confirmed/unconfirmed balances. All amounts are returned in satoshis (sats).  
**Required Input:** None  
**Test Prompt:** "What are my current balances?"

---

## get_wallet_address

**Function:** `GET /api/wallet/address`  
**Description:** Returns an unused onchain Bitcoin address from your wallet. This is the address you can share to receive onchain bitcoin payments to your hub.  
**Required Input:** None  
**Test Prompt:** "Give me an onchain address to receive bitcoin"

---

## generate_new_address

**Function:** `POST /api/wallet/new-address`  
**Description:** Generates a fresh onchain Bitcoin address. Unlike get_wallet_address which may return a previously generated unused address, this always creates a new one. **Requires full access token.**  
**Required Input:** None  
**Test Prompt:** "Generate a new onchain address"

---

## get_wallet_capabilities

**Function:** `GET /api/wallet/capabilities`  
**Description:** Returns the wallet's NWC (Nostr Wallet Connect) capabilities including supported scopes (permissions), notification types, and available methods. Useful for understanding what operations your wallet can perform.  
**Required Input:** None  
**Test Prompt:** "What capabilities does my wallet have?"

---

## sign_message

**Function:** `POST /api/wallet/sign-message`  
**Description:** Signs an arbitrary message using your node's private key. Returns a signature that can be verified by others to prove the message came from your node. **Requires full access token.**  
**Required Input:**

- `message` (string, required): The message to sign

**Test Prompt:** "Sign the message 'Hello Alby Hub' with my node key"

---

## redeem_onchain_funds

**Function:** `POST /api/wallet/redeem-onchain-funds`  
**Description:** Sends onchain bitcoin from your hub to an external Bitcoin address. You can specify the amount in sats, set a custom fee rate, or use the sendAll option to send your entire onchain balance. **Requires full access token.** This is how you withdraw bitcoin from your hub to a regular Bitcoin wallet.  
**Required Input:**

- `toAddress` (string, required): Bitcoin address to send to
- `amount` (number, optional): Amount in satoshis (not needed if sendAll is true)
- `feeRate` (number, optional): Custom fee rate in sat/vB
- `sendAll` (boolean, optional): Send entire onchain balance

**Test Prompt:** "Send 10000 sats onchain to bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

---

## sync_wallet

**Function:** `POST /api/wallet/sync`  
**Description:** Triggers a manual wallet rescan to discover new transactions. Useful if you suspect your wallet is out of sync with the blockchain. **Requires full access token.** Returns a 204 No Content on success.  
**Required Input:** None  
**Test Prompt:** "Sync my wallet with the blockchain"

---

## Testing Notes

- Start with read-only operations (balances, address, capabilities)
- Test full-access operations with small amounts first
- Always verify addresses before sending funds
- Use testnet for initial testing
