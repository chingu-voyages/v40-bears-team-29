import React  from "react";
import { useParams } from "react-router-dom";

const UserEdit = () => {
  const urlId = useParams().id;

  return <h1>Editing user: {urlId}</h1>;
};

export default UserEdit;
