import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { ModalCtx } from "../../features/modal-ctx";
import { PencilAltIcon, TrashIcon } from "../Icon/Icon";
import UserInlineProfile from "../UserInlineProfile/UserInlineProfile";
import PostUpvoteButton from "../PostUpvoteButton/PostUpvoteButton";
import { Remarkable } from "remarkable";

import { postCtx } from "../../features/posts-ctx";

const MainPostItem = ({ obj }) => {
  const md = new Remarkable();
  const navigate = useNavigate();
  const authMgr = useContext(AuthCtx);
  const modalMgr = useContext(ModalCtx);
  const postMgr = useContext(postCtx);

  const deletePostHandler = () => {
    postMgr.deletePost(obj);
  };

  const navigateToSpecHandler = () => {
    navigate(`/posts/${obj.slug}`);
  };

  const navigateToEditHandler = (e) => {
    let formPostId = e.target.parentElement.dataset.postId;
    // TODO: refactor
    if(!formPostId) {
      formPostId = e.target.parentElement.parentElement.dataset.postId;
    }
    const post = postMgr.posts.find((p) => {
      return p.id == formPostId;
    });

    modalMgr.setSelectedPost(post);
    modalMgr.onSetShowModal("editPost");
  };

  const getMarkdownExcerpt = (content) => {
    const contentHtml = md.render(content);
    const tags = contentHtml.split("\n");
    for (var i in tags) {
      if(tags[i].substring(0,3) == "<p>") {
        return tags[i].substring(3, tags[i].length - 4);
      }
    }
    return "";
  };

  if (Object.entries(obj).length === 0) {
    return (
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
    <article className="bg-white dark:bg-slate-800 border-gray-200 border dark:border-none shadow p-5 rounded-lg mb-5">
      <div className="flex justify-between mb-6">
        <header
          className="text-xl lg:text-2xl font-bold hover:underline cursor-pointer"
          onClick={navigateToSpecHandler}
        >
          {obj.title}
        </header>
        <PostUpvoteButton obj={obj} />
      </div>
      <p>{getMarkdownExcerpt(obj.content).substring(0, 300)}</p>
      <footer className="flex flex-wrap justify-between items-center mt-6">
        <UserInlineProfile obj={obj.User} />
        <div className="flex space-x-3">
          {obj.User.username === authMgr.currentUser.username && (
            <>
              <button title="Edit post" onClick={navigateToEditHandler} data-post-id={obj.id}>
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
