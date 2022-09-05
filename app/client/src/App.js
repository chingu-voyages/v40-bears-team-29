import { Route, Routes, Navigate } from "react-router-dom";
import React, { useContext, useEffect} from "react";
import Home from "./pages/Home";
import PostsSpec from "./pages/PostsSpec";
import Auth from "./pages/Auth";
import User from "./pages/User";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Modal from "./components/Modal/Modal";
import { ModalCtx } from "./features/modal-ctx";
import axios from "axios";
import { AuthCtx } from "./features/auth-ctx";

// LOGOUT: Clear cookies
const App = () => {
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


  const modalMgr = useContext(ModalCtx);
  return (
    <>
      {modalMgr.showModal && <Modal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostsSpec />} />
        <Route path="/users/auth" element={<Auth />} />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
