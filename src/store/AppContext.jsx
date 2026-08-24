import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.findIndex(
        (i) =>
          i.product.id === action.item.product.id &&
          i.size === action.item.size &&
          i.color === action.item.color,
      );
      if (existing >= 0) {
        const updated = [...state.cart];
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + action.item.quantity,
        };
        return { ...state, cart: updated };
      }
      return { ...state, cart: [...state.cart, action.item] };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (i) =>
            !(
              i.product.id === action.productId &&
              i.size === action.size &&
              i.color === action.color
            ),
        ),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.product.id === action.productId &&
          i.size === action.size &&
          i.color === action.color
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "TOGGLE_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.productId)
          ? state.wishlist.filter((id) => id !== action.productId)
          : [...state.wishlist, action.productId],
      };
    case "SET_USER":
      return { ...state, user: action.user };
    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, action.toast] };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };
    case "TOGGLE_DARK":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}
const initial = {
  cart: [],
  wishlist: [],
  user: null,
  toasts: [],
  darkMode: false,
};
const AppContext = createContext(null);
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const addToCart = useCallback((item) => {
    dispatch({ type: "ADD_TO_CART", item });
  }, []);
  const removeFromCart = useCallback((productId, size, color) => {
    dispatch({ type: "REMOVE_FROM_CART", productId, size, color });
  }, []);
  const updateQty = useCallback((productId, size, color, quantity) => {
    dispatch({ type: "UPDATE_QTY", productId, size, color, quantity });
  }, []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const toggleWishlist = useCallback((productId) => {
    dispatch({ type: "TOGGLE_WISHLIST", productId });
  }, []);
  const setUser = useCallback((user) => {
    dispatch({ type: "SET_USER", user });
  }, []);
  const toast = useCallback((message, type = "success") => {
    const id = Math.random().toString(36).slice(2);
    dispatch({ type: "ADD_TOAST", toast: { id, message, type } });
    setTimeout(() => dispatch({ type: "REMOVE_TOAST", id }), 3500);
  }, []);
  const toggleDark = useCallback(() => dispatch({ type: "TOGGLE_DARK" }), []);
  const cartCount = state.cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = state.cart.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0,
  );
  return (
    <AppContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        setUser,
        toast,
        toggleDark,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
