import React, { useState } from "react";

const SlimAlert = ({ title, msg }) => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      {showAlert ? (
        <div className="text-white px-6 py-4 rounded-md relative mb-4 bg-amber-500 flex items-center">
          <p className="text-xl inline-block mr-5 align-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
            </svg>
          </p>
          <div className="text-sm">
            <p className="font-bold">{title}</p>
            <p>{msg}</p>
          </div>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-2 mr-2"
            onClick={() => setShowAlert(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : null}
    </>
  );
};

export { SlimAlert };
