import React, { createContext, useState } from "react";

export const FormCtx = createContext({
  errorMsg: "",
  setErrorMsg: () => {},
  showFeedback: false,
  setShowFeedback: () => {},
  fields: {},
  setFields: () => {},
  onFieldChange: () => {},
  initFields: () => {},
  formName: () => {},
  setFormName: () => {}
});

const FormProvider = (props) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [fields, setFields] = useState({});
  const [formName, setFormName] = useState("global");

  const getFieldByName = (name) => {
    return fields[formName][name];
  };

  const initForm = (name = formName) => {
    const formFields = {};
    formFields[name] = {};

    setFields((prev) => {
      prev[name] = {};
      return prev;
    });
  };

  const getFormFields = () => {
    if (!fields[formName]) {
      initForm();
    }

    return {...fields[formName]};
  };

  const doesTheFormFieldsNeedUpdate = (newFields) => {
    let result = false;
    Object.entries(newFields).forEach(([key]) => {
      if (fields[formName][key] !== newFields[key]) {
        result = true;
      }
    });

    return result;
  };

  const setFormFields = (newFields) => {
    if (!fields[formName]) {
      initForm();
    }

    const newForm = {};
    newForm[formName] = {...getFormFields(), ...newFields};

    if (doesTheFormFieldsNeedUpdate(newFields)) {
      setFields((prev) => {
        return {...prev, ...newForm};
      });
    }
  };

  const initFields = (newFields) => {
    if (newFields.constructor.name != "Array") {
      newFields = Object.entries(newFields);
    }

    const formFields = getFormFields();

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

      oldValue = formFields[fieldName];

      if (oldValue == undefined) {
        formFields[fieldName] = oldValue || fieldValue ? fieldValue : "";
      }
    });

    setFormFields(formFields);
  };

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    return setFields((prev) => {
      prev[formName][name] = value;
      return {...prev};
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
        onFieldChange,
        formName,
        setFormName,
        initForm,
        getFieldByName,
        getFormFields
      }}
    >
      {props.children}
    </FormCtx.Provider>
  );
};

export default FormProvider;
