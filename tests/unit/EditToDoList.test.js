import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import EditToDoList from '../../src/components/ToDoList/EditToDoList'
import React from 'react'

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: () => ({ id: '123' }),
}))

// Mock ToastContainer to prevent errors during tests
jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: {
    error: jest.fn(),
    info: jest.fn(),
  },
}))

/**
 * Test suite for the EditToDoList component.
 */
describe('EditToDoList', () => {
  const navigate = jest.fn()
   /**
   * Clears all mocks and sets up fetch mock and useNavigate mock before each test.
   */
  beforeEach(() => {
    jest.clearAllMocks()
    window.fetch = jest.fn()
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(navigate)
  })

  /**
   * Restores fetch mock and clears localStorage after each test.
   */
  afterEach(() => {
    window.fetch.mockRestore()
    localStorage.clear()
  })

  /**
   * Renders the EditToDoList component wrapped in Router and ToastContainer.
   *
   * @returns {Promise<import('@testing-library/react').RenderResult>} The render result.
   */
  const renderComponent = async () => {
    let utils
    await act(async () => {
      utils = render(
        <Router>
          <ToastContainer />
          <EditToDoList />
        </Router>
      )
    })
    return utils
  }

  /**
   * Tests retrieving and displaying task details.
   */
  it('retrieves and displays the task details', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        task: 'Test Task',
        isCompleted: false,
      }),
    })

    const { getByPlaceholderText } = await renderComponent()

    await waitFor(() => {
      expect(getByPlaceholderText('Update task').value).toBe('Test Task')
    })
  })

   /**
   * Tests updating the task successfully.
   */
  it('updates the task successfully', async () => {
    window.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          task: 'Updated Task',
          isCompleted: false,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
      })

    const { getByPlaceholderText, getByRole } = await renderComponent()

    fireEvent.change(getByPlaceholderText('Update task'), { target: { value: 'Updated Task' } })

    fireEvent.click(getByRole('button', { name: /update task/i }))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://cscloud7-95.lnu.se/petsee/pet/todolist/edit/123',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ task: 'Updated Task', isCompleted: false }),
        })
      )
      expect(navigate).toHaveBeenCalledWith('/todolist')
    })
  })

  /**
   * Tests deleting the task successfully.
   */
  it('deletes the task successfully', async () => {
    window.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          task: 'Test Task',
          isCompleted: false,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
      })

    const { getByRole } = await renderComponent()

    fireEvent.click(getByRole('button', { name: /delete task/i }))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://cscloud7-95.lnu.se/petsee/pet/todolist/edit/123',
        expect.objectContaining({
          method: 'DELETE',
        })
      )
      expect(navigate).toHaveBeenCalledWith('/todolist')
    })
  })

  /**
   * Tests handling of failed task retrieval.
   */
  it('handles failed task retrieval', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: false,
    })

    await renderComponent()

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to fetch task')
    })
  })

   /**
   * Tests handling of failed task update.
   */
  it('handles failed task update', async () => {
    window.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          task: 'Updated Task',
          isCompleted: false,
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
      })

    const { getByPlaceholderText, getByRole } = await renderComponent()

    fireEvent.change(getByPlaceholderText('Update task'), { target: { value: 'Updated Task' } })

    fireEvent.click(getByRole('button', { name: /update task/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to update task')
    })
  })

   /**
   * Tests handling of failed task deletion.
   */
  it('handles failed task deletion', async () => {
    window.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          task: 'Test Task',
          isCompleted: false,
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
      })

    const { getByRole } = await renderComponent()

    fireEvent.click(getByRole('button', { name: /delete task/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to delete task')
    })
  })
})
