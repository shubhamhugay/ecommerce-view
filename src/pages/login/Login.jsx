import {
  useContext,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";


import {
  getCurrentUser,
  loginUser,
} from "../../service/AuthService";

import { AuthContext } from "../../context/AuthContext";


function Login() {

  const navigate = useNavigate();


  const { setUser } =
    useContext(AuthContext);


  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setLoading(true);


    try {

      // 1. Send username and password
      const loginResponse =
        await loginUser(formData);


      // 2. Get JWT
      const token =
        loginResponse.data;


      // 3. Save JWT in browser
      localStorage.setItem(
        "authToken",
        token
      );


      // 4. Get current logged-in user
      const userResponse =
        await getCurrentUser(token);


      // 5. Store user in AuthContext
      setUser(userResponse.data);


      // 6. Redirect to home
      navigate("/");


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Invalid username or password"
      );


    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-8 col-lg-5">


          <div className="card border-0 shadow">

            <div className="card-body p-4 p-md-5">


              <div className="text-center mb-4">

                <i className="bx bx-log-in-circle display-4 text-primary"></i>

                <h2 className="fw-bold mt-2">
                  Welcome Back
                </h2>

                <p className="text-secondary">
                  Login to continue shopping
                </p>

              </div>


              {error && (

                <div className="alert alert-danger">

                  <i className="bx bx-error-circle me-2"></i>

                  {error}

                </div>

              )}


              <form onSubmit={handleSubmit}>


                <div className="mb-3">

                  <label
                    htmlFor="username"
                    className="form-label"
                  >
                    Username
                  </label>


                  <div className="input-group">

                    <span className="input-group-text">

                      <i className="bx bx-user"></i>

                    </span>


                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                <div className="mb-4">

                  <label
                    htmlFor="password"
                    className="form-label"
                  >
                    Password
                  </label>


                  <div className="input-group">

                    <span className="input-group-text">

                      <i className="bx bx-lock-alt"></i>

                    </span>


                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >

                  {loading ? (

                    <>

                      <span className="spinner-border spinner-border-sm me-2"></span>

                      Logging in...

                    </>

                  ) : (

                    <>

                      <i className="bx bx-log-in me-2"></i>

                      Login

                    </>

                  )}

                </button>

              </form>


              <p className="text-center text-secondary mt-4 mb-0">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="text-decoration-none fw-semibold"
                >

                  Register

                </Link>

              </p>


            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


export default Login;