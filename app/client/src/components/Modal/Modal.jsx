import PostSpecEdit from "../../pages/PostSpecEdit";
import Portal from "../Portal/Portal";
import { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";
import NewPost from "../../pages/NewPost";
import Account from "../../pages/Account";
const Modal = () => {
  const modalMgr = useContext(ModalCtx);

  return (
    <Portal>
      {modalMgr.showEditPost && <PostSpecEdit />}
      {modalMgr.showNewPost && <NewPost />}
      {modalMgr.showAccount && <Account />}

      <button onClick={modalMgr.onCloseModal}>Close</button>
    </Portal>
  );
};

export default Modal;
