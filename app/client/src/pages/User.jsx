import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { AuthCtx } from "../features/auth-ctx";
import { useContext, useState } from "react";
const User = () => {
  const authMgr = useContext(AuthCtx);
  const nav = useNavigate();
  const urlId = useParams().id;
  const [canEdit, setCanEdit] = useState(false);
  const navToEditHandler = () => {
    nav(`/users/${urlId}/edit`);
  };

  return (
    <>
      <h1>PROFILE FOR: {urlId}</h1>
      <Header />
      {canEdit && <button onClick={navToEditHandler}>Edit profile</button>}
    </>
  );
};

export default User;
