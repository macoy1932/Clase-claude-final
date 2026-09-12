import { useRef, useState } from 'react'
import './App.css'

const DARK_MODE_STORAGE_KEY = 'kanban-dark-mode'

const TAG_PALETTE_LIGHT = [
  { bg: 'oklch(0.7 0.16 300 / 0.16)', fg: 'oklch(0.5 0.2 300)' },
  { bg: 'oklch(0.7 0.16 250 / 0.16)', fg: 'oklch(0.5 0.2 250)' },
  { bg: 'oklch(0.7 0.16 190 / 0.18)', fg: 'oklch(0.45 0.15 190)' },
  { bg: 'oklch(0.7 0.16 140 / 0.18)', fg: 'oklch(0.42 0.15 140)' },
  { bg: 'oklch(0.75 0.17 70 / 0.2)', fg: 'oklch(0.45 0.16 70)' },
  { bg: 'oklch(0.7 0.2 25 / 0.16)', fg: 'oklch(0.5 0.22 25)' },
]
const TAG_PALETTE_DARK = [
  { bg: 'oklch(0.4 0.13 300 / 0.35)', fg: 'oklch(0.85 0.1 300)' },
  { bg: 'oklch(0.4 0.13 250 / 0.35)', fg: 'oklch(0.85 0.1 250)' },
  { bg: 'oklch(0.4 0.13 190 / 0.35)', fg: 'oklch(0.85 0.1 190)' },
  { bg: 'oklch(0.4 0.13 140 / 0.35)', fg: 'oklch(0.85 0.1 140)' },
  { bg: 'oklch(0.45 0.14 70 / 0.35)', fg: 'oklch(0.85 0.1 70)' },
  { bg: 'oklch(0.4 0.16 25 / 0.35)', fg: 'oklch(0.85 0.12 25)' },
]
const AVATAR_PALETTE = [
  'oklch(0.62 0.23 300)',
  'oklch(0.62 0.2 250)',
  'oklch(0.68 0.18 190)',
  'oklch(0.65 0.17 140)',
  'oklch(0.72 0.18 70)',
  'oklch(0.62 0.22 25)',
]
const PRIORITY_META = {
  Alta: { bg: 'oklch(0.62 0.24 25)', fg: '#fff' },
  Media: { bg: 'oklch(0.78 0.18 70)', fg: 'oklch(0.32 0.1 70)' },
  Baja: { bg: 'oklch(0.72 0.15 165)', fg: 'oklch(0.28 0.08 165)' },
}

function hashStr(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}
function initials(name) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '?'
}
function tagChip(tag, dark) {
  const palette = dark ? TAG_PALETTE_DARK : TAG_PALETTE_LIGHT
  return palette[hashStr(tag) % palette.length]
}
function avatarColor(name) {
  return AVATAR_PALETTE[hashStr(name) % AVATAR_PALETTE.length]
}

function buildTheme(dark) {
  return dark
    ? {
        pageBg: 'oklch(0.19 0.015 260)',
        textPrimary: 'oklch(0.95 0.005 250)',
        textSecondary: 'oklch(0.68 0.02 260)',
        textMuted: 'oklch(0.58 0.02 260)',
        panelBg: 'oklch(0.24 0.015 260)',
        cardBg: 'oklch(0.27 0.015 260)',
        cardBorder: 'oklch(0.33 0.015 260)',
        cardHoverBorder: 'oklch(0.4 0.02 260)',
        inputBg: 'oklch(0.24 0.015 260)',
        inputBorder: 'oklch(0.35 0.015 260)',
        badgeBg: 'oklch(0.3 0.015 260)',
        modalBg: 'oklch(0.22 0.015 260)',
        overlayBg: 'oklch(0.08 0.01 260 / 0.6)',
        addHover: 'oklch(0.32 0.015 260)',
        cancelBg: 'oklch(0.24 0.015 260)',
      }
    : {
        pageBg: 'oklch(0.97 0.01 250)',
        textPrimary: 'oklch(0.22 0.02 260)',
        textSecondary: 'oklch(0.5 0.02 260)',
        textMuted: 'oklch(0.6 0.02 260)',
        panelBg: 'oklch(0.955 0.008 250)',
        cardBg: '#fff',
        cardBorder: 'oklch(0.93 0.008 250)',
        cardHoverBorder: 'oklch(0.88 0.01 250)',
        inputBg: '#fff',
        inputBorder: 'oklch(0.88 0.01 250)',
        badgeBg: '#fff',
        modalBg: '#fff',
        overlayBg: 'oklch(0.15 0.01 260 / 0.45)',
        addHover: 'oklch(0.92 0.01 250)',
        cancelBg: '#fff',
      }
}

