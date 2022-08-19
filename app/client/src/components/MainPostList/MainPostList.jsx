import MainPostItem from "../MainPostItem/MainPostItem";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MainPostList = () => {
  const [posts, setPosts] = useState([{}, {}, {}, {}, {}, {}, {}]);

  const fetchPosts = async () => {
    await axios
      .get("/api/posts")
      .then((serverRes) => {
        setPosts(serverRes.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="flex flex-col space-y-4 mx-auto px-2 max-w-screen-lg">
      {posts.map((obj, index) => {
        return (
          <MainPostItem
            obj={obj}
            key={`POST_${index}`}
            setPost={setPosts}
            posts={posts}
          />
        );
      })}
    </main>
  );
};
export default MainPostList;
