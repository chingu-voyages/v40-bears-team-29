import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";

const PostSpecEdit = () => {
  let urlId = useParams().id;

  return (
    <>
      {/* <Header /> */}
      <h1>THIS IS EDIT A SPEC POST PAGE</h1>
      <p>{urlId}</p>
    </>
  );
};

export default PostSpecEdit;
