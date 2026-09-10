import {
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    AuthContext,
} from "../../context/AuthContext.jsx";

import {
    getMyOrders,
} from "../../service/OrderService.jsx";


function Orders() {

  const {
    isAuthenticated,
    loading: authLoading,
  } = useContext(AuthContext);


  const [orders, setOrders] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


  // =================================
  // LOAD ORDERS
  // =================================

  useEffect(() => {

    if (authLoading) {
      return;
    }


    if (!isAuthenticated) {
// eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);

      return;
    }


    const loadOrders = async () => {

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
          await getMyOrders(token);


        setOrders(
          response.data
        );


      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Unable to load your orders"
        );


      } finally {

        setLoading(false);

      }
    };


    loadOrders();


  }, [
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

        <div className="row justify-content-center">

          <div className="col-md-8 col-lg-6">

            <div className="card border-0 shadow-sm">

              <div className="card-body text-center p-5">


                <i className="bx bx-receipt display-1 text-secondary"></i>


                <h3 className="fw-bold mt-3">

                  Login Required

                </h3>


                <p className="text-secondary">

                  Please login to view your orders.

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
  // LOADING ORDERS
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

          Loading your orders...

        </p>

      </div>

    );
  }


  return (

    <div className="container py-5">


      {/* PAGE HEADING */}

      <div className="text-center mb-5">

        <i className="bx bx-receipt display-4 text-primary"></i>


        <h2 className="fw-bold mt-2">

          My Orders

        </h2>


        <p className="text-secondary">

          View your previous successful purchases

        </p>

      </div>



      {/* ERROR */}

      {error && (

        <div className="alert alert-danger">

          <i className="bx bx-error-circle me-2"></i>

          {error}

        </div>

      )}



      {/* NO ORDERS */}

      {!error &&
      orders.length === 0 && (

        <div className="row justify-content-center">

          <div className="col-md-8 col-lg-6">

            <div className="card border-0 shadow-sm">

              <div className="card-body text-center py-5">


                <i className="bx bx-shopping-bag display-1 text-secondary"></i>


                <h3 className="fw-bold mt-3">

                  No Orders Yet

                </h3>


                <p className="text-secondary">

                  You have not completed any purchases yet.

                </p>


                <Link
                  to="/products"
                  className="btn btn-primary"
                >

                  <i className="bx bx-store me-2"></i>

                  Start Shopping

                </Link>


              </div>

            </div>

          </div>

        </div>

      )}



      {/* ORDERS */}

      {!error &&
      orders.length > 0 && (

        <div className="row justify-content-center">

          <div className="col-lg-9">


            <div className="d-flex flex-column gap-4">


              {orders.map(
                (order) => (

                  <div
                    className="card border-0 shadow-sm"
                    key={order.id}
                  >


                    {/* ORDER HEADER */}

                    <div className="card-header bg-white py-3">

                      <div className="row align-items-center g-3">


                        <div className="col-md-3">

                          <small className="text-secondary">

                            Order ID

                          </small>


                          <div className="fw-bold">

                            #{order.id}

                          </div>

                        </div>



                        <div className="col-md-4">

                          <small className="text-secondary">

                            Order Date

                          </small>


                          <div className="fw-semibold">

                            {new Date(
                              order.createdAt
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </div>

                        </div>



                        <div className="col-md-2">

                          <small className="text-secondary">

                            Status

                          </small>


                          <div className="mt-1">

                            <span className="badge text-bg-success">

                              {order.status}

                            </span>

                          </div>

                        </div>



                        <div className="col-md-3 text-md-end">

                          <small className="text-secondary">

                            Total Paid

                          </small>


                          <div className="fw-bold text-primary fs-5">

                            ₹{Number(
                              order.totalAmount
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </div>

                        </div>


                      </div>

                    </div>



                    {/* ORDER ITEMS */}

                    <div className="card-body">


                      <h6 className="fw-bold mb-3">

                        Products

                      </h6>


                      <div className="list-group list-group-flush">


                        {order.items.map(
                          (item) => (

                            <div
                              className="list-group-item px-0"
                              key={item.id}
                            >

                              <div className="row align-items-center g-3">


                                {/* PRODUCT NAME */}

                                <div className="col-md-5">

                                  <h6 className="mb-1 fw-semibold">

                                    {item.productName}

                                  </h6>


                                  <small className="text-secondary">

                                    Product ID:

                                    {" "}

                                    {item.productId}

                                  </small>

                                </div>



                                {/* UNIT PRICE */}

                                <div className="col-md-2">

                                  <small className="text-secondary">

                                    Price

                                  </small>


                                  <div>

                                    ₹{Number(
                                      item.unitPrice
                                    ).toLocaleString(
                                      "en-IN"
                                    )}

                                  </div>

                                </div>



                                {/* QUANTITY */}

                                <div className="col-md-2">

                                  <small className="text-secondary">

                                    Quantity

                                  </small>


                                  <div>

                                    {item.quantity}

                                  </div>

                                </div>



                                {/* SUBTOTAL */}

                                <div className="col-md-3 text-md-end">

                                  <small className="text-secondary">

                                    Subtotal

                                  </small>


                                  <div className="fw-bold">

                                    ₹{Number(
                                      item.subTotal
                                    ).toLocaleString(
                                      "en-IN"
                                    )}

                                  </div>

                                </div>


                              </div>

                            </div>

                          )
                        )}


                      </div>


                      {/* PAYMENT INFORMATION */}

                      <div className="alert alert-light border mt-4 mb-0">

                        <small className="text-secondary">

                          Payment ID

                        </small>


                        <div className="fw-semibold mt-1">

                          {order.razorpayPaymentId}

                        </div>

                      </div>


                    </div>


                  </div>

                )
              )}


            </div>

          </div>

        </div>

      )}


    </div>

  );
}


export default Orders;