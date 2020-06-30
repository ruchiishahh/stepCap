import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h3>Navbar</h3>
      <ul className="nav-links">
        <Link to="/search">
          <li>Search</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
