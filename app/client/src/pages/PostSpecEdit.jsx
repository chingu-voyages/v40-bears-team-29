import React, { useContext } from "react";
import { ModalCtx } from "../features/modal-ctx";
import PostForm from "../components/PostForm/PostForm.jsx";

const PostSpecEdit = () => {
  const modalMgr = useContext(ModalCtx);
  const formPost = modalMgr.selectedPost;

  return (
    <>
      <PostForm formPost={formPost}/>
    </>
  );
};

export default PostSpecEdit;
