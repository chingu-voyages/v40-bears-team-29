import { useParams } from "react-router-dom";

const PostSpecEdit = () => {
  const urlId = useParams().id;

  return (
    <>
      <h1>Edit Post Here</h1>
      <p>{urlId}</p>
    </>
  );
};

export default PostSpecEdit;
