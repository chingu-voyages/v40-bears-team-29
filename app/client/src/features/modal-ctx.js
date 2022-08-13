import React, { createContext, useState } from "react";

export const ModalCtx = createContext({
  showModal: false,
  setShowModal: () => {},
  onSetShowModal: (which) => {},
  onCloseModal: () => {},
  showPostSpec: false,
  setShowPostSpec: () => {},
  showNewPost: false,
  setShowNewPost: () => {},
  showEditPost: false,
  setShowEditPost: () => {},
});

const ModalProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showPostSpec, setShowPostSpec] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);

  const onSetShowModal = (which) => {
    setShowModal(true);
    if (which === "specPost") {
      setShowNewPost(false);
      setShowEditPost(false);
      setShowPostSpec(true);
    }

    if (which === "newPost") {
      setShowEditPost(false);
      setShowPostSpec(false);
      setShowNewPost(true);
    }

    if (which === "editPost") {
      setShowNewPost(false);
      setShowPostSpec(false);
      setShowEditPost(true);
    }
  };

  const onCloseModal = () => {
    setShowModal(false);
    setShowNewPost(false);
    setShowPostSpec(false);
    setShowEditPost(false);
  };

  return (
    <ModalCtx.Provider
      value={{
        showModal,
        setShowModal,
        onSetShowModal,
        showPostSpec,
        setShowPostSpec,
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
