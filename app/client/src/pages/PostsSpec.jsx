import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
const PostSpec = () => {
  const urlId = useParams().id;
  // CREATE NEW CONTEXT FOR POSTS

  return (
    <>
      <Header />
      <h1>This is Spec Post</h1>
      <p>{urlId}</p>
      {/* PROBABLY POST ID INSTEAD */}
    </>
  );
};

export default PostSpec;
