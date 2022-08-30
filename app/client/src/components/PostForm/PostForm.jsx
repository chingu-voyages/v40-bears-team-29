import React, { useContext } from "react";
import Feedback from "../Feedback/Feedback";
import { FormCtx } from "../../features/form-ctx";
import { postCtx } from "../../features/posts-ctx";
import { ModalCtx } from "../../features/modal-ctx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostForm = ({ formPost }) => {
  const nav = useNavigate();
  const formMgr = useContext(FormCtx);
  const postMgr = useContext(postCtx);
  const modalMgr = useContext(ModalCtx);

  if (formPost) {
    formMgr.initFields({"title": formPost.title, "content": formPost.content}, `post-${formPost.id}-edit`);
  } else {
    formMgr.initFields(["title", "content"]);
  }

  const formHandlerToCreate = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/posts", formMgr.getFormFields(), { withCredentials: true })
      .then((serverRes) => {
        formMgr.setShowFeedback(false);
        // this is necessary for now because it would be too hard for the client
        // to figure out where to put the new created post in the list ranking
        // so i will clear all posts context and fetch the ranked posts from the server
        postMgr.resetPostList();
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

  const formHandlerToUpdate = async (e) => {
    e.preventDefault();

    await axios
      .patch(`/api/posts/${formPost.id}`, formMgr.getFormFields(), { withCredentials: true })
      .then((serverRes) => {
        formMgr.setShowFeedback(false);
        postMgr.resetPostList();
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
          formMgr.onShowFeedback(true, parsedErrors);
        }
      });
  };

  const formHandler = async (e) => {
    if (!formPost) {
      formHandlerToCreate(e);
    } else {
      formHandlerToUpdate(e);
    }
  };

  return (
    <>
      <Feedback bool={formMgr.showFeedback} message={formMgr.errorMsg} type={formMgr.msgType ?? "danger"} />

      <h2>{formPost ? `Edit post ${formPost.title}` : "New Post"}</h2>

      <form className="flex flex-col text-black">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => formMgr.onFieldChange(e)}
          value={formMgr.getFieldByName("title")}
          name="title"
        />
        <textarea
          cols="30"
          rows="2"
          placeholder="Content"
          onChange={(e) => formMgr.onFieldChange(e)}
          value={formMgr.getFieldByName("content")}
          name="content"
        />
        <input onClick={formHandler} type="submit" value={formPost ? "Update" : "Create"} />
      </form>
    </>
  );
};

export default PostForm;
