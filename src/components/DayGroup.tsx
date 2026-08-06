import { SlotCard } from "./SlotCard";
import type { DayGroup as DayGroupType } from "../types/slot";

interface DayGroupProps {
  group: DayGroupType;
  onBook: (id: string) => void;
  bookingSlotId: string | null;
}

export const DayGroup: React.FC<DayGroupProps> = ({
  group,
  onBook,
  bookingSlotId,
}) => {
  const headingId = `heading-${group.dateKey}`;

  return (
    <section aria-labelledby={headingId} className="mb-10 last:mb-0">
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-2 mb-3 border-b border-gray-100 rounded-xl">
        <h2
          id={headingId}
          className="text-lg font-semibold text-gray-800 py-1 px-3"
        >
          {group.dateHeading}
        </h2>
      </header>

      <div className="space-y-3">
        {group.slots.map((slot) => (
          <SlotCard
            key={slot.id}
            slot={slot}
            onBook={onBook}
            isBooking={bookingSlotId === slot.id}
          />
        ))}
      </div>
    </section>
  );
};
