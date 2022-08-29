import React, { useEffect, useContext} from "react";
import Header from "../components/Header/Header";
import MainPostList from "../components/MainPostList/MainPostList";
import Search from "../components/Search/Search";
import axios from "axios";
import { AuthCtx } from "../features/auth-ctx";

const Home = () => {
  const authMgr = useContext(AuthCtx);

  const fetchLoggedUser = async () => {
    await axios
      .get("/api/logged_user", { withCredentials: true })
      .then((serverRes) => {
        authMgr.loginUser(serverRes.data);
      })
      .catch((err) => {
        if (err.response.status == 401) {
          authMgr.setIsLoggedIn(false);
          console.log("not logged");
        } else {
          console.error(err);
        }
      });
  };

  useEffect(() => {
    fetchLoggedUser();
  }, []);

  return (
    <div>
      <Header />
      <Search />
      <MainPostList />
    </div>
  );
};

export default Home;
