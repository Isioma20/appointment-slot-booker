import { useSlots } from "./hooks/useSlots";

export default function App() {
  const { slots, isInitialLoad, error, retry } = useSlots();

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
        <div className="bg-green-50 text-green-800 p-4 rounded-md">
          <p>
            Loaded <strong>{slots.length}</strong> slots.
          </p>
        </div>
      )}
    </main>
  );
}
