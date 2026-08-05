interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div
    role="alert"
    aria-live="assertive"
    className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
  >
    <div className="text-red-700 text-sm">
      <strong className="block font-semibold mb-1">
        Unable to load availability
      </strong>
      {message}
    </div>
    <button
      onClick={onRetry}
      data-testid="retry-button"
      className="shrink-0 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md font-medium transition-colors focus:ring-2 focus:ring-red-500 focus:outline-none"
    >
      Try Again
    </button>
  </div>
);
