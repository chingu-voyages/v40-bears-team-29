import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthCtx = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  loginUser: () => {},
  onLogIn: () => {},
  currentUser: {},
  setCurrentUser: () => {},
  onLogOut: () => {},
  showLogin: false,
  setShowLogin: () => {},
  onShowLogin: () => {},
  onRegister: () => {},
  loginInputInfo: {},
  setLoginInputInfo: {},
  onLoginInputChange: () => {},
  resetLogin: () => {},
  registerInputInfo: {},
  setRegisterInputInfo: () => {},
  onChangeRegisterInputInfo: () => {},
  resetRegister: () => {},
  showFeedback: false,
  setShowFeedback: () => {},
  errorMsg: "",
  setErrorMsg: () => {},
  onShowFeedback: () => {},
});

const AuthProvider = (props) => {
  const nav = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [loginInputInfo, setLoginInputInfo] = useState({
    username: "",
    password: "",
  });
  const [registerInputInfo, setRegisterInputInfo] = useState({
    username: "",
    password: "",
  });

  const onShowFeedback = (bool, message) => {
    setShowFeedback(bool);
    setErrorMsg(message);
  };

  const loginUser = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const onLogIn = async () => {
    await axios
      .post("/api/login", loginInputInfo, { withCredentials: true })
      .then((serverRes) => {
        loginUser(serverRes.data);
        nav("/");
      })
      .catch((err) => {
        err.response.status === 401 &&
          onShowFeedback(true, [{ message: "Invalid credentials" }]);
        err.response.status === 500 &&
          onShowFeedback(true, [{ message: "Oops, something when wrong" }]);
        err.response.status === 404 &&
          onShowFeedback(true, [{ message: "User not registered" }]);
        err.response.status === 422 &&
          onShowFeedback(true, [
            ...err.response.data.errors.username,
            ...err.response.data.errors.password,
          ]);
      });
  };

  const onLogOut = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
    nav("/");
    // CLEAR COOKIES
  };

  const onShowLogin = () => {
    setShowLogin(true);
  };

  const onRegister = async () => {
    await axios
      .post("/api/sign_up", registerInputInfo, { withCredentials: true })
      .then((serverRes) => {
        loginUser(serverRes.data);
        nav("/");
      })
      .catch((err) => {
        err.response.status === 500 &&
          onShowFeedback(true, [{ message: "Oops, something when wrong" }]);
        err.response.status === 409 &&
          onShowFeedback(true, [{ message: "User already registered" }]);
        err.response.status === 422 &&
          onShowFeedback(true, [
            ...err.response.data.errors.username,
            ...err.response.data.errors.password,
          ]);
      });
  };

  const onLoginInputChange = (e) => {
    const { name, value } = e.target;
    setShowFeedback(false);
    return setLoginInputInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetLogin = () => {
    setLoginInputInfo({ username: "", password: "" });
  };

  const onChangeRegisterInputInfo = (e) => {
    setShowFeedback(false);

    const { name, value } = e.target;
    return setRegisterInputInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetRegister = () => {
    setRegisterInputInfo({ username: "", email: "", password: "" });
  };

  return (
    <AuthCtx.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        loginUser,
        onLogIn,
        onLogOut,
        showLogin,
        setShowLogin,
        onShowLogin,
        onRegister,
        loginInputInfo,
        setLoginInputInfo,
        onLoginInputChange,
        resetLogin,
        registerInputInfo,
        setRegisterInputInfo,
        resetRegister,
        onChangeRegisterInputInfo,

        showFeedback,
        setShowFeedback,
        onShowFeedback,
        errorMsg,
        setErrorMsg,
      }}
    >
      {props.children}
    </AuthCtx.Provider>
  );
};

export default AuthProvider;
