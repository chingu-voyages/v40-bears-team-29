import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import PostsNew from "./pages/PostsNew";
import PostsSpec from "./pages/PostsSpec";
import PostSpecEdit from "./pages/PostSpecEdit";
import Auth from "./pages/Auth";
import User from "./pages/User";
import UserEdit from "./pages/UserEdit";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Modal from "./components/Modal/Modal";
import { AuthCtx } from "./features/auth-ctx";

import { urlTo } from "./helpers/application_helper";

function App() {
  // useEffect(() => {
  //   console.log(urlTo("/api/logged_user"));
  //   fetch(urlTo("/api/logged_user"))
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  // }, []);

  const authMgr = useContext(AuthCtx);

  return (
    <>
      {authMgr.showModal && <Modal />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/new" element={<PostsNew />} />
        <Route path="/posts/:id" element={<PostsSpec />} />
        {/* <Route
          path="/posts/:id/edit"
          element={
            <ProtectedRoute>
              <PostSpecEdit />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/users/auth" element={<Auth />} />
        <Route path="/users/:id" element={<User />} />
        {/* <Route
          path="/users/:id/edit"
          element={
            <ProtectedRoute>
              <UserEdit />
            </ProtectedRoute>
          }
        /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
