import { useState, useEffect, useCallback, useRef } from "react";
import { fetchSlots, bookSlot, ApiError, ConflictError } from "../mock-api";
import type { Slot } from "../types/slot";
import { watDateToUtcRange } from "../utils/dateUtils";

export function useSlots() {
  // Filter State
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [watStartDate, setWatStartDate] = useState<string>("");
  const [watEndDate, setWatEndDate] = useState<string>("");

  // Data and UI State
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  // Error, Success, and Action States
  const [error, setError] = useState<ApiError | null>(null);
  const [conflictError, setConflictError] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [bookingSlotId, setBookingSlotId] = useState<string | null>(null);

  // Ref to prevent race conditions during rapid filter changes
  const fetchIdRef = useRef(0);

  // --- Debounce Effect ---
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  // --- Core Fetching Logic ---
  const loadSlots = useCallback(async () => {
    const currentFetchId = ++fetchIdRef.current;

    setIsFetching(true);
    setError(null);
    setConflictError(null);
    setConfirmationCode(null);

    // Transform WAT calendar inputs to UTC ISO instants
    const { from, to } = watDateToUtcRange(watStartDate, watEndDate);

    try {
      const response = await fetchSlots({ query: debouncedQuery, from, to });

      if (currentFetchId === fetchIdRef.current) {
        setSlots(response.slots);
        setHasFetchedOnce(true);
      }
    } catch (err) {
      if (currentFetchId === fetchIdRef.current) {
        if (err instanceof ApiError) {
          setError(err);
        } else {
          console.error("Unexpected error fetching slots:", err);
        }
      }
    } finally {
      if (currentFetchId === fetchIdRef.current) {
        setIsFetching(false);
      }
    }
  }, [debouncedQuery, watStartDate, watEndDate]);

  // Reactively fetch data whenever the debounced query or dates change
  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  // --- Booking Logic ---
  const book = async (slotId: string) => {
    setError(null);
    setConflictError(null);
    setConfirmationCode(null);
    setBookingSlotId(slotId);

    try {
      const response = await bookSlot(slotId);
      setConfirmationCode(response.confirmationCode);

      // Update local state to reflect the successful booking
      setSlots((prev) =>
        prev.map((s) => (s.id === slotId ? response.slot : s)),
      );
    } catch (err) {
      if (err instanceof ConflictError) {
        setConflictError(err.message);

        // The slot was taken by someone else. Mutate local state so it becomes visibly held.
        setSlots((prev) =>
          prev.map((s) => (s.id === slotId ? { ...s, status: "held" } : s)),
        );
      } else if (err instanceof ApiError) {
        setError(err);
      } else {
        console.error("Unexpected error booking slot:", err);
      }
    } finally {
      setBookingSlotId(null);
    }
  };

  // Utility functions to dismiss alerts
  const clearSuccess = () => setConfirmationCode(null);
  const clearConflict = () => setConflictError(null);

  return {
    // Data & UI State
    slots,
    isInitialLoad: isFetching && !hasFetchedOnce,
    isRefetching: isFetching && hasFetchedOnce,
    error,
    conflictError,
    confirmationCode,
    bookingSlotId,

    // Filter State & Setters
    query,
    setQuery,
    watStartDate,
    setWatStartDate,
    watEndDate,
    setWatEndDate,

    // Actions
    retry: loadSlots,
    book,
    clearSuccess,
    clearConflict,
  };
}
