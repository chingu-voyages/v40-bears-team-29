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
      <h2 className="mb-6 text-center text-2xl">Update account</h2>

      <Feedback bool={formMgr.showFeedback} message={formMgr.errorMsg} type={formMgr.msgType ?? "danger"} />

      <form className="">
        <div className="flex w-full items-center">
          <div className="flex flex-col w-full">
            <label htmlFor="avatat">
              User avatar url:
            </label>
            <input
              type="text"
              placeholder="Avatar url"
              onChange={(e) => formMgr.onFieldChange(e)}
              value={formMgr.getFieldByName("avatar")}
              className='rounded border-gray-300 dark:border-none dark:text-gray-800'
              name="avatar"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="avatat">
              Preview:
            </label>
            <img className="m-auto  w-20" src={formMgr.getFieldByName("avatar")} />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="biography">
              Biography:
          </label>

          <input
            placeholder="Edit biography"
            type="text"
            className='rounded border-gray-300 dark:border-none dark:text-gray-800'
            onChange={(e) => formMgr.onFieldChange(e)}
            value={formMgr.getFieldByName("biography")}
            name="biography"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
              New Password (optional):
          </label>
          <input
            type="password"
            className='rounded border-gray-300 dark:border-none dark:text-gray-800'
            placeholder="New password (optional)"
            onChange={(e) => formMgr.onFieldChange(e)}
            value={formMgr.getFieldByName("newPassword")}
            name="newPassword"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
              Current Password (required):
          </label>
          <input
            type="password"
            className='rounded border-gray-300 dark:border-none dark:text-gray-800'
            placeholder="Current password (required)"
            onChange={(e) => formMgr.onFieldChange(e)}
            value={formMgr.getFieldByName("currentPassword")}
            name="currentPassword"
          />
        </div>
        <br/>
        <input 
          className="block ml-auto mt-3 w-fit bg-blue-500 hover:bg-blue-700 text-white transition-all py-1 px-2 rounded hover:cursor-pointer"
          onClick={formHandler}
          type="submit"
          value="Save changes"
        />
      </form>
    </>
  );
};

export default Account;
