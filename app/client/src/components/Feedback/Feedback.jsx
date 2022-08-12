import classes from "./Feedback.module.css";

const Feedback = ({ bool, message }) => {
  if (!bool) {
    return null;
  }
  return <p>{message}</p>;
};

export default Feedback;
