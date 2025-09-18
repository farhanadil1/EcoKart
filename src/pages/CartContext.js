import { createContext, useContext, useState, useEffect } from "react";
import { getCart, removeFromCart, updateQuantity } from "../pages/CartUtils";
import products from "../data/products.json";
import { calculateCartTotals } from "./calculateCartTotals";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const loadCart = () => {
    const cart = getCart();
    const cartWithDetails = cart
      .map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.id);
        if (!product) return null;
        return { ...product, quantity: cartItem.quantity };
      })
      .filter(Boolean);
    setCartItems(cartWithDetails);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = (product, quantity = 1) => {
    const currentCart = getCart();

    const existing = currentCart.find((item) => item.id === product.id);
    let updatedCart;
    if (existing) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Updates state immediately so cart page reflects changes
    const cartWithDetails = updatedCart
      .map((cartItem) => {
        const productDetails = products.find((p) => p.id === cartItem.id);
        if (!productDetails) return null;
        return { ...productDetails, quantity: cartItem.quantity };
      })
      .filter(Boolean);

    setCartItems(cartWithDetails);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    loadCart();
  };

  const handleQuantityChange = (id, delta) => {
    updateQuantity(id, delta);
    loadCart();
  };

  const applyPromoCode = (code) => {
    if (code === "SAVE10") {
      setDiscount(0.1);
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  const totals = calculateCartTotals(cartItems, discount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,         
        handleRemove,
        handleQuantityChange,
        discount,
        applyPromoCode,
        ...totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
