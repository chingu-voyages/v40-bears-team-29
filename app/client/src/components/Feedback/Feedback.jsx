import React from "react";

const typeClasses = {
  info: "flex flex-col bg-blue-100 rounded-lg py-2 p-3 text-sm text-blue-700",
  danger: "flex flex-col bg-red-100 rounded-lg py-2 p-3 text-sm text-red-700",
  success: "flex flex-col bg-green-100 rounded-lg py-2 p-3 text-sm text-green-700",
  warning: "flex flex-col bg-yellow-100 rounded-lg py-2 p-3 text-sm text-yellow-700"
};

const Feedback = ({ bool, message, type = "info" }) => {
  if (bool) {
    return <div className={typeClasses[type]} role='alert'>{ message.map((obj, index) => <p key={`feedback_${index}`}>{obj.message}</p> ) }</div>;
  }
};

export default Feedback;
