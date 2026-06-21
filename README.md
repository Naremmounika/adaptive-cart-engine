#  Adaptive Cart Engine (Node.js + MongoDB)

##  Overview
A production-style Shopping Cart Backend API built using Node.js, Express, and MongoDB.  
It supports multi-user carts, dynamic pricing campaigns, and full CRUD operations.

---

##  Features

### 1. Multi-user Cart System
Each user has an isolated cart using `userId`.

### 2. Cart Operations
- Add item to cart
- View cart
- Remove item

### 3. Dynamic Pricing Engine
Tiered discount system:
- ₹5000+ → 10% discount
- ₹10000+ → 20% discount
- 3+ unique items → ₹500 bonus discount

### 4. Feature X (Production Enhancement)
✔ Request Logging Middleware  
Logs all API requests with timestamp, method, and route.

---

##  Project Structure
src/
- config/
- controllers/
- middleware/
- models/
- routes/
- services/

---

##  API Endpoints

### Add Item
POST /cart/:userId/items

### Get Cart
GET /cart/:userId

### Remove Item
DELETE /cart/:userId/items/:productId

### Checkout
GET /cart/:userId/checkout

---
##  Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## acSetup

```bash
npm install
npm run dev