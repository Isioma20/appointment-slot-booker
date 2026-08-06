import React, { useEffect, useRef } from "react";

interface SuccessModalProps {
  confirmationCode: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  confirmationCode,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    modalRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm flex flex-col items-center text-center transform outline-none"
      >
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 id="modal-title" className="text-xl font-bold text-gray-900 mb-2">
          Booking Confirmed!
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          Your appointment has been successfully scheduled. Here is your
          confirmation code:
        </p>

        {/* Confirmation Code Display */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 mb-6 w-full">
          <span className="block font-mono text-xl font-bold text-gray-800 tracking-wider">
            {confirmationCode}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
