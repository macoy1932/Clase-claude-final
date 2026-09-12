## Purpose

Provides a single-user personal kanban board as the app's main screen, letting a person organize tasks across workflow columns, track subtask progress, and filter or search their board, entirely in Spanish.

## ADDED Requirements

### Requirement: Board view with columns and cards
The system SHALL display tasks grouped into ordered columns (Ideas, Esta semana, En curso, En espera, Hecho), each showing its cards and a count of visible cards.

#### Scenario: Board renders seeded columns and cards
- **WHEN** the app loads
- **THEN** the board shows the five columns in order, each populated with its sample cards

#### Scenario: Column reports a WIP limit
- **WHEN** a column configured with a WIP limit (En curso) has more cards than the limit
- **THEN** the column displays an over-limit indicator

### Requirement: Card summary information
Each card SHALL display its category tag, priority, title, subtask completion (as a progress bar and "done/total" label), assignee initials, due date, and counts of comments and file attachments.

#### Scenario: Card shows progress
- **WHEN** a card has 2 of 5 subtasks marked done
- **THEN** the card's progress bar reflects 40% and its label reads "2/5"

### Requirement: Drag-and-drop between columns
The system SHALL let a user move a card from one column to another via drag-and-drop, inserting the moved card into the target column.

#### Scenario: Card moved to another column
- **WHEN** a user drags a card and drops it on a different column
- **THEN** the card is removed from its original column and appears in the target column

#### Scenario: Column highlights while dragging over it
- **WHEN** a user drags a card over a column
- **THEN** that column is visually highlighted as the drop target until the drag leaves or completes

### Requirement: Add a card to a column
The system SHALL let a user open an inline composer on a column, type a title, and add it as a new card at the top of that column.

#### Scenario: New card added via composer
- **WHEN** a user opens a column's composer, types a title, and confirms (via button or pressing Enter without Shift)
- **THEN** a new card with that title is added to the top of the column and the composer closes

#### Scenario: Composer cancelled
- **WHEN** a user cancels the composer (via button or Escape) without confirming
- **THEN** no card is added and the composer closes

#### Scenario: Empty column placeholder
- **WHEN** a column has no cards matching the current filters and its composer is closed
- **THEN** the column shows an empty-state placeholder instead of a card list

### Requirement: Card detail panel
The system SHALL let a user open a card to see a detail panel with its full metadata, a subtasks checklist, and notes, and take actions from it.

#### Scenario: Opening a card shows its details
- **WHEN** a user clicks a card (on the board or in the list view)
- **THEN** a detail panel opens showing the card's status/column, priority, assignee, due date, estimate, subtasks, and notes

#### Scenario: Toggling a subtask
- **WHEN** a user clicks a subtask in the open card's checklist
- **THEN** that subtask's done state toggles and the card's progress updates accordingly

#### Scenario: Advancing a card
- **WHEN** a user clicks the advance action on an open card that is not in the last column
- **THEN** the card moves to the next column and the panel's advance label reflects the following column's name

#### Scenario: Deleting a card
- **WHEN** a user clicks the delete action on an open card
- **THEN** the card is removed from its column and the detail panel closes

### Requirement: Search and priority filtering
The system SHALL let a user filter visible cards by a free-text search (matching title, tag, or assignee) and by priority (Alta, Media, Baja), applied consistently across the board and list views.

#### Scenario: Search narrows visible cards
- **WHEN** a user types text into the search box
- **THEN** only cards whose title, tag, or assignee match the text (case-insensitively) remain visible in both views

#### Scenario: Priority filter toggles
- **WHEN** a user clicks a priority filter that is already active
- **THEN** the priority filter is cleared and all priorities are shown again

### Requirement: List view
The system SHALL offer a list view showing all filtered cards in a single table with columns for task, status, tag, priority, due date, and progress.

#### Scenario: Switching to list view
- **WHEN** a user switches from board to list view
- **THEN** the same filtered set of cards is shown as table rows, each row's status reflecting its column

### Requirement: Light/dark theme toggle
The system SHALL let a user switch between light and dark themes, and SHALL remember the chosen theme across page reloads.

#### Scenario: Theme persists after reload
- **WHEN** a user switches to dark theme and reloads the page
- **THEN** the app loads in dark theme
