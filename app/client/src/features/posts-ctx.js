import React, { createContext, useState } from "react";

export const postCtx = createContext({
  posts: [],
  setPosts: () => {},
  offset: 0,
  setOffset: () => {},
  limit: 10,
  setLimit: () => {},
  deletePost: () => {},
  loadMore: true,
  setLoadMore: () => {},
  resetPostList: () => {}
});

const PostProvider = (props) => {
  const resetPostList = () => {
    setPosts([]);
    setOffset(0);
    setLimit(10);
    setLoadMore(true);
  };

  const deletePost = (obj) => {
    // SEND API PATCH REQUEST
    // UPON 2xx RUN THIS FILTER
    // AND TRIGGER POST SETTING EFFECT
    // DEPENDENCY

    return setPosts((prev) =>
      prev.filter((objRet) => {
        return objRet.id !== obj.id;
      })
    );
  };

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
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
          deletePost,
          loadMore,
          setLoadMore,
          resetPostList
        }}
      >
        {props.children}
      </postCtx.Provider>
    </React.Fragment>
  );
};

export default PostProvider;
