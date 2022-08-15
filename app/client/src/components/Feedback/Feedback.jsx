import classes from "./Feedback.module.css";

const Feedback = ({ bool, message }) =>
  !bool || <p className={classes.p}>{message}</p>;

export default Feedback;
