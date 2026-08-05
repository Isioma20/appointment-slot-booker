import { useMemo } from "react";
import { useSlots } from "./hooks/useSlots";
import { groupSlotsByWATDay } from "./utils/groupSlots";

export default function App() {
  const { slots, isInitialLoad, error, retry } = useSlots();

  // Keep derived state purely calculated from the raw slots array
  const groupedSlots = useMemo(() => groupSlotsByWATDay(slots), [slots]);

  return (
    <main className="p-4 max-w-md mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">Clinic Appointments</h1>

      {isInitialLoad && <p className="text-gray-500">Loading slots...</p>}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
          <p className="mb-2">
            <strong>Error:</strong> {error.message}
          </p>
          <button
            onClick={retry}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {!isInitialLoad && !error && (
        <div className="space-y-6">
          {groupedSlots.map((group) => (
            <div key={group.dateKey} className="border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {group.dateHeading}
              </h2>
              <p className="text-gray-600">
                {group.slots.length} available{" "}
                {group.slots.length === 1 ? "slot" : "slots"}
              </p>
            </div>
          ))}

          {groupedSlots.length === 0 && (
            <p className="text-gray-500">No appointments found.</p>
          )}
        </div>
      )}
    </main>
  );
}
