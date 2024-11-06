import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Movie from "./components/Movie";
import Customer from "./pages/Customer";
import Rentals from "./pages/Rentals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Movie />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "rentals",
        element: <Rentals />,
      },
    ],
  },
]);

export default router;
