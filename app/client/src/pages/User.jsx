import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MainPostList from "../components/MainPostList/MainPostList";

const User = () => {
  const urlId = useParams().id;
  const [userProfile, setUserProfile] = useState({
    avatar: "",
    username: "",
    Posts: [],
    biography: "",
  });

  const fetchUser = async () => {
    await axios
      .get(`/api/users/${urlId}`, {withCredentials: true})
      .then((serverRes) => {
        setUserProfile(serverRes.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
  }, []);


  //start
  const [posts, setPosts] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const fetchHasMore = async () => {
    await axios.get(`/api/posts/count?user=${userProfile.username}`).then((serverRes) => {
      const postsCount = serverRes.data.count;
      if (posts.length < postsCount) {
        setLoadMore(true);
      } else {
        setLoadMore(false);
      }
    });
  };

  const limit = 10;
  const [offset, setOffset] = useState(0);
  const fetchPosts = async () => {
    await axios
      .get(`/api/users/${userProfile.username}`, {
        params: { limit: limit, cursor: offset },
        withCredentials: true
      })
      .then((serverRes) => {
        const res_posts = serverRes.data.Posts;
        if (offset == 0) {
          setPosts(res_posts);
          setOffset(offset + limit);
        } else {
          setOffset(offset + limit);
          setPosts((prev) => {
            return [...prev, ...res_posts];
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //end
  
  const postList = (
    <MainPostList fetchHasMore={fetchHasMore} hasMore={loadMore} fetchPosts={fetchPosts} posts={posts}/>
  );

  return (
    <>
      <Header />

      <div className="flex justify-center mt-6">
        <img className="rounded-full mr-2" src={userProfile.avatar} />
        <div>
          <h1>{userProfile.username}</h1>
          <p>Total Posts: {userProfile.Posts.length}</p>
        </div>
      </div>
      <div className="w-fit mx-auto mt-3">Bio: {userProfile.biography}</div>

      <h2 className="mt-6 mb-4 text-center text-2xl">user posts</h2>

      { userProfile.username != "" && (postList) }
    </>
  );
};

export default User;
