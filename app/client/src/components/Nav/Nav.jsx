import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { ModalCtx } from "../../features/modal-ctx";
import axios from "axios";

const Nav = () => {
  const authMgr = useContext(AuthCtx);
  const modalMgr = useContext(ModalCtx);

  const logoutHandler = async () => {
    await axios
      .post("/api/logout", {}, {withCredentials: true})
      .then(() => {
        authMgr.onLogOut();
      })
      .catch((err) => console.log(err));
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

  const guestNavItems = [
    {
      content: "Login",
      to: "/users/auth",
      onClick: showLoginHandler,
      classes: "hover:bg-blue-700 hover:text-white",
    },
    {
      content: "Register",
      to: "/users/auth",
      onClick: showSignUpHandler,
      classes: "bg-blue-500 hover:bg-blue-700 text-white"
    }
  ];

  const userNavItems = [
    {
      content: "New Post",
      to: false,
      onClick: showNewPostHandler,
      classes: "bg-blue-500 hover:bg-blue-700 text-white"
    },
    {
      content: "Profile",
      to: `/users/${authMgr.currentUser.username}`,
      onClick: false,
      classes: ""
    },
    {
      content: "Account",
      to: false,
      onClick: showAccountHandler,
      classes: ""
    },
    {
      content: "Logout",
      to: false,
      onClick: logoutHandler,
      classes: ""
    }
  ];

  const navItems = [
    {
      content: "Posts",
      to: "/",
      onClick: false,
      classes: ""
    },
    ...(authMgr.isLoggedIn ? userNavItems : guestNavItems)
  ];
  
  return (
    <nav className="-ml-2 md:ml-0">
      <ul className="flex flex-row items-center font-medium text-sm space-x-1">
        { navItems.map((navItem, index) => <li key={ index } className={ `${navItem.classes} transition-all py-1 px-2 rounded` }>
          <Link to={ navItem.to } onClick={ navItem.onClick }>
            { navItem.content }
          </Link>
        </li>) }
      </ul>
    </nav>
  );
};

export default Nav;
