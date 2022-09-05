import React from "react";
import PostForm from "../components/PostForm/PostForm.jsx";

const NewPost = () => {
  return (
    <>
      <div className="flex flex-col space-y-4 mx-auto px-2 max-w-screen-lg">
        <PostForm formPost={null}/>
      </div>
    </>
  );
};

export default NewPost;
