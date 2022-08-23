import MainPostItem from "../MainPostItem/MainPostItem";
import React, { useEffect } from "react";
import axios from "axios";
import { postCtx } from "../../features/posts-ctx";
import { useContext } from "react";

const MainPostList = () => {
<<<<<<< HEAD
  const postMgr = useContext(postCtx);
=======
  const [posts, setPosts] = useState([{}, {}, {}, {}, {}, {}, {}]);
>>>>>>> 1439a6ebb6ce7b638cd2382cdcd4da4759f10486

  const fetchPosts = async () => {
    await axios
      .get("/api/posts")
      .then((serverRes) => {
<<<<<<< HEAD
        postMgr.setPosts(serverRes.data);
=======
        setPosts(serverRes.data);
>>>>>>> 1439a6ebb6ce7b638cd2382cdcd4da4759f10486
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="flex flex-col space-y-4 mx-auto px-2 max-w-screen-lg">
<<<<<<< HEAD
      {postMgr.posts.map((obj, index) => {
        return <MainPostItem obj={obj} key={`POST_${index}`} />;
=======
      {posts.map((obj, index) => {
        return (
          <MainPostItem
            obj={obj}
            key={`POST_${index}`}
            setPosts={setPosts}
            posts={posts}
          />
        );
>>>>>>> 1439a6ebb6ce7b638cd2382cdcd4da4759f10486
      })}
    </main>
  );
};
export default MainPostList;
