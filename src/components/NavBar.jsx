import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../pages/HomeLayout";

const NavBar = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink to="/" className="nav-link">
              Movies
            </NavLink>
            <NavLink to="customer" className="nav-link">
              Customer
            </NavLink>
            <NavLink to="rentals" className="nav-link">
              Rentals
            </NavLink>
            {!currentUser && (
              <>
                <NavLink to="login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="register" className="nav-link">
                  Register
                </NavLink>
              </>
            )}
            {currentUser && (
              <>
                <NavLink to="profile" className="nav-link">
                  {currentUser}
                </NavLink>
                <NavLink to="logout" className="nav-link">
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
