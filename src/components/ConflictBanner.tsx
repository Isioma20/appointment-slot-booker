interface ConflictBannerProps {
  message: string;
  onDismiss: () => void;
}

export const ConflictBanner: React.FC<ConflictBannerProps> = ({
  message,
  onDismiss,
}) => (
  <div
    role="alert"
    aria-live="assertive"
    className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex justify-between items-start"
  >
    <div className="text-orange-800 text-sm">
      <strong className="block font-semibold mb-1">Slot Unavailable</strong>
      {message}
    </div>
    <button
      onClick={onDismiss}
      className="text-orange-600 hover:text-orange-800 focus:ring-2 focus:ring-orange-500 rounded p-1"
      aria-label="Dismiss conflict message"
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
