const calculateCheckout = (cart) => {
  let subtotal = 0;

  cart.items.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  let discount = 0;
  let appliedCampaign = "No Campaign";

  if (subtotal >= 10000) {
    discount = subtotal * 0.2;
    appliedCampaign = "20% OFF";
  } else if (subtotal >= 5000) {
    discount = subtotal * 0.1;
    appliedCampaign = "10% OFF";
  }

  let diversityDiscount = cart.items.length >= 3 ? 500 : 0;

  const totalDiscount = discount + diversityDiscount;

  return {
    subtotal,
    itemCount: cart.items.length,
    appliedCampaign,
    campaignDiscount: discount,
    diversityDiscount,
    totalDiscount,
    finalTotal: subtotal - totalDiscount,
  };
};

module.exports = { calculateCheckout };