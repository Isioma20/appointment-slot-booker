export const RefreshingIndicator: React.FC = () => (
  <div
    className="text-sm text-gray-500 flex items-center justify-center py-2 mb-4"
    aria-busy="true"
  >
    <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
    Updating schedule...
  </div>
);
