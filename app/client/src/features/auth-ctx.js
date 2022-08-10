import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  // FROM HERE
  onChangeRegisterInputInfo: (e) => {},
  resetRegister: () => {},
  showModal: false,
  setShowModal: () => {},
});

const AuthProvider = (props) => {
  const nav = useNavigate();
  // TEST
  const [showModal, setShowModal] = useState(false);
  // TEST END
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [loginInputInfo, setLoginInputInfo] = useState({
    username: "",
    password: "",
  });
  const [registerInputInfo, setRegisterInputInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onLogIn = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((serverRes) => {
        console.log(serverRes.data);
        setCurrentUser(serverRes.data);
        setIsLoggedIn(true);
        nav("/");
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
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((serverRes) => {
        console.log(serverRes.data);
        setCurrentUser(serverRes.data);
        setIsLoggedIn(true);
        nav("/");
      });
  };

  const onLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInputInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetLogin = () => {
    setLoginInputInfo({ username: "", password: "" });
  };

  const onChangeRegisterInputInfo = (e) => {
    const { name, value } = e.target;
    setRegisterInputInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetRegister = () => {
    setRegisterInputInfo({ username: "", email: "", password: "" });
  };

  console.log(isLoggedIn);

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
        // TEST
        showModal,
        setShowModal,

        // TEST END
      }}
    >
      {props.children}
    </AuthCtx.Provider>
  );
};

export default AuthProvider;
