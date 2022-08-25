import React from "react";

const NewPost = () => {
  return (
    <form>
      <h2>New Post</h2>
      <input type="text" placeholder="Title" />
      <textarea cols="30" rows="15" placeholder="Content" />
      <input type="file" />
      <input type="submit" value="Create" />
    </form>
  );
};

export default NewPost;
