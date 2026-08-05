import React from "react";

interface SuccessBannerProps {
  code: string;
  onDismiss: () => void;
}

export const SuccessBanner: React.FC<SuccessBannerProps> = ({
  code,
  onDismiss,
}) => (
  <div
    role="status"
    aria-live="polite"
    className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex justify-between items-start"
  >
    <div>
      <h3 className="text-green-800 font-semibold mb-1">Booking Confirmed</h3>
      <p className="text-green-700 text-sm">
        Your appointment is set. Confirmation code:{" "}
        <strong className="tracking-wide">{code}</strong>
      </p>
    </div>
    <button
      onClick={onDismiss}
      className="text-green-600 hover:text-green-800 focus:ring-2 focus:ring-green-500 rounded p-1"
      aria-label="Dismiss success message"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);
