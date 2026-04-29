import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    // Return a safe fallback rather than throwing, to prevent crash entirely if provider is missing.
    // However, App.jsx has it, but it doesn't hurt.
    console.error('useCart must be used within a CartProvider');
    return {
      cartItems: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      totalItems: 0,
      cartTotal: 0
    };
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage if available
    const savedCart = localStorage.getItem('gt_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('gt_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Helper to generate a unique key for items with different options
  const getItemKey = (slug, options) => {
    if (!options || Object.keys(options).length === 0) return slug;
    return `${slug}-${JSON.stringify(options)}`;
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const productKey = getItemKey(product.slug, product.selectedOptions);
      const existingItem = prev.find((item) => item.cartId === productKey);
      
      if (existingItem) {
        return prev.map((item) =>
          item.cartId === productKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, cartId: productKey }];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + (item.price || item.basePrice || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
