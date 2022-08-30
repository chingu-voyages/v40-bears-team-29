import MainPostItem from "../MainPostItem/MainPostItem";
import React, { useEffect } from "react";
import axios from "axios";
import { postCtx } from "../../features/posts-ctx";
import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";

const MainPostList = () => {
  const postMgr = useContext(postCtx);

  const fetchPosts = async () => {
    await axios.get("/api/posts/count").then((serverRes) => {
      const postsCount = serverRes.data.count;
      if (postMgr.posts.length < postsCount) {
        postMgr.setLoadMore(true);
      } else {
        postMgr.setLoadMore(false);
      }
    });

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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="flex flex-col space-y-4 mx-auto px-2 max-w-screen-lg">
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchPosts}
        hasMore={postMgr.loadMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {postMgr.posts.map((obj, index) => {
          return <MainPostItem obj={obj} key={`POST_${index}`} />;
        })}
      </InfiniteScroll>
    </main>
  );
};
export default MainPostList;
