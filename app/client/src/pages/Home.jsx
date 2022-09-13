import React, {useContext} from "react";
import Header from "../components/Header/Header";
import MainPostList from "../components/MainPostList/MainPostList";
import { postCtx } from "../features/posts-ctx";
import axios from "axios";

const Home = () => {
  const postMgr = useContext(postCtx);

  const fetchHasMore = async () => {
    await axios.get("/api/posts/count").then((serverRes) => {
      const postsCount = serverRes.data.count;
      if (postMgr.posts.length < postsCount) {
        postMgr.setLoadMore(true);
      } else {
        postMgr.setLoadMore(false);
      }
    });
  };

  const fetchPosts = async () => {
    await axios
      .get("/api/posts", {
        params: { limit: postMgr.limit, cursor: postMgr.offset },
      })
      .then((serverRes) => {
        if (postMgr.offset == 0) {
          postMgr.setPosts(serverRes.data);
          postMgr.setOffset(postMgr.offset + postMgr.limit);
        } else {
          postMgr.setOffset(postMgr.offset + postMgr.limit);
          postMgr.setPosts((prev) => {
            return [...prev, ...serverRes.data];
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      {/* <Search /> */}
      <br/>
      <MainPostList fetchHasMore={fetchHasMore} hasMore={postMgr.loadMore} fetchPosts={fetchPosts} posts={postMgr.posts}/>
    </div>
  );
};

export default Home;
