import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App.jsx'

function columnDiv(name) {
  return screen.getByText(name).closest('.kb2-column')
}

function cardDiv(title) {
  return screen.getByText(title).closest('.kb2-card')
}

function dragCardOnto(cardTitle, targetElement) {
  const source = cardDiv(cardTitle)
  fireEvent.dragStart(source)
  fireEvent.dragOver(targetElement)
  fireEvent.drop(targetElement)
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('Kanban board columns and cards', () => {
  it('renders the four columns in order, each with its seeded cards', () => {
    render(<App />)
    const names = ['Por hacer', 'En progreso', 'Revisión', 'Hecho']
    for (const name of names) {
      expect(screen.getByText(name)).toBeInTheDocument()
    }

    expect(within(columnDiv('Por hacer')).getByText('Diseñar sistema de notificaciones')).toBeInTheDocument()
    expect(within(columnDiv('En progreso')).getByText('Integrar API de autenticación')).toBeInTheDocument()
    expect(within(columnDiv('Revisión')).getByText('Corregir bug de sincronización')).toBeInTheDocument()
    expect(within(columnDiv('Hecho')).getByText('Configurar CI/CD')).toBeInTheDocument()
  })
})

describe('Card summary fields', () => {
  it('renders each tag as its own chip', () => {
    render(<App />)
    const card = cardDiv('Diseñar sistema de notificaciones')
    expect(within(card).getByText('Diseño')).toBeInTheDocument()
    expect(within(card).getByText('UX')).toBeInTheDocument()
  })
})

describe('Drag-and-drop card placement', () => {
  it('moves a card into another column, inserted before the card it was dropped on', () => {
    render(<App />)
    dragCardOnto('Investigar proveedor de pagos', cardDiv('Integrar API de autenticación'))

    expect(within(columnDiv('Por hacer')).queryByText('Investigar proveedor de pagos')).not.toBeInTheDocument()
    const doingCards = within(columnDiv('En progreso')).getAllByText(
      /Investigar proveedor de pagos|Integrar API de autenticación/,
    )
    expect(doingCards[0]).toHaveTextContent('Investigar proveedor de pagos')
    expect(doingCards[1]).toHaveTextContent('Integrar API de autenticación')
  })

  it('reorders a card within its own column when dropped on another card there', () => {
    render(<App />)
    dragCardOnto('Rediseñar onboarding móvil', cardDiv('Integrar API de autenticación'))

    const doingCards = within(columnDiv('En progreso')).getAllByText(
      /Integrar API de autenticación|Rediseñar onboarding móvil/,
    )
    expect(doingCards[0]).toHaveTextContent('Rediseñar onboarding móvil')
    expect(doingCards[1]).toHaveTextContent('Integrar API de autenticación')
  })
})

describe('Search filtering', () => {
  it('narrows visible cards by title, tag, or assignee name', async () => {
    const user = userEvent.setup()
    render(<App />)
    const search = screen.getByPlaceholderText('Buscar tareas, etiquetas, personas...')

    await user.type(search, 'pagos')
    expect(screen.getByText('Investigar proveedor de pagos')).toBeInTheDocument()
    expect(screen.queryByText('Configurar CI/CD')).not.toBeInTheDocument()

    await user.clear(search)
    await user.type(search, 'devops')
    expect(screen.getByText('Configurar CI/CD')).toBeInTheDocument()
    expect(screen.queryByText('Investigar proveedor de pagos')).not.toBeInTheDocument()

    await user.clear(search)
    await user.type(search, 'marta')
    expect(screen.getByText('Diseñar sistema de notificaciones')).toBeInTheDocument()
    expect(screen.queryByText('Configurar CI/CD')).not.toBeInTheDocument()
  })
})

describe('Task create/edit modal', () => {
  it('creates a task with the entered fields in the selected column', async () => {
    const user = userEvent.setup()
    render(<App />)
    const addButtons = screen.getAllByRole('button', { name: '+ Añadir tarea' })
    await user.click(addButtons[2])

    await user.type(screen.getByPlaceholderText('Nombre de la tarea'), 'Nueva tarea de prueba')
    await user.type(screen.getByPlaceholderText('Frontend, Bug, API'), 'QA, Prioridad')
    await user.type(screen.getByPlaceholderText('Nombre'), 'Lucía Fernández')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.queryByText('Nueva tarea')).not.toBeInTheDocument()
    const created = cardDiv('Nueva tarea de prueba')
    expect(within(columnDiv('Revisión')).getByText('Nueva tarea de prueba')).toBeInTheDocument()
    expect(within(created).getByText('QA')).toBeInTheDocument()
    expect(within(created).getByText('Prioridad')).toBeInTheDocument()
  })

  it('discards an empty new task when saved without a title', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getAllByRole('button', { name: '+ Añadir tarea' })[0])
    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.queryByText('Nueva tarea')).not.toBeInTheDocument()
    expect(screen.getAllByText('Diseñar sistema de notificaciones')).toHaveLength(1)
  })

  it('edits an existing task and reflects the new field values', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText('Corregir bug de sincronización'))

    const titleInput = screen.getByPlaceholderText('Nombre de la tarea')
    await user.clear(titleInput)
    await user.type(titleInput, 'Bug de sincronización resuelto')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.queryByText('Corregir bug de sincronización')).not.toBeInTheDocument()
    expect(screen.getByText('Bug de sincronización resuelto')).toBeInTheDocument()
  })

  it('deletes a task from the edit modal', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByText('Configurar CI/CD'))
    await user.click(screen.getByRole('button', { name: 'Eliminar' }))

    expect(screen.queryByText('Configurar CI/CD')).not.toBeInTheDocument()
    expect(screen.queryByText('Editar tarea')).not.toBeInTheDocument()
  })

  it('closes without applying changes via Cancelar or the overlay', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText('Configurar CI/CD'))
    const titleInput = screen.getByPlaceholderText('Nombre de la tarea')
    await user.clear(titleInput)
    await user.type(titleInput, 'Este cambio no debe guardarse')
    await user.click(screen.getByRole('button', { name: 'Cancelar' }))

    expect(screen.queryByText('Este cambio no debe guardarse')).not.toBeInTheDocument()
    expect(screen.getByText('Configurar CI/CD')).toBeInTheDocument()

    await user.click(screen.getByText('Configurar CI/CD'))
    fireEvent.click(document.querySelector('.kb2-overlay'))
    expect(screen.queryByText('Editar tarea')).not.toBeInTheDocument()
  })
})

describe('Theme toggle', () => {
  it('persists the chosen theme so a fresh mount keeps it', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)

    await user.click(screen.getByTitle('Cambiar tema'))
    expect(localStorage.getItem('kanban-dark-mode')).toBe('true')

    unmount()
    render(<App />)
    expect(screen.getByTitle('Cambiar tema')).toBeInTheDocument()
    expect(localStorage.getItem('kanban-dark-mode')).toBe('true')
  })
})
