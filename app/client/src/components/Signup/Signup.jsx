import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import Feedback from "../Feedback/Feedback";

const Signup = () => {
  const authMgr = useContext(AuthCtx);

  const signUpHandler = (e) => {
    e.preventDefault();
    authMgr.onRegister();
    authMgr.resetRegister();
  };

  return (
    <div className='flex mx-auto max-w-md mt-4 bg-white dark:bg-slate-800 border border-gray-300 dark:border-none shadow p-4 rounded-lg'>
      <form className='flex flex-col space-y-2 w-full'>
        <h1 className='text-xl font-bold'>Sign up</h1>
        <div className="flex flex-col">
            <label htmlFor="username">
              Username
            </label>
            <input
              onChange={(e) => authMgr.onChangeRegisterInputInfo(e)}
              value={authMgr.registerInputInfo.username}
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
              onChange={(e) => authMgr.onChangeRegisterInputInfo(e)}
              value={authMgr.registerInputInfo.password}
              className='rounded border-gray-300 dark:border-none dark:text-gray-800'
              name="password"
              type="password"
              placeholder="Password"
              id="password"
            />
          </div>
          <button onClick={signUpHandler} className='bg-blue-500 hover:bg-blue-700 text-white transition-all py-1 px-2 rounded'>
            Sign Up
          </button>
          <Feedback bool={authMgr.showFeedback} message={authMgr.errorMsg} />
      </form>
    </div>
  );
};

export default Signup;
