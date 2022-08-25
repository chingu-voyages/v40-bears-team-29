import React, { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { useNavigate } from "react-router-dom";

const UserInlineProfile = ({ obj, className }) => {
  const navigate = useNavigate();
  const authMgr = useContext(AuthCtx);

  const takeToUserProfHandler = () => {
    navigate(`/users/${obj.username}`);
  };

  return (
    <>
      <div onClick={takeToUserProfHandler} className={`${className} flex cursor-pointer`}>
        <img
          alt={`${obj.username} profile avatar`}
          className="w-6 h-6 mr-3 rounded-full"
          src={obj.avatar || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvectorified.com%2Fimages%2Funknown-avatar-icon-7.jpg&f=1&nofb=1"}
        />
        <p>
          {obj.username}
          {obj.username === authMgr.currentUser.username && " (you)"}
        </p>
      </div>
    </>
  );
};

export default UserInlineProfile;
