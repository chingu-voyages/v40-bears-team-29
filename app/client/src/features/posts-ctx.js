import React, { createContext, useState } from "react";

export const postCtx = createContext({
  posts: [],
  setPosts: () => {},
});

const PostProvider = (props) => {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
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
          limit,
          setLimit,
          offset,
          setOffset,
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
