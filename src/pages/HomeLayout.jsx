import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeLayout = () => {
  return (
    <div>
      <NavBar />
      <ToastContainer />
      <main className="container mt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
