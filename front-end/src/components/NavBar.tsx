import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main">
      <div className="navbar__container">
        {/* Keep a brand; it will sit at the far right along with the links due to flex-end */}
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
          <li>
            <NavLink
              to="/chatbot"
              className={({ isActive }) =>
                `navbar__links${isActive ? " active" : ""}`
              }
              onClick={() => setOpen(false)}
            >
              ChatBot
            </NavLink>
          </li>
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
          <li className="navbar__btn">
            <Link to="/" className="button" onClick={() => setOpen(false)}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
