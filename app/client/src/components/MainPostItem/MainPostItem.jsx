import classes from "./MainPostItem.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";

const MainPostItem = ({ obj, setDummyData, dummyData }) => {
  const navigate = useNavigate();
  const authMgr = useContext(AuthCtx);

  const deletePostHandler = () => {
    // SEND API PATCH REQUEST
    // UPON 2xx RUN THIS FILTER
    // AND TRIGGER POST SETTING EFFECT
    // DEPENDENCY

    return setDummyData((prev) =>
      prev.filter((objRet) => {
        return objRet.username !== authMgr.currentUser.username;
      })
    );
  };

  const upVoteHandler = () => {
    const impostor = dummyData.find((objRet) => {
      return objRet === obj;
    });

    impostor.votes++;
    setDummyData((prev) => [...prev, impostor]);
  };

  const navigateToSpecHandler = () => {
    // PARAM WILL BE CURRENT USER
    navigate(`/posts/${obj.username}`);
  };

  const navigateToEditHandler = () => {
    // navigate(`/posts/${authMgr.currentUser.username}/edit`);
    // OPEN MODAL WITH SPEC PAGE TEST
    authMgr.setShowModal(true);
    // TEST END
  };

  const takeToUserProfHandler = () => {
    navigate(`/posts/${obj.username}`);
  };

  return (
    <li className={classes.li}>
      <div className={classes.userBox}>
        <div onClick={takeToUserProfHandler} className={classes.avatarBox}>
          <img alt="profile avatar" className={classes.avatar} src={obj.src} />

          <p className={classes.username}>{obj.username}</p>
        </div>
        <p className={classes.votes}>
          {obj.votes}{" "}
          <span>
            <svg
              onClick={upVoteHandler}
              xmlns="http://www.w3.org/2000/svg"
              className={classes.icon}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 11l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
          </span>
        </p>
      </div>
      <div className={classes.postBox}>
        <h3 className={classes.title}>{obj.postTitle}</h3>
        <p className={classes.post}>{obj.post.substring(0, 300)}</p>
      </div>
      <div className={classes.actionBox}>
        <div className={classes.userOnly}>
          {obj.username === authMgr.currentUser.username && (
            <>
              <svg
                onClick={navigateToEditHandler}
                xmlns="http://www.w3.org/2000/svg"
                className={classes.icon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>

              <svg
                onClick={deletePostHandler}
                xmlns="http://www.w3.org/2000/svg"
                className={classes.icon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </>
          )}
        </div>
        <svg
          onClick={navigateToSpecHandler}
          xmlns="http://www.w3.org/2000/svg"
          className={classes.icon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>
    </li>
  );
};

export default MainPostItem;
