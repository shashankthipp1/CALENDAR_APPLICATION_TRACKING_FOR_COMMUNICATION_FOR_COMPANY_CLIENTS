// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <h1>Admin Panel</h1>
    <nav>
      <Link to="/companies">Companies</Link> | <Link to="/add-company">Add Company</Link>
    </nav>
  </header>
);

export default Header;
