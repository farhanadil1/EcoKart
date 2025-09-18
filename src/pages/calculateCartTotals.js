export const calculateCartTotals = (cartItems, discount = 0) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.priceINR * item.quantity,
    0
  );

  // Always 10% discount on subtotal
  const baseDiscountAmount = subtotal * 0.1;

  // Promo discount (from context / promo code)
  const promoDiscountAmount = subtotal * discount;

  // Total discount = base + promo
  const totalDiscount = baseDiscountAmount + promoDiscountAmount;

  const taxRate = 0.05;
  const taxAmount = (subtotal - totalDiscount) * taxRate;

  const shippingFee = cartItems.length > 0
    ? (subtotal > 500 ? 0 : 100)
    : 0;

  const finalTotal = subtotal + taxAmount + shippingFee - totalDiscount;

  return {
    subtotal,
    baseDiscountAmount,
    promoDiscountAmount,
    totalDiscount,
    taxAmount,
    shippingFee,
    finalTotal,
  };
};
