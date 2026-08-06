interface EmptyStateProps {
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No appointment slots available.",
}) => (
  <div className="text-center py-12 px-4 border-2 border-dashed border-gray-200 rounded-xl">
    <p className="text-gray-600 text-lg">{message}</p>
    <p className="text-gray-400 text-sm mt-2">
      Try adjusting your date range or clinician search.
    </p>
  </div>
);
