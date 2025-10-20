# Payment Tools Reference

## Tools in this category: 3

---

## pay_invoice

**Function:** `POST /api/payments`  
**Description:** Pays a BOLT11 lightning invoice. Provide the invoice string and the payment will be routed through the lightning network. Returns the preimage as proof of payment. **Requires full access token.**  
**Required Input:**

- `invoice` (string, required): BOLT11 invoice string to pay

**Test Prompt:** "Pay invoice lnbc50n1..."

---

## send_payment_probes

**Function:** `POST /api/send-payment-probes`  
**Description:** Probes potential payment routes for a given invoice without actually sending the payment. This lets you check if a payment is likely to succeed and discover the probable route before committing to pay. **Requires full access token.** Useful for large payments to verify routability.  
**Required Input:**

- `invoice` (string, required): BOLT11 invoice to probe

**Test Prompt:** "Probe payment routes for invoice lnbc100n1..."

---

## send_spontaneous_payment_probes

**Function:** `POST /api/send-spontaneous-payment-probes`  
**Description:** Probes routes for a spontaneous payment (keysend) to a specific node without an invoice. You provide the amount in millisatoshis and the recipient's node public key. **Requires full access token.** This checks if you can reach the node before attempting a real keysend payment.  
**Required Input:**

- `amount` (number, required): Amount in millisatoshis (msats)
- `nodeId` (string, required): Recipient node public key (66-char hex)

**Test Prompt:** "Probe a 10000 millisat spontaneous payment to node 03abc..."

---

## Testing Notes

- **CAUTION**: pay_invoice sends real payments - test with small amounts!
- Use probes before sending large payments
- Always verify invoice details before paying
- Test on testnet/regtest first
