import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("portal");

const PortalWrapper = (props) => {
  return <article className='fixed top-0 left-0 w-screen h-screen z-50 bg-white dark:bg-slate-900'>{props.children}</article>;
};

const Portal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <PortalWrapper>{props.children}</PortalWrapper>,
        root
      )}
    </>
  );
};

export default Portal;
