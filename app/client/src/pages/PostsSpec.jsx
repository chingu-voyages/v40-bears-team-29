import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import axios from "axios";
import { postCtx } from "../features/posts-ctx";
import PostUpvoteButton from "../components/PostUpvoteButton/PostUpvoteButton";
import UserInlineProfile from "../components/UserInlineProfile/UserInlineProfile";

const PostSpec = () => {
  const urlId = useParams().id;
  const postMgr = useContext(postCtx);

  const getPost = () => {
    const posts = postMgr.posts;

    const p = posts.find((p) => {
      return p.slug == urlId;
    });

    return p;
  };

  const fetchPost = async () => {
    await axios
      .get(`/api/posts/${urlId}`)
      .then((serverRes) => {
        const postId = serverRes.data.id;
        const impostor = postMgr.posts.find((o) => {
          return o.id == postId;
        });

        if (!impostor) {
          postMgr.setPosts((prev) => {return [...prev, serverRes.data];});
          return;
        }

        const impostorIndex = postMgr.posts.indexOf(impostor);

        postMgr.setPosts((prev) => {
          prev[impostorIndex] = serverRes.data;
          return [...prev];
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const post = getPost();
  const createdAt = post && new Date(post.createdAt);

  return (
    <>
      <Header />
      <main className="flex flex-col space-y-4 mx-auto px-2 pb-10 mt-10 max-w-screen-lg">
        <article>
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-3xl font-semibold mr-2">
              {post ? post.title : "loading"}
            </h1>
            {post?.Upvotes && (<PostUpvoteButton className="!p-2" obj={post}/>)}
          </div>
          <pre>
            {post ? post.content : "loading"}
          </pre>
          {post && (
            <div className="flex justify-between mt-6">
              <span className="flex">
                from: <UserInlineProfile className="ml-3" obj={post.User} />
              </span>
              <span className="flex">
                created at: {createdAt.toDateString()}
              </span>
            </div>
          )}
        </article>
      </main>
    </>
  );
};

export default PostSpec;
