import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { urlTo } from "../helpers/application_helper";

export const AuthCtx = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
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
  onLoginInputChange: (e) => {},
  resetLogin: () => {},
  registerInputInfo: {},
  setRegisterInputInfo: () => {},
  onChangeRegisterInputInfo: (e) => {},
  resetRegister: () => {},
  showModal: false,
  setShowModal: () => {},
  // FROM HERE
  showFeedback: false,
  setShowFeedback: () => {},
  errorMsg: "",
  setErrorMsg: () => {},
  onShowFeedback: (bool, message) => {},
});

const AuthProvider = (props) => {
  const nav = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  const onLogIn = async () => {
    await axios
      .post(urlTo("/api/login"), loginInputInfo)
      .then((serverRes) => {
        console.log(serverRes.data);
        setCurrentUser(serverRes.data);
        setIsLoggedIn(true);
        nav("/");
      })
      .catch((err) => {
        err.response.status === 401 &&
          onShowFeedback(true, "Invalid credentials");
        err.response.status === 500 &&
          onShowFeedback(true, "Oops, something when wrong");
        err.response.status === 400 &&
          onShowFeedback(true, "All fields are required");
        err.response.status === 404 &&
          onShowFeedback(true, "User not registered");
      });
  };

  const onLogOut = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
    nav("/");
  };

  const onShowLogin = () => {
    setShowLogin(true);
  };

  const onRegister = async () => {
    await axios
      .post(urlTo("/api/sign_up"), registerInputInfo)
      .then((serverRes) => {
        console.log(serverRes.data);
        setCurrentUser(serverRes.data);
        setIsLoggedIn(true);
        nav("/");
      })
      .catch((err) => {
        err.response.status === 500 &&
          onShowFeedback(true, "Oops, something when wrong");
        err.response.status === 400 &&
          onShowFeedback(true, "All fields are required");
        err.response.status === 409 &&
          onShowFeedback(true, "User already registered");
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

  console.log(registerInputInfo);

  return (
    <AuthCtx.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
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
        showModal,
        setShowModal,
        showFeedback,
        setShowFeedback,
        onShowFeedback,
        errorMsg,
        setErrorMsg,
        onShowFeedback,
      }}
    >
      {props.children}
    </AuthCtx.Provider>
  );
};

export default AuthProvider;
