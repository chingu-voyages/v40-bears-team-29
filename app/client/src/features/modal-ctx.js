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
  selectedPost: {},
  setSelectedPost: () => {}
});

const ModalProvider = (props) => {
  // TODO: this need a refactor
  const [showModal, setShowModal] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

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
      setShowNewPost(false);
      setShowAccount(false);
      setShowEditPost(true);
    }
  };

  const onCloseModal = () => {
    const body = document.body;
    body.style.overflow = "auto";
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
        selectedPost,
        setSelectedPost
      }}
    >
      {props.children}
    </ModalCtx.Provider>
  );
};

export default ModalProvider;
