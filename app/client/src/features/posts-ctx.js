import React, { createContext, useState } from "react";

export const postCtx = createContext({
  posts: [
    // {
    //   User: {
    //     username: "",
    //     avatar: "",
    //   },
    //   Upvotes: [],
    //   title: "",
    //   content: "",
    //   upvotesCount: 0,
    //   id: 0,
    // },
  ],
  setPosts: () => {},
});

const PostProvider = (props) => {
  const [posts, setPosts] = useState([
    {
      User: {
        username: "",
        avatar: "",
      },
      Upvotes: [],
      title: "",
      content: "",
      upvotesCount: 0,
      id: 0,
    },
  ]);

  return (
    <React.Fragment>
      <postCtx.Provider
        value={{
          posts,
          setPosts,
        }}
      >
        {props.children}
      </postCtx.Provider>
    </React.Fragment>
  );
};

export default PostProvider;
