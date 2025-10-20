# Invoice Tools Reference

## Tools in this category: 2

---

## create_invoice

**Function:** `POST /api/invoices`  
**Description:** Creates a new lightning invoice that someone can pay to send you sats. You can specify the amount in satoshis and include a description/memo. Returns a BOLT11 invoice string that you share with the payer.  
**Required Input:**

- `amount` (number, required): Amount in satoshis
- `description` (string, optional): Invoice description/memo

**Test Prompt:** "Create an invoice for 5000 sats with description 'Coffee payment'"

---

## create_offer

**Function:** `POST /api/offers`  
**Description:** Creates a BOLT12 offer (reusable payment request). Unlike BOLT11 invoices which are single-use, BOLT12 offers can be paid multiple times and don't expose the amount upfront. You provide a description and get back an offer string starting with "lno...". **Requires full access token.**  
**Required Input:**

- `description` (string, required): Offer description

**Test Prompt:** "Create a BOLT12 offer for donations"

---

## Testing Notes

- create_invoice is safe to test (receiving payments)
- Test with small amounts first
- BOLT12 offers require node support
- Save invoice/offer strings for testing payments
