import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
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
            <NavLink to="login" className="nav-link">
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
