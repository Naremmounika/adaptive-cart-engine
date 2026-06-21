const validateCartItem = (req, res, next) => {
  const { productId, name, price, quantity } = req.body;

  if (!productId || !name) {
    return res.status(400).json({
      success: false,
      message: "productId and name are required",
    });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      success: false,
      message: "price must be greater than 0",
    });
  }

  if (typeof quantity !== "number" || quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: "quantity must be greater than 0",
    });
  }

  next();
};

module.exports = validateCartItem;