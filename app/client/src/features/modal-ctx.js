import React, { createContext, useState } from "react";

export const ModalCtx = createContext({
  showModal: false,
  setShowModal: () => {},
  onSetShowModal: () => {},
  onCloseModal: () => {},
  showAccount: false,
  setShowAccount: () => {},
  showNewPost: false,
  setShowNewPost: () => {},
  showEditPost: false,
  setShowEditPost: () => {},
});

const ModalProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);

  const onSetShowModal = (which) => {
    setShowModal(true);
    if (which === "account") {
      setShowNewPost(false);
      setShowEditPost(false);
      setShowAccount(true);
    }

    if (which === "newPost") {
      setShowEditPost(false);
      setShowAccount(false);
      setShowNewPost(true);
    }

    if (which === "editPost") {
      console.log("This is to show edit");
      setShowNewPost(false);
      setShowAccount(false);
      setShowEditPost(true);
    }
  };

  const onCloseModal = () => {
    setShowModal(false);
    setShowNewPost(false);
    setShowAccount(false);
    setShowEditPost(false);
  };

  return (
    <ModalCtx.Provider
      value={{
        showModal,
        setShowModal,
        onSetShowModal,
        showAccount,
        setShowAccount,
        showNewPost,
        setShowNewPost,
        showEditPost,
        setShowEditPost,
        onCloseModal,
      }}
    >
      {props.children}
    </ModalCtx.Provider>
  );
};

export default ModalProvider;
