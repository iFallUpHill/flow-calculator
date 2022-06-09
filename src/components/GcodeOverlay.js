// https://biagio.dev/posts/tailwindcss-react-modal
import { createPortal } from "react-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import downloadGcode from "../utils/downloadGcode";
import { SuccessToast } from './Toasts';

export default function GcodeOverlay({ isOpen, handleClose, contents }) {

  useEffect((handleClose) => {
    function escHandler({ key }) {
      if (key === "Escape") {
        handleClose();
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  if (typeof document !== "undefined") {
    return createPortal(
      <div className={`fixed inset-0 ${isOpen ? "" : "pointer-events-none"}`}>
        {/* background overlay */}
        <div
          className={`fixed inset-0 bg-black ${
            isOpen ? "opacity-50" : "pointer-events-none opacity-0"
          } transition-opacity duration-200 ease-in-out`}
          onClick={handleClose}
        />

        {/* modal content */}
        <div
          className={`fixed right-0 h-full bg-white shadow-lg w-128 ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-200 ease-in-out`}
        >
          <button
            className="absolute right-0 top-0 mt-4 mr-14"
            onClick={() => {
              toast.custom(
                ({visible}) => (
                  <SuccessToast visible={visible} label="Copied to Clipboard" />
                ),
                { duration: 1250 }
              );
              navigator.clipboard.writeText(contents);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </button>
          <button
            className="absolute right-0 top-0 mt-4 mr-9"
            onClick={() => {downloadGcode()}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="absolute right-0 top-0 mt-4 mr-4"
            onClick={handleClose}
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
          <div className="h-full px-8 py-6 overflow-y-scroll">
            <pre>
              <code className="text-sm whitespace-pre-wrap">{contents}</code>
            </pre>
          </div>
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
}
