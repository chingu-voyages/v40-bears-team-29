import { AuthCtx } from "../features/auth-ctx";
import React, { useContext } from "react";

const Account = () => {
  const authMgr = useContext(AuthCtx);
  console.log(authMgr.currentUser);
  return (
    <React.Fragment>
      <h2>{authMgr.currentUser.username}</h2>
      <p>Account page</p>
    </React.Fragment>
  );
};

export default Account;
