import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const HomeLayout = () => {
  return (
    <div>
      <NavBar />
      <main className="container mt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
