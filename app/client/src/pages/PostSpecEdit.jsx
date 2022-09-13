import React, { useContext } from "react";
import { ModalCtx } from "../features/modal-ctx";
import PostForm from "../components/PostForm/PostForm.jsx";

const PostSpecEdit = () => {
  const modalMgr = useContext(ModalCtx);
  const formPost = modalMgr.selectedPost;

  return (
    <>
      <div className="flex flex-col space-y-4 mx-auto px-2 max-w-screen-lg">
        <PostForm formPost={formPost}/>
      </div>
    </>
  );
};

export default PostSpecEdit;
