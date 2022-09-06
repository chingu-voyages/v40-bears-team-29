import axios from "axios";
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
  resetPostList: () => {},
});

const PostProvider = (props) => {
  const resetPostList = () => {
    setPosts([]);
    setOffset(0);
    setLimit(10);
    setLoadMore(true);
  };

  const deletePost = async (obj) => {
    await axios
      .delete(`/api/posts/${obj.id}`, { withCredentials: true })
      .then((serverRes) => {
        console.log(serverRes);
        return setPosts((prev) =>
          prev.filter((objRet) => {
            return objRet.id !== obj.id;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
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
          resetPostList,
        }}
      >
        {props.children}
      </postCtx.Provider>
    </React.Fragment>
  );
};

export default PostProvider;
