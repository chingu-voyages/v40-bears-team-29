import PostSpecEdit from "../../pages/PostSpecEdit";
import Portal from "../Portal/Portal";
import React, { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";
import NewPost from "../../pages/NewPost";
import Account from "../../pages/Account";
const Modal = () => {
  const modalMgr = useContext(ModalCtx);

  if(modalMgr.showModal == true) {
    const body = document.body;
    body.style.overflow = "hidden";
  }

  return (
    <Portal>
      <button className="ml-auto block mb-4 bg-gray-500 hover:bg-gray-700 text-white transition-all py-1 px-2 rounded" onClick={modalMgr.onCloseModal}>Close</button>
      {modalMgr.showEditPost && <PostSpecEdit />}
      {modalMgr.showNewPost && <NewPost />}
      {modalMgr.showAccount && <Account />}
    </Portal>
  );
};

export default Modal;
