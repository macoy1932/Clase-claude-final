## 1. Test tooling setup

- [x] 1.1 Add `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` as devDependencies and verify `npm install` succeeds
- [x] 1.2 Add a `test` block to `vite.config.js` (`environment: 'jsdom'`, `globals: true`, `setupFiles: ['./src/setupTests.js']`) and create `src/setupTests.js` importing `@testing-library/jest-dom`, verify `npx vitest --run` starts without config errors
- [x] 1.3 Add a `"test": "vitest run"` script to `package.json` and verify `npm test` executes (even with zero test files) and exits 0

## 2. Board and card rendering tests

- [x] 2.1 In `src/App.test.jsx`, test that the five columns render in order with their seeded cards, and verify Scenario: Board renders seeded columns and cards
- [x] 2.2 Test the "En curso" column's WIP badge switches to an over-limit state when its visible card count exceeds the limit, and verify Scenario: Column reports a WIP limit
- [x] 2.3 Test a card's progress bar/label reflect its done/total subtasks, and verify Scenario: Card shows progress

## 3. Drag-and-drop tests

- [x] 3.1 Test dragging a card from one column and dropping it on another moves the card (fired via `fireEvent.dragStart`/`drop` with a stub `dataTransfer`), and verify Scenario: Card moved to another column
- [x] 3.2 Test a column shows a drop-target highlight on `dragOver` and clears it on `dragLeave`, and verify Scenario: Column highlights while dragging over it

## 4. Composer and empty-state tests

- [x] 4.1 Test opening a column's composer, typing a title, and confirming with the "Añadir" button adds a new card to the top of that column, and verify Scenario: New card added via composer
- [x] 4.2 Test confirming the composer via Enter (no Shift) adds the card, and cancelling via the "Cancelar" button or Escape adds no card, and verify Scenario: Composer cancelled
- [x] 4.3 Test a column with no matching cards and a closed composer shows the empty-state placeholder, and verify Scenario: Empty column placeholder

## 5. Card detail panel tests

- [x] 5.1 Test clicking a card opens the detail panel with its status, priority, assignee, due date, estimate, subtasks, and notes, and verify Scenario: Opening a card shows its details
- [x] 5.2 Test clicking a subtask toggles its done state and updates the progress label, and verify Scenario: Toggling a subtask
- [x] 5.3 Test the advance action on a card not in the last column moves it to the next column and updates the button label; test it on a card in the last column, and verify Scenario: Advancing a card
- [x] 5.4 Test the delete action removes the card and closes the panel, and verify Scenario: Deleting a card

## 6. Search, priority filter, list view, and theme tests

- [x] 6.1 Test typing in the search box hides non-matching cards in both board and list views, and verify Scenario: Search narrows visible cards
- [x] 6.2 Test clicking an active priority filter clears it, and verify Scenario: Priority filter toggles
- [x] 6.3 Test switching to list view renders the same filtered cards as table rows with correct status column, and verify Scenario: Switching to list view
- [x] 6.4 Test toggling the theme button sets `data-theme` on `<html>` and persists it to `localStorage`, and reloading (re-mounting `App`) with that value stored keeps dark theme, and verify Scenario: Theme persists after reload

## 7. Verification

- [x] 7.1 Run `npm test` and verify all tests pass
- [x] 7.2 Run `npm run lint` and `npm run build` and verify both still succeed
