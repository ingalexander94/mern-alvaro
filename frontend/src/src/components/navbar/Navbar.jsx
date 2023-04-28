import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "store/auth";

import "./navbar.css";

export const Navbar = () => {
  const dispath = useDispatch();
  const { isLoading, darkMode } = useSelector((state) => state.ui);

  const logout = () => {
    if (!isLoading) dispath(logoutUser());
  };

  return (
    <section className="navbar_wrapper">
      <nav>
        <input type="checkbox" id="show-menu" />
        <label
          htmlFor="show-menu"
          className={`menu-icon ${darkMode ? "dark_theme" : "light_theme"}`}
        >
          <i className="fas fa-bars fa-fw"></i>
        </label>
        <div
          className={`navbar_links ${darkMode ? "dark_theme" : "light_theme"}`}
        >
          <div className="logo">
            <Link to="/home">{"< Auth />"}</Link>
          </div>
          <ul className="links">
            <li>
              <Link to="/home">
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/" onClick={logout}>
                {" "}
                {!isLoading ? (
                  <i className="fas fa-sign-out-alt"></i>
                ) : (
                  <i className="fas fa-spinner fa-spin"></i>
                )}{" "}
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
};
