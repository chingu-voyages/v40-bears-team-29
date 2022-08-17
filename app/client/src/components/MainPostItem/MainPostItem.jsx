import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthCtx } from '../../features/auth-ctx';
import { ArrowUp, PencilAlt, Trash } from '../Icon/Icon';

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
          <button title='Upvote' className='absolute -top-2 -right-2 p-1 rounded transition-all hover:bg-slate-100 dark:hover:bg-slate-700 flex flex-row items-center leading-none cursor-pointer z-10' onClick={upVoteHandler}>
            <span className='block -mt-1'>{obj.votes}</span>
            <ArrowUp className='block w-3 ml-1' />
          </button>
        </header>
        <p>{obj.post.substring(0, 300)}</p>
        <footer className='flex flex-wrap justify-between items-center mt-6'>
          <div onClick={takeToUserProfHandler} className='flex cursor-pointer'>
            <img alt={`${obj.username} profile avatar`} className='w-6 h-6 mr-3 rounded-full' src={obj.src} />
            <p>{obj.username}{obj.username === authMgr.currentUser.username && ' (you)' }</p>
          </div>
          <div className='flex space-x-3'>
            {obj.username === authMgr.currentUser.username && (
              <>
              <button title='Edit post' onClick={navigateToEditHandler}>
                <PencilAlt className='w-5' />
              </button>
              <button title='Delete post' onClick={deletePostHandler}>
                <Trash className='w-5' />
              </button>
              </>
            )}
          </div>
        </footer>
    </article>
  );
};

export default MainPostItem;
