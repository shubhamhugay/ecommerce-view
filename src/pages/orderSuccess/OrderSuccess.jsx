import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  AuthContext,
} from "../../context/AuthContext.jsx";

import {
  getOrderById,
} from "../../service/OrderService.jsx";


function OrderSuccess() {

  const { id } = useParams();


  const {
    isAuthenticated,
    loading: authLoading,
  } = useContext(AuthContext);


  const [order, setOrder] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  useEffect(() => {

    if (authLoading) {
      return;
    }


    if (!isAuthenticated) {

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);

      return;
    }


    const loadOrder = async () => {

      const token =
        localStorage.getItem(
          "authToken"
        );


      if (!token) {

        setLoading(false);

        return;
      }


      try {

        setLoading(true);

        setError("");


        const response =
          await getOrderById(
            id,
            token
          );


        setOrder(
          response.data
        );


      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Unable to load order"
        );


      } finally {

        setLoading(false);

      }
    };


    loadOrder();


  }, [
    id,
    isAuthenticated,
    authLoading,
  ]);


  // =================================
  // AUTH LOADING
  // =================================

  if (authLoading) {

    return (

      <div className="container py-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        >
        </div>

      </div>

    );
  }


  // =================================
  // NOT LOGGED IN
  // =================================

  if (!isAuthenticated) {

    return (

      <div className="container py-5">

        <div className="alert alert-warning text-center">

          Please login to view this order.

        </div>


        <div className="text-center">

          <Link
            to="/login"
            className="btn btn-primary"
          >

            Login

          </Link>

        </div>

      </div>

    );
  }


  // =================================
  // ORDER LOADING
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

          Loading your order...

        </p>

      </div>

    );
  }


  // =================================
  // ERROR
  // =================================

  if (error) {

    return (

      <div className="container py-5">

        <div className="alert alert-danger">

          <i className="bx bx-error-circle me-2"></i>

          {error}

        </div>


        <Link
          to="/products"
          className="btn btn-primary"
        >

          Continue Shopping

        </Link>

      </div>

    );
  }


  // =================================
  // PAYMENT NOT COMPLETE
  // =================================

  if (
    !order ||
    order.status !== "PAID"
  ) {

    return (

      <div className="container py-5">

        <div className="row justify-content-center">

          <div className="col-lg-7">

            <div className="card border-0 shadow-sm">

              <div className="card-body text-center p-5">


                <i className="bx bx-time-five display-1 text-warning"></i>


                <h2 className="fw-bold mt-3">

                  Payment Not Completed

                </h2>


                <p className="text-secondary">

                  This order has not been successfully paid yet.

                </p>


                <Link
                  to="/cart"
                  className="btn btn-primary"
                >

                  Return to Cart

                </Link>


              </div>

            </div>

          </div>

        </div>

      </div>

    );
  }


  // =================================
  // SUCCESS PAGE
  // =================================

  return (

    <div className="container py-5">


      <div className="row justify-content-center">

        <div className="col-lg-8">


          <div className="card border-0 shadow">

            <div className="card-body p-4 p-md-5">


              {/* SUCCESS HEADING */}

              <div className="text-center mb-5">


                <i className="bx bx-check-circle display-1 text-success"></i>


                <h2 className="fw-bold mt-3">

                  Payment Successful!

                </h2>


                <p className="text-secondary">

                  Thank you for your purchase.

                </p>


                <span className="badge text-bg-success fs-6">

                  {order.status}

                </span>


              </div>



              {/* ORDER DETAILS */}

              <div className="row g-3 mb-4">


                <div className="col-md-6">

                  <div className="border rounded p-3">

                    <small className="text-secondary">

                      Order ID

                    </small>

                    <h6 className="fw-bold mb-0 mt-1">

                      #{order.id}

                    </h6>

                  </div>

                </div>


                <div className="col-md-6">

                  <div className="border rounded p-3">

                    <small className="text-secondary">

                      Order Date

                    </small>

                    <h6 className="fw-bold mb-0 mt-1">

                      {new Date(
                        order.createdAt
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </h6>

                  </div>

                </div>


              </div>



              <h5 className="fw-bold mb-3">

                Purchased Products

              </h5>



              {/* ORDER ITEMS */}

              <div className="list-group mb-4">


                {order.items.map(
                  (item) => (

                    <div
                      className="list-group-item"
                      key={item.id}
                    >

                      <div className="d-flex justify-content-between align-items-center">


                        <div>

                          <h6 className="fw-bold mb-1">

                            {item.productName}

                          </h6>


                          <small className="text-secondary">

                            ₹{Number(
                              item.unitPrice
                            ).toLocaleString(
                              "en-IN"
                            )}

                            {" × "}

                            {item.quantity}

                          </small>

                        </div>


                        <strong>

                          ₹{Number(
                            item.subTotal
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </strong>


                      </div>

                    </div>

                  )
                )}


              </div>



              {/* TOTAL */}

              <div className="d-flex justify-content-between align-items-center border-top pt-4">

                <h5 className="fw-bold mb-0">

                  Total Paid

                </h5>


                <h3 className="fw-bold text-primary mb-0">

                  ₹{Number(
                    order.totalAmount
                  ).toLocaleString(
                    "en-IN"
                  )}

                </h3>

              </div>



              {/* PAYMENT ID */}

              <div className="alert alert-light border mt-4">

                <small className="text-secondary">

                  Razorpay Payment ID

                </small>

                <div className="fw-semibold mt-1">

                  {order.razorpayPaymentId}

                </div>

              </div>



              {/* BUTTON */}

              <div className="d-flex justify-content-center gap-3 mt-4">


                <Link
                  to="/products"
                  className="btn btn-primary btn-lg"
                >

                  <i className="bx bx-shopping-bag me-2"></i>

                  Continue Shopping

                </Link>


                <Link
                  to="/orders"
                  className="btn btn-outline-primary btn-lg"
                >

                  <i className="bx bx-receipt me-2"></i>

                  My Orders

                </Link>


              </div>


            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


export default OrderSuccess;