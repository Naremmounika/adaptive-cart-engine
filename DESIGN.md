# DESIGN DOCUMENT

## 1. Architecture
The project follows MVC-like separation:
- routes → API endpoints
- controllers → business logic
- models → database schema
- services → reusable logic (campaign engine)
- middleware → validation + logging

---

## 2. Schema Design Decision
Cart schema uses embedded item documents because:
- Faster reads for cart retrieval
- Easier checkout calculations
- Reduces joins/population complexity

---

## 3. Multi-Tenant Isolation
Each user is identified by `userId`, ensuring cart separation.

---

## 4. Campaign Engine Logic
Implemented a tier-based discount system:
- ₹5000 → 10%
- ₹10000 → 20%
- 3+ items → ₹500 discount

This simulates real-world promotional systems.

---

## 5. Validation Strategy
Middleware validates:
- missing fields
- invalid price/quantity
- malformed payloads

Returns structured 400 responses.

---

## 6. Feature X: Request Logging
A custom middleware logs:
- timestamp
- HTTP method
- endpoint

This simulates production observability.

---

## 7. Edge Cases Handled
- Cart auto-creation
- Duplicate product quantity merge
- Empty cart handling
- Missing cart error responses

---

## 8. Trade-offs
Used embedded schema instead of referencing for simplicity and performance.

---

## 9. Future Improvements
- Redis caching
- Auth (JWT)
- Rate limiting
- Cart TTL expiration