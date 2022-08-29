import React, { createContext, useState } from "react";

export const FormCtx = createContext({
  errorMsg: "",
  setErrorMsg: () => {},
  showFeedback: false,
  setShowFeedback: () => {},
  fields: {},
  setFields: () => {},
  onFieldChange: () => {},
  initFields: () => {}
});

const FormProvider = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [fields, setFields] = useState({});

  const initFields = (listOfFieldsNames) => {
    listOfFieldsNames.forEach(fieldName => {
      const oldValue = fields[fieldName];
      fields[fieldName] = oldValue || "";
    });
  };

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    return setFields((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onShowFeedback = (bool, message) => {
    setShowFeedback(bool);
    setErrorMsg(message);
  };

  const resetFields = () => {
    setFields({});
  };

  return (
    <FormCtx.Provider
      value={{
        resetFields,
        fields,
        showFeedback,
        setShowFeedback,
        onShowFeedback,
        errorMsg,
        setErrorMsg,
        initFields,
        onFieldChange
      }}
    >
      {props.children}
    </FormCtx.Provider>
  );
};

export default FormProvider;
