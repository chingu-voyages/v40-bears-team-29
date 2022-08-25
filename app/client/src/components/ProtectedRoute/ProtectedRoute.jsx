import React, { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authMgr = useContext(AuthCtx);

  return (
    <>
      {authMgr.isLoggedIn === 0 && (<></>)}
      {authMgr.isLoggedIn === false && (<Navigate to='/users/auth' replace />)}
      {authMgr.isLoggedIn === true && (children)}
    </>
  );
};

export default ProtectedRoute;
