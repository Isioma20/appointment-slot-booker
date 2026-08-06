import React from "react";

interface FilterBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  query,
  onQueryChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onReset,
}) => {
  const hasActiveFilters = Boolean(query.trim() || startDate || endDate);

  return (
    <form
      role="search"
      aria-labelledby="filter-heading"
      onSubmit={(e) => e.preventDefault()}
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4"
    >
      <h2 id="filter-heading" className="sr-only">
        Filter Appointments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-w-0">
        {/* Search Input */}
        <div className="md:col-span-5 min-w-0">
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
            className="w-full px-3 py-2 min-w-0 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
          />
        </div>

        {/* Date Filters */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
          <div className="min-w-0">
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
              className="w-full px-3 py-2 min-w-0 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>

          <div className="min-w-0">
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
              className="w-full px-3 py-2 min-w-0 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>
        </div>
      </div>

      {/* Row 2: The Action Bar */}
      <div className="flex justify-end pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className={`text-sm font-medium px-4 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            hasActiveFilters
              ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300"
              : "text-gray-400 opacity-50 cursor-not-allowed"
          }`}
          aria-label="Clear all filters"
        >
          Clear filters
        </button>
      </div>
    </form>
  );
};
