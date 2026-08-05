/**
 * mock-api.js — provided by us. DO NOT MODIFY THIS FILE.
 *
 * This simulates a real backend: variable latency, occasional failures,
 * and booking conflicts. Treat it exactly as you would a production API
 * you do not control.
 *
 * Usage:
 *   import { fetchSlots, bookSlot, ApiError, ConflictError } from './mock-api';
 */

import data from './slots.json';

// In-memory copy so bookings persist for the session (resets on page reload).
let slots = data.slots.map((s) => ({ ...s }));

const FAILURE_RATE = 0.25;
const MIN_LATENCY_MS = 100;
const MAX_LATENCY_MS = 2000;

export class ApiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomLatency = () =>
  MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS);

/**
 * Fetch appointment slots.
 *
 * @param {Object}  [params]
 * @param {string}  [params.query]  Case-insensitive substring match on clinician
 *                                  name. Filtering happens HERE, on the server.
 *                                  Do not filter the returned list again on the client.
 * @param {string}  [params.from]    ISO 8601 instant. Inclusive lower bound on startUtc.
 * @param {string}  [params.to]      ISO 8601 instant. Exclusive upper bound on startUtc.
 * @returns {Promise<{ slots: Array, fetchedAt: string }>}
 * @throws  {ApiError} roughly 25% of the time.
 */
export async function fetchSlots({ query = '', from, to } = {}) {
  await wait(randomLatency());

  if (Math.random() < FAILURE_RATE) {
    throw new ApiError('Upstream timeout while reading availability.');
  }

  const q = query.trim().toLowerCase();
  const result = slots.filter((s) => {
    if (q && !s.clinician.toLowerCase().includes(q)) return false;
    if (from && s.startUtc < from) return false;
    if (to && s.startUtc >= to) return false;
    return true;
  });

  return {
    slots: result.map((s) => ({ ...s })),
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Book a slot.
 *
 * @param {string} slotId
 * @returns {Promise<{ slot: Object, confirmationCode: string }>}
 * @throws  {ApiError}      roughly 25% of the time (transient — retrying may succeed).
 * @throws  {ConflictError} if the slot is already held, and also at random roughly
 *                          10% of the time, simulating another patient booking it
 *                          a moment before you did. Retrying will NOT help.
 */
export async function bookSlot(slotId) {
  await wait(randomLatency());

  if (Math.random() < FAILURE_RATE) {
    throw new ApiError('Upstream timeout while confirming booking.');
  }

  const slot = slots.find((s) => s.id === slotId);
  if (!slot) {
    throw new ApiError(`No such slot: ${slotId}`);
  }
  if (slot.status === 'held') {
    throw new ConflictError('That slot is no longer available.');
  }
  if (Math.random() < 0.1) {
    slot.status = 'held';
    throw new ConflictError('That slot was just taken by another patient.');
  }

  slot.status = 'held';
  return {
    slot: { ...slot },
    confirmationCode: `CNF-${slotId.slice(-3)}-${Math.floor(Math.random() * 9000 + 1000)}`,
  };
}

/** Test helper: restore all slots to their original state. */
export function __resetSlots() {
  slots = data.slots.map((s) => ({ ...s }));
}
