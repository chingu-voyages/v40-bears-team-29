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
    password: "",
  });

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
        console.log(err.response.data);
        // SET FEEDBACK HERE
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
        console.log(err.response.data);
        // SET FEEDBACK HERE
      });
  };

  const onLoginInputChange = (e) => {
    const { name, value } = e.target;
    return setLoginInputInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetLogin = () => {
    setLoginInputInfo({ username: "", password: "" });
  };

  const onChangeRegisterInputInfo = (e) => {
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
