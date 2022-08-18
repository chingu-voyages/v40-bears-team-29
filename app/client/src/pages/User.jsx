import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
        console.log(serverRes.data);
        setUserProfile(serverRes.data);
      })
      .catch((err) => console.log(err));
    // send error feedback
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />

      <img src={userProfile.avatar} />
      <h1>PROFILE FOR: {userProfile.username}</h1>
      <p>Total Posts: {userProfile.Posts.length}</p>
      <p>Bio: {userProfile.biography}</p>
      <h3>POSTS</h3>
      <ul>
        {userProfile.Posts.map((obj) => {
          return (
            <li key={obj.id}>
              {obj.title}, {obj.content}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default User;
