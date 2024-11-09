import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Movie from "./components/Movie";
import Customer from "./pages/Customer";
import Rentals from "./pages/Rentals";
import MovieDetails from "./pages/MovieDetails";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SaveMoviePage from "./pages/SaveMoviePage";
import Logout from "./components/Logout";
import AuthRequired from "./components/AuthRequired";

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
        element: <AuthRequired />,
        children: [
          {
            path: "movie/:id",
            element: <MovieDetails />,
          },
          {
            path: "movie/new",
            element: <SaveMoviePage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "not-found",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
