import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { AuthContext } from "./AuthContext.jsx";

import {
    addCartItem,
    clearCartItems,
    getCart,
    removeCartItem,
    updateCartItem,
} from "../service/cartService.jsx";


// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();


const emptyCart = {
  id: null,
  items: [],
  totalAmount: 0,
};


function CartProvider({ children }) {

  const {
    isAuthenticated,
    loading: authLoading,
  } = useContext(AuthContext);


  const [cart, setCart] =
    useState(emptyCart);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  // =================================
  // LOAD CART AFTER LOGIN
  // =================================

  useEffect(() => {

    if (authLoading) {
      return;
    }


    if (!isAuthenticated) {

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCart(emptyCart);

      setLoading(false);

      setError("");

      return;
    }


    const loadInitialCart = async () => {

      const token =
        localStorage.getItem("authToken");


      if (!token) {

        setCart(emptyCart);

        setLoading(false);

        return;
      }


      try {

        setLoading(true);

        setError("");


        const response =
          await getCart(token);


        setCart(response.data);


      } catch (error) {

        setCart(emptyCart);

        setError(
          error.response?.data?.message ||
          "Unable to load cart"
        );


      } finally {

        setLoading(false);

      }
    };


    loadInitialCart();


  }, [isAuthenticated, authLoading]);


  // =================================
  // LOAD / REFRESH CART
  // =================================

  const loadCart = async () => {

    const token =
      localStorage.getItem("authToken");


    if (!token) {

      setCart(emptyCart);

      return;
    }


    try {

      setLoading(true);

      setError("");


      const response =
        await getCart(token);


      setCart(response.data);


      return response.data;


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to load cart"
      );


      throw error;


    } finally {

      setLoading(false);

    }
  };


  // =================================
  // ADD PRODUCT TO CART
  // =================================

  const addToCart = async (
    productId,
    quantity = 1
  ) => {

    const token =
      localStorage.getItem("authToken");


    if (!token) {

      throw new Error(
        "Please login to add products to cart"
      );
    }


    try {

      setError("");


      const response =
        await addCartItem(
          productId,
          quantity,
          token
        );


      setCart(response.data);


      return response.data;


    } catch (error) {

      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to add product to cart"
      );


      throw error;
    }
  };


  // =================================
  // UPDATE QUANTITY
  // =================================

  const updateQuantity = async (
    productId,
    quantity
  ) => {

    const token =
      localStorage.getItem("authToken");


    if (!token) {

      throw new Error(
        "Please login first"
      );
    }


    try {

      setError("");


      const response =
        await updateCartItem(
          productId,
          quantity,
          token
        );


      setCart(response.data);


      return response.data;


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to update cart"
      );


      throw error;
    }
  };


  // =================================
  // REMOVE PRODUCT
  // =================================

  const removeFromCart = async (
    productId
  ) => {

    const token =
      localStorage.getItem("authToken");


    if (!token) {

      throw new Error(
        "Please login first"
      );
    }


    try {

      setError("");


      const response =
        await removeCartItem(
          productId,
          token
        );


      setCart(response.data);


      return response.data;


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to remove product from cart"
      );


      throw error;
    }
  };


  // =================================
  // CLEAR CART
  // =================================

  const clearCart = async () => {

    const token =
      localStorage.getItem("authToken");


    if (!token) {

      throw new Error(
        "Please login first"
      );
    }


    try {

      setError("");


      const response =
        await clearCartItems(token);


      setCart(response.data);


      return response.data;


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Unable to clear cart"
      );


      throw error;
    }
  };


  // =================================
  // CALCULATE CART COUNT
  // =================================

  const cartCount =
    cart.items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  return (

    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        error,
        loadCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );
}


export default CartProvider;