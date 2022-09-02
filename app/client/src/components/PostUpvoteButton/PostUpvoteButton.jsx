import React, { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { postCtx } from "../../features/posts-ctx";
import { ArrowUpIcon } from "../Icon/Icon";
import axios from "axios";

const PostUpvoteButton = ({ obj, className }) => {
  const authMgr = useContext(AuthCtx);
  const postMgr = useContext(postCtx);

  const upVoteHandler = async () => {
    if (!authMgr.isLoggedIn) {
      return;
    }

    await axios
      .post(`/api/posts/${obj.id}/upvote`, {}, { withCredentials: true })
      .catch((err) => console.log(err));

    await axios
      .get(`/api/posts/${obj.id}`)
      .then((serverRes) => {
        const postId = serverRes.data.id;
        const impostor = postMgr.posts.find((o) => {
          return o.id == postId;
        });

        const impostorIndex = postMgr.posts.indexOf(impostor);

        postMgr.setPosts((prev) => {
          prev[impostorIndex] = serverRes.data;
          return [...prev];
        });
      })
      .catch((err) => console.log(err));
  };

  const isUpvoted = () => {
    const upvote = obj.Upvotes.find((o) => {
      return o.UserId == authMgr.currentUser.id;
    });

    return upvote;
  };

  return (
    <button
      title="Upvote"
      className={`${className} p-1 rounded transition-all hover:bg-slate-100 dark:hover:bg-slate-700 flex flex-row items-center leading-none ${isUpvoted() ? "bg-white/10" : ""}`}
      onClick={upVoteHandler}
    >
      <span className="block -mt-1">{obj.upvotesCount}</span>
      <ArrowUpIcon className="block w-3 ml-1" />
    </button>
  );
};

export default PostUpvoteButton;
