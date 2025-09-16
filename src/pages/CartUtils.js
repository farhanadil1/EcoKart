export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const minimalProduct = {
      id: product.id,
      name: product.name,
      priceINR: product.priceINR,
      imageUrl: product.imageUrl,
      quantity
    };
    cart.push(minimalProduct);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
  const cart = getCart().filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateQuantity = (productId, delta) => {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      return removeFromCart(productId);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};
