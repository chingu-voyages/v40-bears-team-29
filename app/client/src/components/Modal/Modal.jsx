import PostSpecEdit from "../../pages/PostSpecEdit";
import Header from "../Header/Header";
import Portal from "../Portal/Portal";
import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";

const Modal = () => {
  const authMgr = useContext(AuthCtx);

  const closeModalHandler = () => authMgr.setShowModal(false);

  return (
    <Portal>
      <PostSpecEdit />
      <button onClick={closeModalHandler}>Close</button>
    </Portal>
  );
};
// voluble-bunny-990d6d

export default Modal;
