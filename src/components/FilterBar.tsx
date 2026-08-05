interface FilterBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  query,
  onQueryChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}) => {
  return (
    <section
      aria-labelledby="filter-heading"
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
    >
      <h2 id="filter-heading" className="sr-only">
        Filter Appointments
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-[2]">
          <label
            htmlFor="clinician-search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Clinician Name
          </label>
          <input
            id="clinician-search"
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by clinician..."
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
          />
        </div>

        {/* Date Filters Container */}
        <div className="flex flex-col sm:flex-row gap-4 flex-[3]">
          <div className="flex-1">
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              From
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              To
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
