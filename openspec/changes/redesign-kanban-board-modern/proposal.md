## Why

The user supplied a new reference design ("Panel kanban moderno.zip" / `Kanban Board.dc.html`) with a different, softer visual language (rounded cards, Poppins/Inter type, violet accent, oklch light/dark tokens) and a different interaction model (modal-based task create/edit instead of an inline composer + side drawer, precise drag-and-drop reordering by drop position, multiple free-form tag chips per card). This supersedes the "blueprint/wireframe" board from `add-kanban-board` with a modern redesign the user explicitly asked to apply.

## What Changes

- Replace the visual system: rounded cards/panels, Poppins (headings) + Inter (body) fonts, violet/purple accent, oklch-based light/dark theme tokens applied via inline styles instead of the previous blueprint/corner-bracket CSS custom properties.
- Replace column set: **Por hacer, En progreso, Revisión, Hecho** (4 columns) instead of the previous 5 (Ideas, Esta semana, En curso, En espera, Hecho). No WIP limit indicator.
- Replace card fields: multiple free-form tag chips (colored per tag, hashed palette) instead of a single tag; assignee shown as full name + initials avatar (hashed color) instead of initials-only; priority pill. **Drop** subtask progress bar/count, comment/file counters, and card thumbnail — the new design has no subtask/notes model.
- **BREAKING**: Replace the inline per-column composer and the card detail side drawer (with subtasks checklist, notes, advance/delete) with a single **create/edit modal** covering title, description, tags (comma-separated), column, priority, assignee, and due date, with delete available in edit mode and cancel/overlay-click to close without saving.
- **BREAKING**: Remove the priority filter buttons from the header (Alta/Media/Baja) — priority is set per-card via the modal only; the header keeps free-text search.
- **BREAKING**: Remove the list view toggle and table view — only the board view remains.
- Upgrade drag-and-drop to insert the card at the specific dropped-on position (reordering within a column, or at a precise index in another column), not just prepend to the target column.
- Keep the existing light/dark theme toggle behavior, including persistence across reloads (`localStorage`) — only its visual implementation changes.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `kanban-board`: column set and card fields change, the composer and card-detail drawer are replaced by a create/edit modal, drag-and-drop gains precise-position insertion, and the priority filter and list view are removed. Because the tool's validator requires a MODIFIED requirement to keep every scenario name its current spec has, requirements whose scenario set shrinks are expressed as REMOVED (old name, with Reason/Migration) + ADDED (new name): "Board view with columns and cards" → "Kanban board columns and cards", "Card summary information" → "Card summary fields", "Drag-and-drop between columns" → "Drag-and-drop card placement". See the delta spec for the full set of ADDED/REMOVED requirements.

## Impact

- `src/App.jsx`, `src/App.css`, `src/App.test.jsx`: rewritten to match the new design and interaction model; existing tests for the composer, drawer, WIP badge, and list view are replaced with tests for the modal and index-aware drag-and-drop.
- `index.html`: Google Fonts links swapped from Barlow/Barlow Condensed/IBM Plex Mono to Poppins/Inter.
- `src/index.css`: base tokens updated for the new palette (kept minimal; per-theme color tokens now live in `App.jsx` as before-decided in `add-kanban-board`'s single-component approach, now using oklch values).
