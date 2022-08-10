import classes from './Nav.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthCtx } from '../../features/auth-ctx'

const Nav = () => {
  const authMgr = useContext(AuthCtx)

  const logoutHandler = () => {
    // CLEAR ALL CURRENT STATES
    authMgr.onLogOut()
  }

  const showLoginHandler = () => {
    // CHANGE STATE SO AUTH SHOWS LOGIN
    console.log('Showing login')
    authMgr.onShowLogin()
  }
  const showSignUpHandler = () => {
    // CHANGE STATE SO AUTH SHOWS SIGNUP
    authMgr.setShowLogin(false)
    console.log('Showing Sign up')
  }

  return (
    <nav className={classes.nav}>
      <Link className={classes.li} to='/'>
        Posts
      </Link>
      {authMgr.isLoggedIn && (
        <>
          {' '}
          <Link
            className={classes.li}
            to={`/users/${authMgr.currentUser.username}`}
          >
            Profile
          </Link>
          <Link className={classes.li} to='/'>
            Account
            {/* CREATE ACCOUNT COMPONENT */}
          </Link>{' '}
          <Link onClick={logoutHandler} className={classes.li} to='/'>
            Logout
          </Link>{' '}
        </>
      )}
      {!authMgr.isLoggedIn && (
        <>
          <Link
            onClick={showLoginHandler}
            className={classes.li}
            to='/users/auth'
          >
            Login
          </Link>
          <Link
            onClick={showSignUpHandler}
            className={classes.li}
            to='/users/auth'
          >
            SignUp
          </Link>
        </>
      )}
    </nav>
  )
}
export default Nav
