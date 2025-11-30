import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main">
      <div className="navbar__container">
        {/* Brand Logo */}
        <Link to="/" id="navbar__logo" onClick={() => setOpen(false)}>
          Webquity
        </Link>

        {/* Mobile burger */}
        <button
          className="navbar__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <ul className={`navbar__menu ${open ? "navbar__menu--open" : ""}`}>
          {/* Home Link */}
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `navbar__links${isActive ? " active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
          </li>

          {/* Tasks Link */}
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `navbar__links${isActive ? " active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              Tasks
            </NavLink>
          </li>

          {/* Sign Up Button */}
          <li className="navbar__btn">
            <Link to="" className="button" onClick={() => setOpen(false)}>
              Sign Up
            </Link>
          </li>

          {/* Login Button */}
          <li className="navbar__btn">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `navbar__links${isActive ? " active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
