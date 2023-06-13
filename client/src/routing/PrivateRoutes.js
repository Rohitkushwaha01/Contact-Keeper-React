import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../components/layout/Spinner";
import AuthContext from "../context/auth.context";
import { useContext } from "react";

const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated, isloading } = useContext(AuthContext);

  if (isloading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

export default PrivateRoute;
