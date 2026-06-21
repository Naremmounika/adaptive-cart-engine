const Cart = require("../models/Cart");
const {
  calculateCheckout,
} = require("../services/campaignService");

const addItemToCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const { productId, name, price, quantity } = req.body;

    // Validation
    if (!productId || !name || !price || !quantity) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let cart = await Cart.findOne({ userId });

    // Create cart if not exists
    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            name,
            price,
            quantity,
          },
        ],
      });
    } else {
      // Check item already exists
      const existingItem = cart.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId,
          name,
          price,
          quantity,
        });
      }

      cart.lastActivity = new Date();
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const removeItemFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId !== productId
    );

    cart.lastActivity = new Date();

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const checkoutSummary = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const summary = calculateCheckout(cart);

    res.status(200).json({
      success: true,
      userId,
      cartItems: cart.items,
      summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  addItemToCart,
  getCart,
  removeItemFromCart,
  checkoutSummary,
};