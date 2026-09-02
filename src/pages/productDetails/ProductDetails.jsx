import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useParams,
} from "react-router-dom";

import {
    getProductById,
} from "../../service/ProductService.jsx";



function ProductDetails() {

  const { id } = useParams();


  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response =
          await getProductById(id);

        setProduct(response.data);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Unable to load product"
        );

      } finally {

        setLoading(false);

      }
    };


    fetchProduct();

  }, [id]);


  if (loading) {

    return (

      <div className="container py-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        >
        </div>

        <p className="text-secondary mt-3">
          Loading product...
        </p>

      </div>
    );
  }


  if (error) {

    return (

      <div className="container py-5">

        <div className="alert alert-danger">

          <i className="bx bx-error-circle me-2"></i>

          {error}

        </div>


        <Link
          to="/products"
          className="btn btn-outline-primary"
        >

          <i className="bx bx-arrow-back me-2"></i>

          Back to Products

        </Link>

      </div>
    );
  }


  return (

    <div className="container py-5">


      <div className="mb-4">

        <Link
          to="/products"
          className="btn btn-outline-secondary"
        >

          <i className="bx bx-arrow-back me-2"></i>

          Back to Products

        </Link>

      </div>


      <div className="card border-0 shadow">

        <div className="card-body p-4">


          <div className="row g-5">


            <div className="col-lg-6">


              {product.imageUrls &&
              product.imageUrls.length > 0 ? (

                <div
                  id="productCarousel"
                  className="carousel slide"
                >

                  <div className="carousel-inner">


                    {product.imageUrls.map(
                      (imageUrl, index) => (

                        <div
                          key={index}
                          className={
                            index === 0
                              ? "carousel-item active"
                              : "carousel-item"
                          }
                        >

                          <img
                            src={imageUrl}
                            className="d-block w-100 object-fit-contain"
                            alt={`${product.name} ${index + 1}`}
                            height="450"
                          />

                        </div>

                      )
                    )}


                  </div>


                  {product.imageUrls.length > 1 && (

                    <>

                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#productCarousel"
                        data-bs-slide="prev"
                      >

                        <span className="carousel-control-prev-icon bg-dark rounded-circle p-3"></span>

                        <span className="visually-hidden">
                          Previous
                        </span>

                      </button>


                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#productCarousel"
                        data-bs-slide="next"
                      >

                        <span className="carousel-control-next-icon bg-dark rounded-circle p-3"></span>

                        <span className="visually-hidden">
                          Next
                        </span>

                      </button>

                    </>

                  )}


                </div>

              ) : (

                <div
                  className="
                    bg-light
                    d-flex
                    justify-content-center
                    align-items-center
                  "
                  style={{ height: "450px" }}
                >

                  <i className="bx bx-image display-1 text-secondary"></i>

                </div>

              )}


            </div>


            <div className="col-lg-6">


              <span className="badge text-bg-primary mb-3">

                Product #{product.id}

              </span>


              <h1 className="fw-bold">
                {product.name}
              </h1>


              <h2 className="text-primary fw-bold my-3">

                ₹{Number(product.price).toLocaleString("en-IN")}

              </h2>


              <p className="text-secondary fs-5">

                {product.description}

              </p>


              <hr />


              <div className="mb-4">

                <h6 className="fw-semibold">
                  Availability
                </h6>


                {product.stock > 0 ? (

                  <span className="badge text-bg-success fs-6">

                    <i className="bx bx-check-circle me-1"></i>

                    {product.stock} items in stock

                  </span>

                ) : (

                  <span className="badge text-bg-danger fs-6">

                    Out of Stock

                  </span>

                )}

              </div>


              <button
                className="btn btn-primary btn-lg w-100"
                disabled={product.stock === 0}
              >

                <i className="bx bx-cart-add me-2"></i>

                Add to Cart

              </button>


              <p className="text-secondary small mt-3 mb-0">

                <i className="bx bx-info-circle me-1"></i>

                Cart functionality will be connected in the next module.

              </p>


            </div>


          </div>


        </div>

      </div>


    </div>
  );
}


export default ProductDetails;