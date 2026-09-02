import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">

          <i className="bx bx-shopping-bag display-1 text-primary"></i>

          <h1 className="fw-bold mt-3">
            Welcome to Amozone
          </h1>

          <p className="lead text-secondary">
            Your simple full-stack ecommerce application
          </p>

          <Link
            to="/register"
            className="btn btn-primary btn-lg mt-3"
          >
            <i className="bx bx-user-plus me-2"></i>
            Create Account
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Home;