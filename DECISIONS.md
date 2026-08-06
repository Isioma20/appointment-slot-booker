# DECISIONS.md

- **Centralized State Orchestration (`useSlots`):** I chose to consolidate all fetching, filtering, and booking logic into a single `useSlots` hook rather than splitting responsibilities or introducing Context.
  - _Tradeoff:_ While this makes the hook slightly larger, it guarantees a strict single source of truth. It perfectly prevents desynchronized UI states—such as a booking succeeding but the underlying list failing to update—without requiring heavy external state management libraries.

- **Native Timezone Boundary Math:** To adhere to the strict "no date libraries" constraint, I encapsulated all WAT-to-UTC conversions inside pure utility functions using `Intl.DateTimeFormat` and native `Date` offset calculations.
  - _Tradeoff:_ Manual timezone math is verbose. While it handles this specific WAT (UTC+1) requirement reliably, calculating bounds via manual millisecond subtraction lacks the robust edge-case safety of a library like `date-fns-tz` if the clinic were to ever expand into timezones that observe Daylight Saving Time.

- **UX Terminology vs. Data Model Parity:** I intentionally designed the presentation layer to map the backend's `held` status to the word "Taken" (and "Unavailable" for screen readers) in the UI.
  - _Tradeoff:_ This introduces a minor lexical discrepancy between the frontend components and the API contract. However, I prioritized patient-facing clarity; "Taken" communicates a permanent, unbookable state much more effectively than "held," which can erroneously imply a temporary reservation.

- **Stale Request Protection via Refs:** I implemented a `fetchIdRef` counter to protect against race conditions during debounced server-side searches, ensuring that if a slow request resolves after a fast request, the UI does not show stale data.
  - _Tradeoff:_ While this completely solves the visual race condition, it is technically imperfect because the stale network requests still complete in the background, consuming bandwidth.

- **With Another Week of Development:**
  - **Optimistic UI:** I would implement optimistic updates on the booking action to instantly disable the target slot upon click, hiding the simulated 2000ms latency and making the app feel incredibly snappy, only rolling back if a `ConflictError` is caught.
  - **Request Cancellation:** I would upgrade the debounce logic to use a native `AbortController`, genuinely canceling in-flight fetch requests instead of just ignoring their delayed responses.
  - **URL State Synchronization:** I would sync the filter state (dates and search query) to the URL search parameters. This would allow patients to bookmark or share specific searches and ensure they don't lose their place if the page reloads.
