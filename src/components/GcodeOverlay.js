// https://biagio.dev/posts/tailwindcss-react-modal
import { createPortal } from "react-dom";
import { useEffect } from "react";

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
          } transition-opacity duration-300 ease-in-out`}
          onClick={handleClose}
        />

        {/* modal content */}
        <div
          className={`fixed right-0 h-full bg-white shadow-lg w-128 ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
        >
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
