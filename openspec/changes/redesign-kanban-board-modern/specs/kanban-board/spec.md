## REMOVED Requirements

### Requirement: Board view with columns and cards
**Reason**: Column set changes (Por hacer/En progreso/Revisión/Hecho replaces Ideas/Esta semana/En curso/En espera/Hecho) and the WIP-limit indicator is dropped in the redesign.
**Migration**: See the new "Kanban board columns and cards" requirement below for the current column set and behavior.

The system SHALL display tasks grouped into ordered columns (Ideas, Esta semana, En curso, En espera, Hecho), each showing its cards and a count of visible cards.

#### Scenario: Board renders seeded columns and cards
- **WHEN** the app loads
- **THEN** the board shows the five columns in order, each populated with its sample cards

#### Scenario: Column reports a WIP limit
- **WHEN** a column configured with a WIP limit (En curso) has more cards than the limit
- **THEN** the column displays an over-limit indicator

### Requirement: Card summary information
**Reason**: Cards now carry multiple free-form tags instead of one, and drop the subtask progress bar, comment/file counters, and thumbnail — the redesign has no subtask/notes/attachment model.
**Migration**: See the new "Card summary fields" requirement below.

Each card SHALL display its category tag, priority, title, subtask completion (as a progress bar and "done/total" label), assignee initials, due date, and counts of comments and file attachments.

#### Scenario: Card shows progress
- **WHEN** a card has 2 of 5 subtasks marked done
- **THEN** the card's progress bar reflects 40% and its label reads "2/5"

### Requirement: Drag-and-drop between columns
**Reason**: Drag-and-drop is upgraded to insert at a precise dropped-on position (including reordering within a column); the previous "always prepend to target column" behavior and the drop-target column highlight are dropped in the redesign.
**Migration**: See the new "Drag-and-drop card placement" requirement below.

The system SHALL let a user move a card from one column to another via drag-and-drop, inserting the moved card into the target column.

#### Scenario: Card moved to another column
- **WHEN** a user drags a card and drops it on a different column
- **THEN** the card is removed from its original column and appears in the target column

#### Scenario: Column highlights while dragging over it
- **WHEN** a user drags a card over a column
- **THEN** that column is visually highlighted as the drop target until the drag leaves or completes

### Requirement: Add a card to a column
**Reason**: The inline per-column composer is replaced by the create/edit modal (see ADDED Requirement: Task create/edit modal), which is used for both creating and editing cards.
**Migration**: Use the "+ Nueva tarea" header button or a column's "+ Añadir tarea" button to open the create modal.

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
**Reason**: The side drawer (subtasks checklist, notes, advance/delete actions) is replaced by the create/edit modal. The new design has no subtask or notes model.
**Migration**: Click a card to open the edit modal; use its "Eliminar" action to delete, or drag the card to another column instead of an "advance" button.

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
**Reason**: The priority filter buttons (Alta/Media/Baja) are removed from the header in the redesign; priority is only set per-card via the modal. Superseded by "Search filtering" below, which keeps the search behavior alone.
**Migration**: Use the search box to filter by text; there is no header priority filter control.

The system SHALL let a user filter visible cards by a free-text search (matching title, tag, or assignee) and by priority (Alta, Media, Baja), applied consistently across the board and list views.

#### Scenario: Search narrows visible cards
- **WHEN** a user types text into the search box
- **THEN** only cards whose title, tag, or assignee match the text (case-insensitively) remain visible in both views

#### Scenario: Priority filter toggles
- **WHEN** a user clicks a priority filter that is already active
- **THEN** the priority filter is cleared and all priorities are shown again

### Requirement: List view
**Reason**: The redesign offers only the board view; the table/list view is dropped.
**Migration**: None — use the board view.

The system SHALL offer a list view showing all filtered cards in a single table with columns for task, status, tag, priority, due date, and progress.

#### Scenario: Switching to list view
- **WHEN** a user switches from board to list view
- **THEN** the same filtered set of cards is shown as table rows, each row's status reflecting its column

## ADDED Requirements

### Requirement: Kanban board columns and cards
The system SHALL display tasks grouped into ordered columns (Por hacer, En progreso, Revisión, Hecho), each showing its cards and a count of visible cards.

#### Scenario: Board renders seeded columns and cards
- **WHEN** the app loads
- **THEN** the board shows the four columns in order, each populated with its sample cards

### Requirement: Card summary fields
Each card SHALL display its tags (one or more, each rendered as a colored chip), priority, title, assignee (name and an initials avatar), and due date.

#### Scenario: Card shows its tags
- **WHEN** a card has multiple tags
- **THEN** each tag renders as its own chip on the card

### Requirement: Drag-and-drop card placement
The system SHALL let a user move a card by dragging it and dropping it on another card or on a column, inserting the moved card at the dropped-on position (before the card it was dropped on, or at the end of the column when dropped on the column itself) — including reordering within the same column.

#### Scenario: Card moved to a specific position in another column
- **WHEN** a user drags a card and drops it on a specific card in a different column
- **THEN** the moved card is removed from its original column and inserted immediately before the card it was dropped on

#### Scenario: Card reordered within its own column
- **WHEN** a user drags a card and drops it on another card in the same column
- **THEN** the dragged card moves to that position within the column without changing column

### Requirement: Search filtering
The system SHALL let a user filter visible cards by a free-text search matching title, tags, or assignee name.

#### Scenario: Search narrows visible cards
- **WHEN** a user types text into the search box
- **THEN** only cards whose title, any tag, or assignee name match the text (case-insensitively) remain visible

### Requirement: Task create/edit modal
The system SHALL let a user create a new card or edit an existing one through a modal with fields for title, description, tags, column, priority, assignee, and due date, and SHALL let a user delete a card from the edit modal.

#### Scenario: Creating a task
- **WHEN** a user opens the create modal (via the header's "+ Nueva tarea" or a column's "+ Añadir tarea"), enters a title, and saves
- **THEN** a new card with the entered fields is added to the selected column and the modal closes

#### Scenario: Editing a task
- **WHEN** a user clicks an existing card, changes one or more fields in the opened modal, and saves
- **THEN** the card is updated with the new field values and the modal closes

#### Scenario: Deleting a task from the modal
- **WHEN** a user opens an existing card's edit modal and clicks its delete action
- **THEN** the card is removed from its column and the modal closes

#### Scenario: Closing without saving
- **WHEN** a user opens the modal and clicks "Cancelar" or clicks outside the modal (the overlay) without clicking "Guardar"
- **THEN** the modal closes and no field changes are applied

#### Scenario: Discarding an empty new task
- **WHEN** a user opens the create modal and clicks "Guardar" without entering a title
- **THEN** the modal closes and no card is created
