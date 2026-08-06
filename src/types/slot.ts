/**
  Base Domain Types
 */
export type SlotStatus = "open" | "held";
export type SlotMode = "in-person" | "virtual";

export interface Slot {
  id: string;
  startUtc: string;
  durationMinutes: number;
  clinician: string;
  mode: SlotMode;
  status: SlotStatus;
}

/**
 API Request/Response Types
 */
export interface FetchSlotsParams {
  query?: string;
  from?: string;
  to?: string;
}

export interface FetchSlotsResponse {
  slots: Slot[];
  fetchedAt: string;
}

export interface BookSlotResponse {
  slot: Slot;
  confirmationCode: string;
}

export interface DayGroup {
  dateKey: string;
  dateHeading: string;
  slots: Slot[];
}

/**
 Error Types
 */
export declare class ApiError extends Error {
  constructor(message: string);
  name: "ApiError";
}

export declare class ConflictError extends Error {
  constructor(message: string);
  name: "ConflictError";
}
