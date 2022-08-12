import classes from "./Signup.module.css";
import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";

const Signup = () => {
  const authMgr = useContext(AuthCtx);

  const signUpHandler = (e) => {
    e.preventDefault();
    console.log(authMgr.registerInputInfo);
    // ASSUMING 2xx
    authMgr.onRegister();
    authMgr.resetRegister();
  };

  return (
    <article className={classes.article}>
      <div className={classes.card}>
        <form className={classes.form}>
          <div className={classes.card_header}>
            <h1 className={classes.form_heading}>Sign up</h1>
          </div>
          <div className={classes.field}>
            <label className={classes.label} htmlFor="username">
              Username
            </label>
            <input
              onChange={(e) => authMgr.onChangeRegisterInputInfo(e)}
              value={authMgr.registerInputInfo.username}
              className={classes.input}
              name="username"
              type="text"
              placeholder="Username"
              id="username"
            />
          </div>
          {/* <div className={classes.field}>
            <label className={classes.label} htmlFor='email'>
              Email
            </label>
            <input
              value={authMgr.registerInputInfo.email}
              onChange={(e) => authMgr.onChangeRegisterInputInfo(e)}
              className={classes.input}
              name='email'
              type='email'
              placeholder='Email'
              id='email'
            />
          </div> */}
          <div className={classes.field}>
            <label className={classes.label} htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => authMgr.onChangeRegisterInputInfo(e)}
              value={authMgr.registerInputInfo.password}
              className={classes.input}
              name="password"
              type="password"
              placeholder="Password"
              id="password"
            />
          </div>
          <div className={classes.field}>
            <button onClick={signUpHandler} className={classes.button}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default Signup;
