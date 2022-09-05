import MainPostItem from "../MainPostItem/MainPostItem";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";

// fectch posts should allways be a function that updates the posts state by using offset and adding more posts to the posts state
// TODO: add better state management so it is easier to reuse this component https://tanstack.com/query/v4
const MainPostList = ({fetchHasMore, hasMore, fetchPosts, posts}) => {
  const loadMore = async () => {
    await fetchHasMore();
    if (hasMore) {
      fetchPosts();
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <main className="flex flex-col space-y-4 mx-auto px-2 max-w-screen-lg">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        {posts.map((obj, index) => {
          return <MainPostItem obj={obj} key={`POST_${index}`} />;
        })}
      </InfiniteScroll>
    </main>
  );
};
export default MainPostList;
