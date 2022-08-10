import React from "react";
import ReactDOM from "react-dom";
import classes from "./Portal.module.css";

const root = document.getElementById("portal");

const PortalWrapper = (props) => {
  return <article className={classes.article}>{props.children}</article>;
};

const Portal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <PortalWrapper>{props.children}</PortalWrapper>,
        root
      )}
    </React.Fragment>
  );
};

export default Portal;
