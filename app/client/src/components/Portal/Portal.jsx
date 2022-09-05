import React from "react";
import ReactDOM from "react-dom";

const root = document.getElementById("portal");

const PortalWrapper = (props) => {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-90 flex justify-center items-start">
      <div className="block mt-4 bg-white dark:bg-slate-800 w-full mx-10 border border-gray-300 dark:border-none shadow p-4 rounded-lg z-20">
        {props.children}
      </div>
    </div>
  );
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
