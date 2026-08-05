export const LoadingState: React.FC = () => (
  <div aria-busy="true" className="space-y-8 animate-pulse">
    <span className="sr-only">Loading appointments...</span>
    {[1, 2].map((i) => (
      <div key={i} className="space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-100 rounded-lg border border-gray-200"></div>
        <div className="h-24 bg-gray-100 rounded-lg border border-gray-200"></div>
      </div>
    ))}
  </div>
);
