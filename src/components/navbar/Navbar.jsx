import { useContext } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";


function Navbar() {

  const navigate = useNavigate();


  const {
    user,
    isAuthenticated,
    logout,
  } = useContext(AuthContext);


  const handleLogout = () => {

    logout();

    navigate("/");
  };


  return (

    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm">

      <div className="container">


        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to="/"
        >

          <i className="bx bx-shopping-bag fs-3 me-2"></i>

          Amozone

        </Link>


        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >

          <span className="navbar-toggler-icon"></span>

        </button>


        <div
          className="collapse navbar-collapse"
          id="mainNavbar"
        >


          <ul className="navbar-nav me-auto mb-2 mb-lg-0">


            <li className="nav-item">

              <Link
                className="nav-link"
                to="/"
              >

                <i className="bx bx-home-alt me-1"></i>

                Home

              </Link>

            </li>


          </ul>


          <div className="d-flex align-items-lg-center gap-2">


            {!isAuthenticated ? (

              <>

                <Link
                  to="/login"
                  className="btn btn-outline-light"
                >

                  <i className="bx bx-log-in me-1"></i>

                  Login

                </Link>


                <Link
                  to="/register"
                  className="btn btn-primary"
                >

                  <i className="bx bx-user-plus me-1"></i>

                  Register

                </Link>

              </>

            ) : (

              <>

                <span className="text-light me-lg-2">

                  <i className="bx bx-user-circle me-1"></i>

                  Hello, {user.username}

                </span>


                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >

                  <i className="bx bx-log-out me-1"></i>

                  Logout

                </button>

              </>

            )}


          </div>


        </div>

      </div>

    </nav>

  );
}


export default Navbar;