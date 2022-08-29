import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./features/auth-ctx";
import ModalProvider from "./features/modal-ctx";
import PostProvider from "./features/posts-ctx";
import FormProvider from "./features/form-ctx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <ModalProvider>
            <FormProvider>
              <App />
            </FormProvider>
          </ModalProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
