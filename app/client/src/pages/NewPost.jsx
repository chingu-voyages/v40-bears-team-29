import React, { useContext } from "react";
import Feedback from "../components/Feedback/Feedback";
import { FormCtx } from "../features/form-ctx";

const NewPost = () => {
  const formMgr = useContext(FormCtx);

  formMgr.initFields(["title", "content"]);

  const formHandler = (e) => {
    e.preventDefault();
    console.log(formMgr.fields);
  };

  return (
    <>
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


      <Feedback bool={formMgr.showFeedback} message={formMgr.errorMsg} type={formMgr.msgType ?? "danger"} />
    </>
  );
};

export default NewPost;
