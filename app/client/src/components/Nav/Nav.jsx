import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";

const Nav = () => {
  const authMgr = useContext(AuthCtx);

  const logoutHandler = () => {
    // CLEAR ALL CURRENT STATES
    authMgr.onLogOut();
  };

  const showLoginHandler = () => {
    // CHANGE STATE SO AUTH SHOWS LOGIN
    console.log("Showing login");
    authMgr.onShowLogin();
  };
  const showSignUpHandler = () => {
    // CHANGE STATE SO AUTH SHOWS SIGNUP
    authMgr.setShowLogin(false);
    console.log("Showing Sign up");
  };

  const guestNavItems = [
    {
      content: 'Login',
      to: '/users/auth',
      onClick: showLoginHandler,
      classes: 'hover:bg-blue-700 hover:text-white',
    },
    {
      content: 'Register',
      to: '/users/auth',
      onClick: showSignUpHandler,
      classes: 'bg-blue-500 hover:bg-blue-700 text-white'
    }
  ];

  const userNavItems = [
    {
      content: 'New Post',
      to: '/',
      onClick: false,
      classes: ''
    },
    {
      content: 'Profile',
      to: `/users/${authMgr.currentUser.username}`,
      onClick: false,
      classes: ''
    },
    {
      content: 'Account',
      to: false,
      onClick: logoutHandler,
      classes: ''
    }
  ];

  const navItems = [
    {
      content: 'Posts',
      to: '/',
      onClick: false,
      classes: ''
    },
    ...(authMgr.isLoggedIn ? userNavItems : guestNavItems)
  ];
  

  return (
    <nav>
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
