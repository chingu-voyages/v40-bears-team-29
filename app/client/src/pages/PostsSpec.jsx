import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
const PostSpec = () => {
  const urlId = useParams().id;

  return (
    <>
      <Header />
      <h1>This is Spec Post</h1>
      <p>{urlId}</p>
    </>
  );
};

export default PostSpec;
