# AI-USAGE.md

## Overview of AI Usage

For this exercise, I used Gemini as a collaborative pair-programming assistant. Rather than attempting a "zero-shot" prompt to generate the entire application at once, I deliberately drove the development incrementally. I used the AI to generate boilerplate, scaffold stateless Tailwind UI components, and bounce architectural ideas around. However, I maintained strict control over the application's design, state flow, and timezone logic, treating the AI as a junior developer whose work needed review.

## What Was Changed, Rejected, or Rewritten

While the AI accelerated the typing process, its initial architectural decisions often prioritized immediate convenience over long-term maintainability. I actively rejected or rewrote several of its proposals:

- **Architectural Pivot (Hooks):** The AI initially proposed splitting state across multiple hooks (`useFetchSlots` and `useBookSlot`). I rejected this because booking a slot changes the underlying slot list. I rewrote the architecture to use a single `useSlots` hook to maintain a strict, single source of truth and avoid state desynchronization.
- **Component Responsibilities & Derived State:** The AI initially suggested grouping the slots inside the `SlotList` component itself and storing the grouped result in React state. I rewrote this to keep the grouping logic as a pure utility function (`groupSlotsByWATDay`) and wrapped it in a `useMemo` at the top level, keeping the UI components strictly presentational.
- **Composition Layer (`App.tsx`) Cleanup:** When assembling the final app, the AI embedded raw JSX for the conflict error banner directly into `App.tsx` and overloaded the loading states. I conducted a PR-style review to force the extraction of `ConflictBanner` and `RefreshingIndicator`, ensuring `App.tsx` remained a clean, thin composition root.
- **Performance Refinements:** I had to intervene when the AI's initial component wiring caused the entire list of slots to re-render on every search keystroke. I directed the AI to wrap the hook's callbacks in `useCallback` and the `SlotCard` in `React.memo` to fix the rendering bottleneck.

## Where the AI Failed and How I Corrected It

The AI produced incorrect, incomplete, or suboptimal code in a few specific instances that required my direct correction:

1. **Missing Domain Data Context**

- _The Issue:_ When generating the initial TypeScript interfaces, the AI relied solely on `mock-api.js` and guessed the shape of a `Slot`. It completely missed the `durationMinutes` property.
- _The Correction:_ I noticed this by comparing the types against the raw dataset. I provided the `slots.json` file and instructed the AI to strictly map the exact data structure rather than inventing properties.

2. **Hallucinated Components**

- _The Issue:_ During the UI composition phase, the AI confidently generated `App.tsx` referencing a `<FilterBar/>` component, but it had completely forgotten to actually write or provide the code for `FilterBar.tsx`.
- _The Correction:_ I caught this oversight during the integration phase. Because the AI hallucinated a component we hadn't defined yet, I had to pause the composition step and explicitly spec out the `FilterBar` to ensure the inputs were correctly controlled and accessible before moving forward.

3. **Suboptimal Asynchronous UX**

- _The Issue:_ The AI's first draft of the `useSlots` hook successfully fetched data, but it lacked search debouncing, blocked the whole UI during single-slot bookings, and wiped the screen to show a loader during refetches.
- _The Correction:_ I rejected the draft and provided explicit UX requirements. I guided it to implement a 300ms debounce, track `bookingSlotId` to isolate loading states to the clicked button, and split the loading state into `isInitialLoad` and `isRefetching` to keep existing data visible while background fetching.
