import {
    useEffect,
    useState,
} from "react";

import ProductCard from "../../components/productCard/ProductCard.jsx";

import {
    getAllProducts,
} from "../../service/ProductService.jsx";


function Products() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response =
          await getAllProducts();

        setProducts(response.data);

      } catch (error) {

        console.log(error)
        setError(
          "Unable to load products"
        );

      } finally {

        setLoading(false);

      }
    };


    fetchProducts();

  }, []);


  if (loading) {

    return (

      <div className="container py-5 text-center">

        <div
          className="spinner-border text-primary"
          role="status"
        >
        </div>

        <p className="text-secondary mt-3">
          Loading products...
        </p>

      </div>
    );
  }


  return (

    <div className="container py-5">


      <div className="text-center mb-5">

        <i className="bx bx-store display-5 text-primary"></i>

        <h2 className="fw-bold mt-2">
          Our Products
        </h2>

        <p className="text-secondary">
          Explore our latest products
        </p>

      </div>


      {error && (

        <div className="alert alert-danger">

          <i className="bx bx-error-circle me-2"></i>

          {error}

        </div>

      )}


      {!error && products.length === 0 && (

        <div className="alert alert-info text-center">

          <i className="bx bx-info-circle me-2"></i>

          No products available.

        </div>

      )}


      <div
        className="
          row
          row-cols-1
          row-cols-sm-2
          row-cols-lg-3
          row-cols-xl-4
          g-4
        "
      >

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>


    </div>
  );
}


export default Products;