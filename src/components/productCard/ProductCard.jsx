import { Link } from "react-router-dom";


function ProductCard({ product }) {

  const firstImage =
    product.imageUrls &&
    product.imageUrls.length > 0
      ? product.imageUrls[0]
      : null;


  return (
    <div className="col">

      <div className="card h-100 border-0 shadow-sm">


        {firstImage ? (

          <img
            src={firstImage}
            className="card-img-top object-fit-contain p-3"
            alt={product.name}
            height="250"
          />

        ) : (

          <div
            className="d-flex justify-content-center align-items-center bg-light"
            style={{ height: "250px" }}
          >

            <i className="bx bx-image fs-1 text-secondary"></i>

          </div>

        )}


        <div className="card-body d-flex flex-column">


          <h5 className="card-title fw-semibold">
            {product.name}
          </h5>


          <p className="card-text text-secondary">

            {product.description?.length > 80
              ? product.description.substring(0, 80) + "..."
              : product.description}

          </p>


          <h5 className="text-primary fw-bold mt-auto">

            ₹{Number(product.price).toLocaleString("en-IN")}

          </h5>


          <div className="mb-3">

            {product.stock > 0 ? (

              <span className="badge text-bg-success">

                <i className="bx bx-check-circle me-1"></i>

                In Stock ({product.stock})

              </span>

            ) : (

              <span className="badge text-bg-danger">

                Out of Stock

              </span>

            )}

          </div>


          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-primary w-100"
          >

            <i className="bx bx-show me-2"></i>

            View Details

          </Link>


        </div>

      </div>

    </div>
  );
}


export default ProductCard;