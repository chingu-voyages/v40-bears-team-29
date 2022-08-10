import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
const User = () => {
  const nav = useNavigate();
  let urlId = useParams().id;

  const navToEditHandler = () => {
    nav(`/users/${urlId}/edit`);
  };

  return (
    <>
      <h1>PROFILE FOR: {urlId}</h1>
      <Header />
      <button onClick={navToEditHandler}>Edit profile</button>
    </>
  );
};

export default User;
