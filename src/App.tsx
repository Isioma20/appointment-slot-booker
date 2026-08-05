import { useMemo } from "react";
import { useSlots } from "./hooks/useSlots";
import { groupSlotsByWATDay } from "./utils/groupSlots";

import { FilterBar } from "./components/FilterBar";
import { SlotList } from "./components/SlotList";
import { LoadingState } from "./components/LoadingState";
import { RefreshingIndicator } from "./components/RefreshingIndicator";
import { ErrorState } from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";
import { SuccessBanner } from "./components/SuccessBanner";
import { ConflictBanner } from "./components/ConflictBanner";

export default function App() {
  const {
    slots,
    isInitialLoad,
    isRefetching,
    error,
    conflictError,
    confirmationCode,
    bookingSlotId,
    query,
    setQuery,
    watStartDate,
    setWatStartDate,
    watEndDate,
    setWatEndDate,
    retry,
    book,
    clearSuccess,
    clearConflict,
  } = useSlots();

  // Derived state
  const groupedSlots = useMemo(() => groupSlotsByWATDay(slots), [slots]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Static Header with Filters (Sticky removed for better mobile layout) */}
      <header className="bg-white border-b border-gray-200 pt-8 pb-6 px-4 mb-6 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
            Book an Appointment
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Select an available time slot for your consultation in Lagos.
          </p>

          <FilterBar
            query={query}
            onQueryChange={setQuery}
            startDate={watStartDate}
            onStartDateChange={setWatStartDate}
            endDate={watEndDate}
            onEndDateChange={setWatEndDate}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-4">
        {/* --- Independent Feedback Overlays --- */}
        {confirmationCode && (
          <SuccessBanner code={confirmationCode} onDismiss={clearSuccess} />
        )}

        {conflictError && (
          <ConflictBanner message={conflictError} onDismiss={clearConflict} />
        )}

        {/* --- Refetch Indicator --- */}
        {/* Renders alongside existing data without hiding it */}
        {isRefetching && <RefreshingIndicator />}

        {/* --- Core Rendering Flow (Mutually Exclusive) --- */}
        {isInitialLoad ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error.message} onRetry={retry} />
        ) : groupedSlots.length === 0 ? (
          <EmptyState message="No appointments match your search criteria." />
        ) : (
          <SlotList
            groupedSlots={groupedSlots}
            onBook={book}
            bookingSlotId={bookingSlotId}
          />
        )}
      </main>
    </div>
  );
}