function themeVars(theme) {
  return {
    '--t-page-bg': theme.pageBg,
    '--t-text-primary': theme.textPrimary,
    '--t-text-secondary': theme.textSecondary,
    '--t-text-muted': theme.textMuted,
    '--t-panel-bg': theme.panelBg,
    '--t-card-bg': theme.cardBg,
    '--t-card-border': theme.cardBorder,
    '--t-card-hover-border': theme.cardHoverBorder,
    '--t-input-bg': theme.inputBg,
    '--t-input-border': theme.inputBorder,
    '--t-badge-bg': theme.badgeBg,
    '--t-modal-bg': theme.modalBg,
    '--t-overlay-bg': theme.overlayBg,
    '--t-add-hover': theme.addHover,
    '--t-cancel-bg': theme.cancelBg,
  }
}

function card(id, title, desc, tags, assigneeName, due, priority) {
  return { id, title, desc, tags, assignee: { name: assigneeName }, due, priority }
}

const INITIAL_COLUMNS = [
  {
    id: 'todo',
    name: 'Por hacer',
    accent: 'oklch(0.62 0.23 300)',
    cards: [
      card(1, 'Diseñar sistema de notificaciones', '', ['Diseño', 'UX'], 'Marta Ríos', '18 sep', 'Media'),
      card(2, 'Investigar proveedor de pagos', '', ['Backend'], 'Luis Peña', '22 sep', 'Baja'),
    ],
  },
  {
    id: 'doing',
    name: 'En progreso',
    accent: 'oklch(0.62 0.2 250)',
    cards: [
      card(3, 'Integrar API de autenticación', '', ['Backend', 'API'], 'Sofía Díaz', '15 sep', 'Alta'),
      card(4, 'Rediseñar onboarding móvil', '', ['Frontend', 'Diseño'], 'Carlos Vega', '19 sep', 'Media'),
    ],
  },
  {
    id: 'review',
    name: 'Revisión',
    accent: 'oklch(0.75 0.19 70)',
    cards: [card(5, 'Corregir bug de sincronización', '', ['Bug', 'API'], 'Ana Ortiz', '13 sep', 'Alta')],
  },
  {
    id: 'done',
    name: 'Hecho',
    accent: 'oklch(0.7 0.16 165)',
    cards: [card(6, 'Configurar CI/CD', '', ['DevOps'], 'Diego Ruiz', '10 sep', 'Baja')],
  },
]

