import classes from './Login.module.css'
import { useContext } from 'react'
import { AuthCtx } from '../../features/auth-ctx'

const Login = () => {
  const authMgr = useContext(AuthCtx)

  const loginHandler = (e) => {
    e.preventDefault()
    authMgr.onLogIn()
    console.log(authMgr.loginInputInfo)
    authMgr.resetLogin()
  }

  return (
    <article className={classes.article}>
      <div className={classes.card}>
        <form className={classes.form}>
          <div className={classes.card_header}>
            <h1 className={classes.form_heading}>Log in</h1>
          </div>
          <div className={classes.field}>
            <label className={classes.label} htmlFor='username'>
              Username
            </label>
            <input
              value={authMgr.loginInputInfo.username}
              onChange={(e) => authMgr.onLoginInputChange(e)}
              className={classes.input}
              name='username'
              type='text'
              placeholder='Username'
              id='username'
            />
          </div>
          <div className={classes.field}>
            <label className={classes.label} htmlFor='password'>
              Password
            </label>
            <input
              onChange={(e) => authMgr.onLoginInputChange(e)}
              value={authMgr.loginInputInfo.password}
              className={classes.input}
              name='password'
              type='password'
              placeholder='Password'
              id='password'
            />
          </div>
          <div className={classes.field}>
            <button onClick={loginHandler} className={classes.button}>
              Login
            </button>
          </div>
        </form>
      </div>
    </article>
  )
}

export default Login
