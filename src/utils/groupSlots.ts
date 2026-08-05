import type { Slot, DayGroup } from "../types/slot";
import { getWATDateKey, formatDayHeading } from "./dateUtils";

/**
 * Pure function to sort slots chronologically and group them by their WAT calendar day.
 *
 * @param slots Raw array of Slot objects from the API
 * @returns Array of DayGroup objects, sorted chronologically by day
 */
export function groupSlotsByWATDay(slots: Slot[]): DayGroup[] {
  const sortedSlots = [...slots].sort((a, b) =>
    a.startUtc.localeCompare(b.startUtc),
  );

  // Group the sorted slots by their WAT date key (YYYY-MM-DD)
  const grouped = sortedSlots.reduce<Record<string, DayGroup>>((acc, slot) => {
    const dateKey = getWATDateKey(slot.startUtc);

    if (!acc[dateKey]) {
      acc[dateKey] = {
        dateKey,
        dateHeading: formatDayHeading(slot.startUtc),
        slots: [],
      };
    }

    acc[dateKey].slots.push(slot);
    return acc;
  }, {});

  // Convert the grouped dictionary back into an array and ensure the days are sorted
  return Object.values(grouped).sort((a, b) =>
    a.dateKey.localeCompare(b.dateKey),
  );
}
