import {
    useContext,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    AuthContext,
} from "../../context/AuthContext.jsx";

import {
    CartContext,
} from "../../context/CartContext.jsx";


function Cart() {

  const {
    isAuthenticated,
  } = useContext(AuthContext);


  const {
    cart,
    cartCount,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);


  const [actionError, setActionError] =
    useState("");


  const [processingProductId, setProcessingProductId] =
    useState(null);


  const [clearingCart, setClearingCart] =
    useState(false);


  // =================================
  // UPDATE PRODUCT QUANTITY
  // =================================

  const handleQuantityChange = async (
    productId,
    quantity
  ) => {

    setActionError("");

    setProcessingProductId(productId);


    try {

      await updateQuantity(
        productId,
        quantity
      );

    } catch (error) {

      setActionError(
        error.response?.data?.message ||
        "Unable to update quantity"
      );

    } finally {

      setProcessingProductId(null);

    }
  };


  // =================================
  // REMOVE PRODUCT
  // =================================

  const handleRemove = async (
    productId
  ) => {

    setActionError("");

    setProcessingProductId(productId);


    try {

      await removeFromCart(productId);

    } catch (error) {

      setActionError(
        error.response?.data?.message ||
        "Unable to remove product"
      );

    } finally {

      setProcessingProductId(null);

    }
  };


  // =================================
  // CLEAR ENTIRE CART
  // =================================

  const handleClearCart = async () => {

    setActionError("");

    setClearingCart(true);


    try {

      await clearCart();

    } catch (error) {

      setActionError(
        error.response?.data?.message ||
        "Unable to clear cart"
      );

    } finally {

      setClearingCart(false);

    }
  };


  // =================================
  // USER NOT LOGGED IN
  // =================================

  if (!isAuthenticated) {

    return (

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-8 col-lg-6">

            <div className="card border-0 shadow-sm">

              <div className="card-body text-center p-5">


                <i className="bx bx-cart display-1 text-secondary"></i>


                <h3 className="fw-bold mt-3">
                  Login Required
                </h3>


                <p className="text-secondary">

                  Please login to view your shopping cart.

                </p>


                <Link
                  to="/login"
                  className="btn btn-primary"
                >

                  <i className="bx bx-log-in me-2"></i>

                  Login

                </Link>


              </div>

            </div>

          </div>

        </div>

      </div>

    );
  }


  // =================================
  // CART LOADING
  // =================================

  if (loading) {

    return (

      <div className="container py-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        >
        </div>


        <p className="text-secondary mt-3">
          Loading your cart...
        </p>

      </div>

    );
  }


  // =================================
  // CART PAGE
  // =================================

  return (

    <div className="container py-5">


      {/* PAGE HEADING */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">

            <i className="bx bx-cart me-2 text-primary"></i>

            Shopping Cart

          </h2>


          <p className="text-secondary mb-0">

            {cartCount} item{cartCount !== 1 ? "s" : ""} in your cart

          </p>

        </div>


        <Link
          to="/products"
          className="btn btn-outline-primary"
        >

          <i className="bx bx-shopping-bag me-2"></i>

          Continue Shopping

        </Link>

      </div>



      {/* API ERROR */}

      {error && (

        <div className="alert alert-danger">

          <i className="bx bx-error-circle me-2"></i>

          {error}

        </div>

      )}



      {/* ACTION ERROR */}

      {actionError && (

        <div className="alert alert-danger">

          <i className="bx bx-error-circle me-2"></i>

          {actionError}

        </div>

      )}



      {/* EMPTY CART */}

      {cart.items.length === 0 ? (

        <div className="card border-0 shadow-sm">

          <div className="card-body text-center py-5">


            <i className="bx bx-cart-alt display-1 text-secondary"></i>


            <h3 className="fw-bold mt-3">
              Your cart is empty
            </h3>


            <p className="text-secondary">

              Add some products and they will appear here.

            </p>


            <Link
              to="/products"
              className="btn btn-primary"
            >

              <i className="bx bx-store me-2"></i>

              Browse Products

            </Link>


          </div>

        </div>

      ) : (

        <div className="row g-4">


          {/* CART ITEMS */}

          <div className="col-lg-8">


            <div className="d-flex flex-column gap-3">


              {cart.items.map((item) => {

                const product =
                  item.product;


                const firstImage =
                  product.imageUrls &&
                  product.imageUrls.length > 0
                    ? product.imageUrls[0]
                    : null;


                const isProcessing =
                  processingProductId === product.id;


                const maximumQuantityReached =
                  item.quantity >= product.stock;


                return (

                  <div
                    className="card border-0 shadow-sm"
                    key={item.id}
                  >

                    <div className="card-body">


                      <div className="row align-items-center g-3">


                        {/* IMAGE */}

                        <div className="col-md-3 text-center">


                          {firstImage ? (

                            <img
                              src={firstImage}
                              alt={product.name}
                              className="img-fluid object-fit-contain"
                              style={{
                                height: "140px",
                              }}
                            />

                          ) : (

                            <div
                              className="
                                bg-light
                                d-flex
                                justify-content-center
                                align-items-center
                              "
                              style={{
                                height: "140px",
                              }}
                            >

                              <i className="bx bx-image fs-1 text-secondary"></i>

                            </div>

                          )}


                        </div>



                        {/* PRODUCT INFORMATION */}

                        <div className="col-md-5">


                          <Link
                            to={`/products/${product.id}`}
                            className="text-decoration-none text-dark"
                          >

                            <h5 className="fw-bold mb-2">

                              {product.name}

                            </h5>

                          </Link>


                          <p className="text-primary fw-semibold mb-2">

                            ₹{Number(product.price)
                              .toLocaleString("en-IN")}

                          </p>


                          <p className="text-secondary small mb-2">

                            Available Stock: {product.stock}

                          </p>


                          {maximumQuantityReached && (

                            <span className="badge text-bg-warning">

                              Maximum available quantity reached

                            </span>

                          )}


                        </div>



                        {/* QUANTITY */}

                        <div className="col-md-4 text-md-end">


                          <p className="small text-secondary mb-2">

                            Quantity

                          </p>


                          <div
                            className="
                              btn-group
                              mb-3
                            "
                            role="group"
                          >


                            {/* MINUS */}

                            <button
                              className="btn btn-outline-secondary"
                              disabled={
                                item.quantity <= 1 ||
                                isProcessing
                              }
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  item.quantity - 1
                                )
                              }
                            >

                              <i className="bx bx-minus"></i>

                            </button>



                            {/* CURRENT QUANTITY */}

                            <button
                              className="btn btn-outline-secondary disabled"
                            >

                              {isProcessing ? (

                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                </span>

                              ) : (

                                item.quantity

                              )}

                            </button>



                            {/* PLUS */}

                            <button
                              className="btn btn-outline-secondary"
                              disabled={
                                maximumQuantityReached ||
                                isProcessing
                              }
                              onClick={() =>
                                handleQuantityChange(
                                  product.id,
                                  item.quantity + 1
                                )
                              }
                            >

                              <i className="bx bx-plus"></i>

                            </button>


                          </div>



                          {/* SUBTOTAL */}

                          <p className="mb-2">

                            Subtotal:

                            <strong className="ms-2">

                              ₹{Number(item.subTotal)
                                .toLocaleString("en-IN")}

                            </strong>

                          </p>



                          {/* REMOVE */}

                          <button
                            className="btn btn-outline-danger btn-sm"
                            disabled={isProcessing}
                            onClick={() =>
                              handleRemove(product.id)
                            }
                          >

                            <i className="bx bx-trash me-1"></i>

                            Remove

                          </button>


                        </div>


                      </div>

                    </div>

                  </div>

                );

              })}


            </div>


          </div>



          {/* ORDER SUMMARY */}

          <div className="col-lg-4">


            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">


                <h4 className="fw-bold">

                  Order Summary

                </h4>


                <hr />


                <div className="d-flex justify-content-between mb-3">

                  <span className="text-secondary">

                    Total Items

                  </span>


                  <strong>
                    {cartCount}
                  </strong>

                </div>


                <div className="d-flex justify-content-between mb-3">

                  <span className="text-secondary">

                    Number of Products

                  </span>


                  <strong>
                    {cart.items.length}
                  </strong>

                </div>


                <hr />


                <div className="d-flex justify-content-between align-items-center mb-4">

                  <h5 className="fw-bold mb-0">

                    Total Amount

                  </h5>


                  <h4 className="fw-bold text-primary mb-0">

                    ₹{Number(cart.totalAmount)
                      .toLocaleString("en-IN")}

                  </h4>

                </div>



                {/* CHECKOUT */}

                <button
                  className="btn btn-primary btn-lg w-100 mb-3"
                  disabled
                >

                  <i className="bx bx-credit-card me-2"></i>

                  Proceed to Checkout

                </button>


                <p className="text-secondary small text-center">

                  Checkout will be connected in the next module.

                </p>



                <hr />



                {/* CLEAR CART */}

                <button
                  className="btn btn-outline-danger w-100"
                  disabled={clearingCart}
                  onClick={handleClearCart}
                >

                  {clearingCart ? (

                    <>

                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      >
                      </span>

                      Clearing...

                    </>

                  ) : (

                    <>

                      <i className="bx bx-trash me-2"></i>

                      Clear Cart

                    </>

                  )}

                </button>


              </div>

            </div>


          </div>


        </div>

      )}


    </div>

  );
}


export default Cart;