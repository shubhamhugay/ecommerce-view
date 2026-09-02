import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Products from "../pages/products/Products";
import Register from "../pages/register/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "register",
        element: <Register  />,
      },
      {
        path: "login",
        element: <Login  />,
      },{
        path: "products",
        element: <Products />,
      },

      {
        path: "products/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);

export default router;