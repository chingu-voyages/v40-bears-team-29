import MainPostItem from "../MainPostItem/MainPostItem";
import React, { useEffect } from "react";
import axios from "axios";
import { postCtx } from "../../features/posts-ctx";
import { useContext } from "react";

const MainPostList = () => {
  const postMgr = useContext(postCtx);

  const fetchPosts = async () => {
    await axios
      .get("/api/posts")
      .then((serverRes) => {
        postMgr.setPosts(serverRes.data);
        console.log(serverRes.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="flex flex-col space-y-4 mx-auto px-2 max-w-screen-lg">
      {postMgr.posts.map((obj, index) => {
        return <MainPostItem obj={obj} key={`POST_${index}`} />;
      })}
    </main>
  );
};
export default MainPostList;
