import MainPostItem from "../MainPostItem/MainPostItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { postCtx } from "../../features/posts-ctx";
import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";

const MainPostList = () => {
  const postMgr = useContext(postCtx);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    await axios.get("/api/posts/count").then((serverRes) => {
      const postsCount = serverRes.data.count;
      if (postMgr.posts.length < postsCount) {
        setHasMore(true);
      } else {
        setHasMore(false);
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
        hasMore={hasMore}
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
