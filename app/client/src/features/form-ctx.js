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

  const initFields = (newFields) => {
    if (newFields.constructor.name != "Array") {
      newFields = Object.entries(newFields);
    }

    newFields.forEach((field) => {
      let fieldName;
      let fieldValue;
      let oldValue;

      if (field.length == 2) {
        fieldName = field[0];
        fieldValue = field[1];
      } else {
        fieldName = field;
        fieldValue = "";
      }

      oldValue = fields[fieldName];

      if (oldValue == undefined) {
        const newValue = {};
        console.log(newValue);
        newValue[fieldName] = fieldValue ? fieldValue : "";

        setFields((prev) => {return {...newValue, ...prev};});
      }
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
