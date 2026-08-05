import { WAT_TIME_ZONE } from "../constants/time";

const watDateKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: WAT_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const watDayHeadingFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: WAT_TIME_ZONE,
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const watTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: WAT_TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function getWATDateKey(utcIsoString: string): string {
  const date = new Date(utcIsoString);
  return watDateKeyFormatter.format(date);
}

export function formatDayHeading(utcIsoString: string): string {
  const date = new Date(utcIsoString);
  return watDayHeadingFormatter.format(date);
}

export function formatSlotTime(utcIsoString: string): string {
  const date = new Date(utcIsoString);
  return watTimeFormatter.format(date);
}

/**
 * Converts WAT calendar date picker values (YYYY-MM-DD) into UTC ISO 8601 instants
 * suitable for API filtering via fetchSlots({ from, to }).
 *
 * @param watStartDate User selected start date in WAT (e.g., "2026-09-07")
 * @param watEndDate User selected end date in WAT (e.g., "2026-09-07")
 * @returns Object containing inclusive 'from' and exclusive 'to' UTC ISO strings
 */
export function watDateToUtcRange(
  watStartDate?: string,
  watEndDate?: string,
): { from?: string; to?: string } {
  let from: string | undefined;
  let to: string | undefined;

  // Convert WAT start-of-day (00:00:00 WAT) to UTC instant
  if (watStartDate) {
    const [year, month, day] = watStartDate.split("-").map(Number);
    const utcMs = Date.UTC(year, month - 1, day) - 1 * 60 * 60 * 1000;
    from = formatToCleanUtcIso(new Date(utcMs));
  }

  // Convert WAT end-of-day (00:00:00 WAT of next day) to UTC instant for exclusive upper bound
  if (watEndDate) {
    const [year, month, day] = watEndDate.split("-").map(Number);
    const utcMs = Date.UTC(year, month - 1, day + 1) - 1 * 60 * 60 * 1000;
    to = formatToCleanUtcIso(new Date(utcMs));
  }

  return { from, to };
}

function formatToCleanUtcIso(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}
