import React, { Fragment } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../../context/auth.context";
import { useContext } from "react";

const Navbar = () => {
  const { isAuthenticated, setAuthenticated, favoriteContacts} = useContext(AuthContext);
  
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    setAuthenticated(false);
  }

  const handleFavorites = ()=>{
    favoriteContacts();
    console.log("Called")
  }

  if (isAuthenticated) {
    return (
      <>
        <nav className="navbar bg-dark">
          <h1>
            <Link to="/">
              <i className="fas fa-code"></i> ContactApp
            </Link>
          </h1>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
            </li>
            <li>
              <Link to="/favorites" onClick={handleFavorites}>Favorite </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> ContactApp
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
