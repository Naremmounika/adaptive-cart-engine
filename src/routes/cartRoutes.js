const express = require("express");

const router = express.Router();

const {
  addItemToCart,
  getCart,
  removeItemFromCart,
  checkoutSummary,
} = require("../controllers/cartController");
const validateCartItem = require("../middleware/validateCart");

router.post("/:userId/items", validateCartItem, addItemToCart);
router.get("/:userId", getCart);
router.delete("/:userId/items/:productId", removeItemFromCart);
router.get("/:userId/checkout", checkoutSummary);

module.exports = router;