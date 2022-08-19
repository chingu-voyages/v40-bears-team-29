import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { ModalCtx } from "../../features/modal-ctx";
import { ArrowUpIcon, PencilAltIcon, TrashIcon } from "../Icon/Icon";
import axios from "axios";

const MainPostItem = ({ obj, setPosts, posts }) => {
  const navigate = useNavigate();
  const authMgr = useContext(AuthCtx);
  const modalMgr = useContext(ModalCtx);

  const deletePostHandler = () => {
    // SEND API PATCH REQUEST
    // UPON 2xx RUN THIS FILTER
    // AND TRIGGER POST SETTING EFFECT
    // DEPENDENCY

    return setPosts((prev) =>
      prev.filter((objRet) => {
        return objRet.User.username !== authMgr.currentUser.username;
      })
    );
  };

  const upVoteHandler = async () => {
    if (!authMgr.isLoggedIn) {
      return;
    }

    await axios
      .post(`/api/posts/${obj.id}/upvote`, {}, { withCredentials: true })
      // .then((serverRes) => {
      //   console.log(serverRes.data);
      // })
      .catch((err) => console.log(err));

    await axios
      .get(`/api/posts/${obj.id}`)
      .then((serverRes) => {
        const postId = serverRes.data.id;
        const impostor = posts.find((o) => {
          return o.id == postId;
        });

        const impostorIndex = posts.indexOf(impostor);

        setPosts((prev) => {
          prev[impostorIndex] = serverRes.data;
          return [...prev];
        });
      })
      .catch((err) => console.log(err));
  };

  const navigateToSpecHandler = () => {
    navigate(`/posts/${obj.id}`);
  };

  const navigateToEditHandler = () => {
    modalMgr.onSetShowModal("editPost");
  };

  const takeToUserProfHandler = () => {
    navigate(`/users/${obj.User.id}`);
  };

  const isUpvoted = () => {
    const upvote = obj.Upvotes.find((o) => {
      return o.UserId == authMgr.currentUser.id;
    });

    return upvote;
  };

  if (Object.entries(obj).length === 0) {
    return(
      <article className="bg-white dark:bg-slate-800 border-gray-200 border dark:border-none shadow p-5 rounded-lg">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white dark:bg-slate-800 border-gray-200 border dark:border-none shadow p-5 rounded-lg">
      <header className="relative mb-6">
        <h2
          className="text-xl lg:text-2xl font-bold hover:underline cursor-pointer"
          onClick={navigateToSpecHandler}
        >
          {obj.title} {obj.id}
        </h2>
        <button
          title="Upvote"
          className={`absolute -top-2 -right-2 p-1 rounded transition-all hover:bg-slate-100 dark:hover:bg-slate-700 flex flex-row items-center leading-none cursor-pointer z-10 ${isUpvoted() ? "bg-white/10" : ""}`}
          onClick={upVoteHandler}
        >
          <span className="block -mt-1">{obj.Upvotes.length}</span>
          <ArrowUpIcon className="block w-3 ml-1" />
        </button>
      </header>
      <p>{obj.content.substring(0, 300)}</p>
      <footer className="flex flex-wrap justify-between items-center mt-6">
        <div onClick={takeToUserProfHandler} className="flex cursor-pointer">
          <img
            alt={`${obj.User.username} profile avatar`}
            className="w-6 h-6 mr-3 rounded-full"
            src={obj.User.avatar || "https://i.imgur.com/pA5kCae.png"}
          />
          <p>
            {obj.User.username}
            {obj.User.username === authMgr.currentUser.username && " (you)"}
          </p>
        </div>
        <div className="flex space-x-3">
          {obj.User.username === authMgr.currentUser.username && (
            <>
              <button title="Edit post" onClick={navigateToEditHandler}>
                <PencilAltIcon className="w-5" />
              </button>
              <button title="Delete post" onClick={deletePostHandler}>
                <TrashIcon className="w-5" />
              </button>
            </>
          )}
        </div>
      </footer>
    </article>
  );
};

export default MainPostItem;
