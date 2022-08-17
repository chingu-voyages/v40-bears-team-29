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
    <article className='bg-white dark:bg-slate-800 shadow p-5 rounded-lg'>
        <header className='relative mb-6'>
          <h2 className='text-xl lg:text-2xl font-bold hover:underline cursor-pointer' onClick={navigateToSpecHandler}>
            { obj.postTitle }
          </h2>
          <button title="Upvote" className='absolute -top-2 -right-2 p-1 rounded transition-all hover:bg-slate-100 dark:hover:bg-slate-700 flex flex-row items-center leading-none cursor-pointer z-10' onClick={upVoteHandler}>
            <span className="block -mt-0.5">{obj.votes}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className='block w-5 py-1'
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
          </button>
        </header>
        <p className=''>{obj.post.substring(0, 300)}</p>

        <div onClick={takeToUserProfHandler} className='inline-flex mt-6 cursor-pointer'>
          <img alt={`${obj.username} profile avatar`} className='w-6 h-6 mr-3 rounded-full' src={obj.src} />
          <p>{obj.username}{obj.username === authMgr.currentUser.username && ' (you)' }</p>
        </div>
      <div className=''>
        <div className=''>
          {obj.username === authMgr.currentUser.username && (
            <>
              <svg
                onClick={navigateToEditHandler}
                xmlns="http://www.w3.org/2000/svg"
                className=''
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
                className=''
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
      </div>
    </article>
  );
};

export default MainPostItem;
