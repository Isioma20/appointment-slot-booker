import React from "react";
import type { Slot } from "../types/slot";
import { formatSlotTime } from "../utils/dateUtils";

interface SlotCardProps {
  slot: Slot;
  onBook: (id: string) => void;
  isBooking: boolean;
}

export const SlotCard: React.FC<SlotCardProps> = ({
  slot,
  onBook,
  isBooking,
}) => {
  const isHeld = slot.status === "held";
  const timeString = formatSlotTime(slot.startUtc);

  return (
    <article
      data-testid={`slot-card-${slot.id}`}
      className={`p-4 rounded-xl border transition-all ${
        isHeld
          ? "bg-gray-50 border-gray-200 opacity-60"
          : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Detail Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3
              className={`text-lg font-bold ${isHeld ? "text-gray-500" : "text-gray-900"}`}
            >
              {timeString}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                slot.mode === "virtual"
                  ? "bg-purple-50 text-purple-700 border border-purple-100"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-100"
              }`}
            >
              {slot.mode === "virtual" ? "Virtual" : "In-Person"}
            </span>
            {isHeld && (
              <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                Unavailable
              </span>
            )}
          </div>
          <p
            className={`text-sm ${isHeld ? "text-gray-400" : "text-gray-600"}`}
          >
            {slot.clinician}
          </p>
        </div>

        {/* Action Section */}
        <button
          onClick={() => onBook(slot.id)}
          disabled={isHeld || isBooking}
          data-testid={`book-button-${slot.id}`}
          aria-label={
            isHeld
              ? "Slot unavailable"
              : `Book appointment at ${timeString} with ${slot.clinician}`
          }
          className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-blue-500 ${
            isHeld
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white active:bg-blue-800"
          }`}
        >
          {isBooking ? "Booking..." : isHeld ? "Taken" : "Book"}
        </button>
      </div>
    </article>
  );
};
