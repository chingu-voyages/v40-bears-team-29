import { Route, Routes, Navigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import PostsNew from "./pages/PostsNew";
import PostsSpec from "./pages/PostsSpec";
import Auth from "./pages/Auth";
import User from "./pages/User";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Modal from "./components/Modal/Modal";
import { AuthCtx } from "./features/auth-ctx";
import { ModalCtx } from "./features/modal-ctx";
import { urlTo } from "./helpers/application_helper";

// LOGOUT: Clear cookies
// 422: Extra feedback invalid credentials

function App() {
  // useEffect(() => {
  //   console.log(urlTo("/api/logged_user"));
  //   fetch(urlTo("/api/logged_user"))
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  // }, []);

  useEffect(() => {
    console.log(urlTo("/api/logged_user"));
    fetch(urlTo("/api/logged_user"))
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  const authMgr = useContext(AuthCtx);
  const modalMgr = useContext(ModalCtx);
  return (
    <>
      {modalMgr.showModal && <Modal />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<PostsNew />} />
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
}

export default App;
