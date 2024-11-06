import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Movie from "./components/Movie";
import Customer from "./pages/Customer";
import Rentals from "./pages/Rentals";
import MovieDetails from "./pages/MovieDetails";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";

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
      {
        path: "movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
