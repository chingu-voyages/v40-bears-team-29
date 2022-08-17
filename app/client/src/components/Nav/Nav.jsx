import classes from "./Nav.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { ModalCtx } from "../../features/modal-ctx";

const Nav = () => {
  const authMgr = useContext(AuthCtx);
  const modalMgr = useContext(ModalCtx);

  const logoutHandler = () => {
    // CLEAR ALL CURRENT STATES
    authMgr.onLogOut();
  };

  const showLoginHandler = () => {
    authMgr.onShowLogin();
  };
  const showSignUpHandler = () => {
    authMgr.setShowLogin(false);
  };

  const showNewPostHandler = () => {
    modalMgr.onSetShowModal("newPost");
  };

  const showAccountHandler = () => {
    modalMgr.onSetShowModal("account");
  };

  return (
    <nav className={classes.nav}>
      <Link className={classes.li} to="/">
        Posts
      </Link>
      {authMgr.isLoggedIn && (
        <>
          {" "}
          <p onClick={showNewPostHandler} className={classes.li}>
            New Post
          </p>
          <Link
            className={classes.li}
            to={`/users/${authMgr.currentUser.username}`}
          >
            Profile
          </Link>
          <p className={classes.li} onClick={showAccountHandler}>
            Account
          </p>{" "}
          <Link onClick={logoutHandler} className={classes.li} to="/">
            Logout
          </Link>{" "}
        </>
      )}
      {!authMgr.isLoggedIn && (
        <>
          <Link
            onClick={showLoginHandler}
            className={classes.li}
            to="/users/auth"
          >
            Login
          </Link>
          <Link
            onClick={showSignUpHandler}
            className={classes.li}
            to="/users/auth"
          >
            SignUp
          </Link>
        </>
      )}
    </nav>
  );
};
export default Nav;
