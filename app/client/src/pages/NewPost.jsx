import React, { useContext } from "react";
import Feedback from "../components/Feedback/Feedback";
import { FormCtx } from "../features/form-ctx";
import { postCtx } from "../features/posts-ctx";
import { ModalCtx } from "../features/modal-ctx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewPost = () => {
  const nav = useNavigate();
  const formMgr = useContext(FormCtx);
  const postMgr = useContext(postCtx);
  const modalMgr = useContext(ModalCtx);

  formMgr.initFields(["title", "content"]);

  const formHandler = async (e) => {
    e.preventDefault();
    console.log(formMgr.fields);

    await axios
      .post("/api/posts", formMgr.fields, { withCredentials: true })
      .then((serverRes) => {
        formMgr.setShowFeedback(false);
        // this is necessary for now because it would be too hard for the client
        // to figure out where to put the new created post in the list ranking
        // so i will clear all posts context and fetch the ranked posts from the server
        postMgr.setPosts([]); // <- TODO: move this to post context in a resetPosts function
        modalMgr.onCloseModal();
        nav("/");
        console.log(serverRes.data);
      })
      .catch((err) => {
        const responseData = err.response.data;

        if (responseData.error) {
          formMgr.onShowFeedback(true, [{message: responseData.error}]);
        } else {
          const parsedErrors = Object.values(responseData.errors).flat();
          console.log(parsedErrors);
          formMgr.onShowFeedback(true, parsedErrors);
        }
      });
  };

  return (
    <>
      <Feedback bool={formMgr.showFeedback} message={formMgr.errorMsg} type={formMgr.msgType ?? "danger"} />

      <h2>New Post</h2>

      <form className="flex flex-col text-black">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => formMgr.onFieldChange(e)}
          value={formMgr.fields.title}
          name="title"
        />
        <textarea
          cols="30"
          rows="2"
          placeholder="Content"
          onChange={(e) => formMgr.onFieldChange(e)}
          value={formMgr.fields.content}
          name="content"
        />
        <input onClick={formHandler} type="submit" value="Create" />
      </form>
    </>
  );
};

export default NewPost;
