import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  getItemQuantity: () => 0,
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  isCheckoutOpen: false,
  openCheckout: () => {},
  closeCheckout: () => {},
});

const CART_STORAGE_KEY = "shilpa_astro_cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1, showToast = true) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.slug === product.slug);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevCart, { product, quantity }];
    });

    if (showToast) {
      toast.success(`${product.name} added to cart!`);
    }
  }, []);

  const removeFromCart = useCallback((slug) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.slug !== slug));
    toast.info("Item removed from cart");
  }, []);

  const updateQuantity = useCallback((slug, newQty) => {
    if (newQty <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.product.slug !== slug));
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.slug === slug ? { ...item, quantity: newQty } : item
      )
    );
  }, []);

  const getItemQuantity = useCallback(
    (slug) => {
      const item = cart.find((i) => i.product.slug === slug);
      return item ? item.quantity : 0;
    },
    [cart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const openCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
