import { AuthCtx } from "../features/auth-ctx";
import React, { useContext } from "react";

const Account = () => {
  const authMgr = useContext(AuthCtx);
  console.log(authMgr.currentUser);
  return (
    <React.Fragment>
      <h2>{authMgr.currentUser.username}</h2>
      <p>Account page</p>
      <form>
        <img src={authMgr.currentUser.avatar} />
        <input type="file" />
        <p>
          Biography:{" "}
          <input
            placeholder="Edit biography"
            type="text"
            value={authMgr.currentUser.biography}
          />
        </p>
        <p>
          Password: <input type="password" placeholder="Type old password" />
        </p>
        <p>
          New Password:{" "}
          <input type="password" placeholder="Type new password" />
        </p>
        <p>
          Confirm new Password:{" "}
          <input type="password" placeholder="Type new password" />
        </p>
        <input value="Save changes" type="submit" />
      </form>
    </React.Fragment>
  );
};

export default Account;