function App() {
  const [darkMode, setDarkModeState] = useState(() => {
    try {
      return localStorage.getItem(DARK_MODE_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [search, setSearch] = useState('')
  const [cols, setCols] = useState(INITIAL_COLUMNS)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [modalColumnId, setModalColumnId] = useState(null)
  const [draftCard, setDraftCard] = useState(null)
  const dragInfoRef = useRef(null)
  const uidRef = useRef(100)

  function toggleDark() {
    setDarkModeState((prev) => {
      const next = !prev
      try {
        localStorage.setItem(DARK_MODE_STORAGE_KEY, String(next))
      } catch {
        /* localStorage may be unavailable (private mode, disabled storage) */
      }
      return next
    })
  }

  function moveCard(toColId, toIndex) {
    const info = dragInfoRef.current
    if (!info) return
    setCols((prev) => {
      const columns = prev.map((c) => ({ ...c, cards: [...c.cards] }))
      const fromCol = columns.find((c) => c.id === info.fromCol)
      const idx = fromCol.cards.findIndex((c) => c.id === info.cardId)
      if (idx === -1) return prev
      const [moved] = fromCol.cards.splice(idx, 1)
      const toCol = columns.find((c) => c.id === toColId)
      let insertAt = toIndex
      if (fromCol.id === toCol.id && idx < insertAt) insertAt -= 1
      insertAt = Math.max(0, Math.min(insertAt, toCol.cards.length))
      toCol.cards.splice(insertAt, 0, moved)
      return columns
    })
    dragInfoRef.current = null
  }

  function openCreate(colId) {
    setModalMode('create')
    setModalColumnId(colId)
    setDraftCard({ id: null, title: '', desc: '', tagsText: '', assigneeName: '', due: '', priority: 'Media' })
    setModalOpen(true)
  }

  function openEdit(colId, cardId) {
    const col = cols.find((c) => c.id === colId)
    const found = col.cards.find((c) => c.id === cardId)
    setModalMode('edit')
    setModalColumnId(colId)
    setDraftCard({ ...found, tagsText: found.tags.join(', '), assigneeName: found.assignee.name })
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setDraftCard(null)
  }

  function updateDraftField(field, value) {
    setDraftCard((prev) => ({ ...prev, [field]: value }))
  }

  function saveModal() {
    const title = draftCard.title.trim()
    if (!title) {
      closeModal()
      return
    }
    const tags = draftCard.tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    const assigneeName = draftCard.assigneeName.trim() || 'Sin asignar'
    const built = {
      id: draftCard.id ?? uidRef.current++,
      title,
      desc: draftCard.desc || '',
      tags,
      assignee: { name: assigneeName },
      due: draftCard.due || 'Sin fecha',
      priority: draftCard.priority,
    }
    setCols((prev) => {
      let columns = prev.map((c) => ({ ...c, cards: [...c.cards] }))
      if (modalMode === 'edit') {
        columns = columns.map((c) => ({ ...c, cards: c.cards.filter((cd) => cd.id !== built.id) }))
      }
      const target = columns.find((c) => c.id === modalColumnId)
      target.cards.push(built)
      return columns
    })
    setModalOpen(false)
    setDraftCard(null)
  }

  function deleteModal() {
    const id = draftCard.id
    setCols((prev) => prev.map((c) => ({ ...c, cards: c.cards.filter((cd) => cd.id !== id) })))
    setModalOpen(false)
    setDraftCard(null)
  }

  const theme = buildTheme(darkMode)
  const q = search.trim().toLowerCase()
  function matches(c) {
    if (!q) return true
    return (
      c.title.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q)) ||
      c.assignee.name.toLowerCase().includes(q)
    )
  }

  const visibleCols = cols.map((col) => {
    const cardsRaw = col.cards.filter(matches)
    return { ...col, visible: cardsRaw, isEmpty: cardsRaw.length === 0 }
  })

  const columnOptions = cols.map((c) => ({ id: c.id, name: c.name }))

  return (
    <div className="kb2-app" style={themeVars(theme)}>
      <header className="kb2-header">
        <div className="kb2-brand">
          <div className="kb2-logo">
            <div className="kb2-logo-dot" />
          </div>
          <div>
            <div className="kb2-brand-title">Proyecto Aurora</div>
            <div className="kb2-brand-sub">Tablero de gestión de tareas</div>
          </div>
        </div>
        <div className="kb2-actions">
          <div className="kb2-search-wrap">
            <input
              type="text"
              className="kb2-search-input"
              placeholder="Buscar tareas, etiquetas, personas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="kb2-search-icon" />
          </div>
          <button type="button" className="kb2-theme-btn" title="Cambiar tema" onClick={toggleDark}>
            <div className="kb2-theme-dot" />
          </button>
          <button type="button" className="kb2-new-btn" onClick={() => openCreate(cols[0].id)}>
            + Nueva tarea
          </button>
        </div>
      </header>

      <div className="kb2-board">
        {visibleCols.map((col) => (
          <div
            key={col.id}
            className="kb2-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              moveCard(col.id, col.cards.length)
            }}
          >
            <div className="kb2-column-header">
              <div className="kb2-column-title-wrap">
                <div className="kb2-column-dot" style={{ background: col.accent }} />
                <div className="kb2-column-name">{col.name}</div>
              </div>
              <div className="kb2-column-count">{col.visible.length}</div>
            </div>

            <div className="kb2-column-body">
              {col.visible.map((c, idx) => {
                const chips = c.tags.map((t) => ({ label: t, ...tagChip(t, darkMode) }))
                const prio = PRIORITY_META[c.priority] || PRIORITY_META.Media
                return (
                  <div
                    key={c.id}
                    draggable
                    className="kb2-card"
                    onDragStart={() => {
                      dragInfoRef.current = { cardId: c.id, fromCol: col.id }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      moveCard(col.id, idx)
                    }}
                    onClick={() => openEdit(col.id, c.id)}
                  >
                    <div className="kb2-card-tags">
                      {chips.map((chip) => (
                        <div key={chip.label} className="kb2-chip" style={{ background: chip.bg, color: chip.fg }}>
                          {chip.label}
                        </div>
                      ))}
                    </div>
                    <div className="kb2-card-title">{c.title}</div>
                    <div className="kb2-card-footer">
                      <div className="kb2-card-assignee">
                        <div className="kb2-avatar" style={{ background: avatarColor(c.assignee.name) }}>
                          {initials(c.assignee.name)}
                        </div>
                        <div className="kb2-due">{c.due}</div>
                      </div>
                      <div className="kb2-priority" style={{ background: prio.bg, color: prio.fg }}>
                        {c.priority}
                      </div>
                    </div>
                  </div>
                )
              })}
              {col.isEmpty && <div className="kb2-empty-state">Sin tareas</div>}
            </div>

            <button type="button" className="kb2-add-btn" onClick={() => openCreate(col.id)}>
              + Añadir tarea
            </button>
          </div>
        ))}
      </div>

      {modalOpen && draftCard && (
        <div className="kb2-overlay" onClick={closeModal}>
          <div className="kb2-modal" onClick={(e) => e.stopPropagation()}>
            <div className="kb2-modal-title">{modalMode === 'edit' ? 'Editar tarea' : 'Nueva tarea'}</div>

            <div className="kb2-field">
              <div className="kb2-field-label">Título</div>
              <input
                type="text"
                className="kb2-input"
                placeholder="Nombre de la tarea"
                value={draftCard.title}
                onChange={(e) => updateDraftField('title', e.target.value)}
              />
            </div>

            <div className="kb2-field">
              <div className="kb2-field-label">Descripción</div>
              <textarea
                className="kb2-textarea"
                rows={3}
                placeholder="Detalles de la tarea"
                value={draftCard.desc}
                onChange={(e) => updateDraftField('desc', e.target.value)}
              />
            </div>

            <div className="kb2-row">
              <div className="kb2-field">
                <div className="kb2-field-label">Columna</div>
                <select className="kb2-select" value={modalColumnId} onChange={(e) => setModalColumnId(e.target.value)}>
                  {columnOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="kb2-field">
                <div className="kb2-field-label">Prioridad</div>
                <select
                  className="kb2-select"
                  value={draftCard.priority}
                  onChange={(e) => updateDraftField('priority', e.target.value)}
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
            </div>

            <div className="kb2-row">
              <div className="kb2-field">
                <div className="kb2-field-label">Responsable</div>
                <input
                  type="text"
                  className="kb2-input"
                  placeholder="Nombre"
                  value={draftCard.assigneeName}
                  onChange={(e) => updateDraftField('assigneeName', e.target.value)}
                />
              </div>
              <div className="kb2-field">
                <div className="kb2-field-label">Fecha límite</div>
                <input
                  type="text"
                  className="kb2-input"
                  placeholder="Ej: 20 sep"
                  value={draftCard.due}
                  onChange={(e) => updateDraftField('due', e.target.value)}
                />
              </div>
            </div>

            <div className="kb2-field">
              <div className="kb2-field-label">Etiquetas (separadas por coma)</div>
              <input
                type="text"
                className="kb2-input"
                placeholder="Frontend, Bug, API"
                value={draftCard.tagsText}
                onChange={(e) => updateDraftField('tagsText', e.target.value)}
              />
            </div>

            <div className="kb2-modal-footer">
              {modalMode === 'edit' && (
                <button type="button" className="kb2-btn-delete" onClick={deleteModal}>
                  Eliminar
                </button>
              )}
              <div className="kb2-modal-actions">
                <button type="button" className="kb2-btn-cancel" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="button" className="kb2-btn-save" onClick={saveModal}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
