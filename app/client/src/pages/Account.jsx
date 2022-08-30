import { AuthCtx } from "../features/auth-ctx";
import React, { useContext } from "react";
import Feedback from "../components/Feedback/Feedback";
import { FormCtx } from "../features/form-ctx";
import { ModalCtx } from "../features/modal-ctx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Account = () => {
  const nav = useNavigate();
  const formMgr = useContext(FormCtx);
  const modalMgr = useContext(ModalCtx);
  const authMgr = useContext(AuthCtx);

  const fetchUsersData = () => {
    const userData = authMgr.currentUser;

    formMgr.initFields({
      "avatar": userData.avatar,
      "biography": userData.biography,
      "currentPassword": "",
      "newPassword": ""
    });
  };

  fetchUsersData();

  const formHandler = async (e) => {
    e.preventDefault();

    await axios
      .patch("/api/logged_user", formMgr.getFormFields(), { withCredentials: true })
      .then((serverRes) => {
        console.log(serverRes.data);
        formMgr.setShowFeedback(false);
        authMgr.setCurrentUser(serverRes.data);
        modalMgr.onCloseModal();
        nav("/");
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

      <h2>Registration update for {authMgr.currentUser.username}</h2>
      <form className="text-black">
        <p>User avatar url:</p>
        <input
          type="text"
          placeholder="Avatar url"
          onChange={(e) => formMgr.onFieldChange(e)}
          value={formMgr.getFieldByName("avatar")}
          name="avatar"
        />
        <img src={formMgr.getFieldByName("avatar")} />
        <p>Biography:</p>
        <input
          placeholder="Edit biography"
          type="text"
          onChange={(e) => formMgr.onFieldChange(e)}
          value={formMgr.getFieldByName("biography")}
          name="biography"
        />
        <p>New Password (optional):</p>
        <input
          type="password"
          placeholder="New password (optional)"
          onChange={(e) => formMgr.onFieldChange(e)}
          value={formMgr.getFieldByName("newPassword")}
          name="newPassword"
        />
        {/* <p>Confirm new Password:</p> */}
        {/* <input */}
        {/*   type="password" */}
        {/*   placeholder="Confim new password" */}
        {/* /> */}
        <p>Current Password (required):</p>
        <input
          type="password"
          placeholder="Current password (required)"
          onChange={(e) => formMgr.onFieldChange(e)}
          value={formMgr.getFieldByName("currentPassword")}
          name="currentPassword"
        />

        <br/>
        <input onClick={formHandler} value="Save changes" type="submit" />
      </form>
    </>
  );
};

export default Account;
