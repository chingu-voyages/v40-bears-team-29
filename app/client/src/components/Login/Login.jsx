import React, { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import Feedback from "../Feedback/Feedback";

const Login = () => {
  const authMgr = useContext(AuthCtx);

  const loginHandler = (e) => {
    e.preventDefault();
    authMgr.onLogIn();
    authMgr.resetLogin();
  };

  return (
    <div className='flex mx-auto max-w-md mt-4 bg-white dark:bg-slate-800 border border-gray-300 dark:border-none shadow p-4 rounded-lg'>
      <form className='flex flex-col space-y-2 w-full'>
        <h1 className='text-xl font-bold'>Log in</h1>
        <div className="flex flex-col">
          <label htmlFor="username">
              Username
          </label>
          <input
            value={authMgr.loginInputInfo.username}
            onChange={(e) => authMgr.onLoginInputChange(e)}
            className='rounded border-gray-300 dark:border-none dark:text-gray-800'
            name="username"
            type="text"
            placeholder="Username"
            id="username"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
              Password
          </label>
          <input
            onChange={(e) => authMgr.onLoginInputChange(e)}
            value={authMgr.loginInputInfo.password}
            className='rounded border-gray-300 dark:border-none dark:text-gray-800'
            name="password"
            type="password"
            placeholder="Password"
            id="password"
          />
        </div>
        <button onClick={loginHandler} className='bg-blue-500 hover:bg-blue-700 text-white transition-all py-1 px-2 rounded'>
            Login
        </button>
        <Feedback bool={authMgr.showFeedback} message={authMgr.errorMsg} type={authMgr.msgType ?? "danger"} />
      </form>
    </div>
  );
};

export default Login;
