import React, { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authMgr = useContext(AuthCtx);

  if (!authMgr.isLoggedIn) {
    return <Navigate to='/users/auth' replace />;
  }

  return children;
};

export default ProtectedRoute;
