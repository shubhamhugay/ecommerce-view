import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../service/AuthService";



function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const [message, setMessage] = useState("");

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

    setMessage("");
    setError("");
    setLoading(true);


    try {

      const response = await registerUser(formData);

      setMessage(response.data);

      setFormData({
        username: "",
        email: "",
        password: "",
      });

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
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

                <i className="bx bx-user-plus display-4 text-primary"></i>

                <h2 className="fw-bold mt-2">
                  Create Account
                </h2>

                <p className="text-secondary">
                  Register to start shopping
                </p>

              </div>


              {message && (
                <div className="alert alert-success">

                  <i className="bx bx-check-circle me-2"></i>

                  {message}

                </div>
              )}


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


                <div className="mb-3">

                  <label
                    htmlFor="email"
                    className="form-label"
                  >
                    Email
                  </label>


                  <div className="input-group">

                    <span className="input-group-text">
                      <i className="bx bx-envelope"></i>
                    </span>


                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={formData.email}
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
                      Registering...
                    </>
                  ) : (
                    <>
                      <i className="bx bx-user-plus me-2"></i>
                      Register
                    </>
                  )}

                </button>

              </form>


              <p className="text-center text-secondary mt-4 mb-0">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="text-decoration-none fw-semibold"
                >
                  Login
                </Link>

              </p>


            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


export default Register;