import { DayGroup } from "./DayGroup";
import { EmptyState } from "./EmptyState";
import type { DayGroup as DayGroupType } from "../types/slot";

interface SlotListProps {
  groupedSlots: DayGroupType[];
  onBook: (id: string) => void;
  bookingSlotId: string | null;
}

export const SlotList: React.FC<SlotListProps> = ({
  groupedSlots,
  onBook,
  bookingSlotId,
}) => {
  if (groupedSlots.length === 0) {
    return <EmptyState />;
  }

  return (
    <div role="feed" aria-busy={bookingSlotId !== null}>
      {groupedSlots.map((group) => (
        <DayGroup
          key={group.dateKey}
          group={group}
          onBook={onBook}
          bookingSlotId={bookingSlotId}
        />
      ))}
    </div>
  );
};
