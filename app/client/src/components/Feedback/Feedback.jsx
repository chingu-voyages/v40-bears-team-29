import classes from "./Feedback.module.css";

const Feedback = ({ bool, message }) => {
  if (bool) {
    return (
      <>
        {message.map((obj, index) => {
          return <p key={`feedback_${index}`}>{obj.message}</p>;
        })}
      </>
    );
  }
};

export default Feedback;
