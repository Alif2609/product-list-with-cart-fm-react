import { useState, useContext, createContext } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (menu) => {
    setCart((prev) => {
      return [...prev, { ...menu, quantity: 1 }];
    });
  };

  const getItemQuantity = (productName) => {
    const item = cart.find((item) => item.name === productName);
    return item ? item.quantity : 0;
  };

  const menuIncrement = (productName) => {
    setCart((prev) => {
      return prev.map((item) =>
        item.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };
  const menuDecrement = (productName) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productName) => {
    setCart((prev) => prev.filter((item) => item.name !== productName));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const startNewOrder = () => {
    setCart([]);
  };

  const value = {
    addToCart,
    getItemQuantity,
    menuIncrement,
    menuDecrement,
    totalItems,
    totalPrice,
    removeFromCart,
    startNewOrder,
    cart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  return context;
}

export { CartProvider, useCart };
