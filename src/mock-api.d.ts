import type { Slot } from "./types/slot";

export interface FetchSlotsParams {
  query?: string;
  from?: string;
  to?: string;
}

export interface FetchSlotsResponse {
  slots: Slot[];
}

export interface BookSlotResponse {
  slot: Slot;
  confirmationCode: string;
}

export class ApiError extends Error {
  name: "ApiError";
}

export class ConflictError extends Error {
  name: "ConflictError";
}

export function fetchSlots(
  params?: FetchSlotsParams,
): Promise<FetchSlotsResponse>;

export function bookSlot(slotId: string): Promise<BookSlotResponse>;
