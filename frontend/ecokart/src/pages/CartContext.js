import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getAccessToken } from "../utils/auth";

const CartContext = createContext();
const API = process.env.REACT_APP_API_URL;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState({});

  const API_URL = `${API}/carts`;

  //Include cookies in all requests
  const axiosConfig = {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  };

  //Fetch Cart
  const fetchCart = useCallback(async () => {
    try {
      const res = await axios.get(API_URL, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      });
      setCartItems(res.data.data?.items || []);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add to Cart
  const addToCart = async (productId, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product._id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            product: {
              _id: productId,
              price: 0,
              name: "Loading...",
              imageUrl: ""
            },
            quantity
          }
        ];
      }
    });

    try {
      await axios.post(
        `${API_URL}/add/${productId}`,
        { quantity },
        axiosConfig
      );
      fetchCart(); // sync with backend
    } catch (error) {
      console.error("Add to cart failed", error);
      toast.error("Failed to add item to cart.");
      fetchCart(); // revert if needed
    }
  };

  // Increase quantity
  const increaseQuantity = async (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

    try {
      await axios.put(
        `${API_URL}/increase/product/${productId}`,
        {},
        axiosConfig
      );
    } catch (error) {
      console.error("Increase failed", error);
      toast.error("Failed to increase quantity");
      fetchCart(); // revert
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    try {
      await axios.put(
        `${API_URL}/decrease/product/${productId}`,
        {},
        axiosConfig
      );
    } catch (error) {
      console.error("Decrease failed", error);
      toast.error("Failed to decrease quantity");
      fetchCart(); // revert
    }
  };

  //Remove
  const handleRemove = async (productId) => {
    // Start spinner
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 200)); // small delay for spinner
      await axios.delete(`${API_URL}/remove/product/${productId}`, axiosConfig);
      // Remove item from UI after delay
      setCartItems((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
      fetchCart();
    } catch (error) {
      console.error("Remove failed", error);
      // Even if API fails, refresh cart so UI stays correct
      fetchCart();
    } finally {
      // Stop spinner
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  //Promo Code
  const applyPromoCode = (code) => {
    if (code === "SAVE10") {
      toast("This promo will be available shortly!", {
        icon: "⚠️"
      });
    } else {
      setDiscount(0);
      toast.error("Invalid promo code.");
    }
  };

  //Totals
  const baseDiscountRate = 0.1; // 10% base discount
  const promoDiscountRate = discount; // 0.1 if promo applied, 0 otherwise

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Apply base discount first
  const baseDiscountAmount = subtotal * baseDiscountRate;

  // Apply promo discount on subtotal after base discount
  const promoDiscountAmount =
    (subtotal - baseDiscountAmount) * promoDiscountRate;

  const totalDiscount = baseDiscountAmount + promoDiscountAmount;

  const taxAmount = subtotal * 0.05;
  let shippingFee = 0;
  if (subtotal > 0 && subtotal <= 500) {
    shippingFee = 40;
  }

  const finalTotal = subtotal - totalDiscount + taxAmount + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        handleRemove,
        applyPromoCode,
        promoDiscountAmount,
        discount,
        subtotal,
        totalDiscount,
        taxAmount,
        shippingFee,
        finalTotal,
        fetchCart, // manual refresh
        loadingItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
