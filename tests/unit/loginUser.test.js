import { loginUser } from '../../src/components/Login/LoginUser.js'

window.fetch = jest.fn()

/**
 * Test suite for the loginUser function.
 */
describe('loginUser', () => {
  const mockSetFlashMessage = jest.fn()
  const mockSetShowFlash = jest.fn()

  /**
   * Clears the fetch mock and mock functions before each test.
   */
  beforeEach(() => {
    fetch.mockClear()
    mockSetFlashMessage.mockClear()
    mockSetShowFlash.mockClear()
  })

   /**
   * Tests successful user login.
   */
  it('logs in a user successfully', async () => {
    const mockResponse = {
      accessToken: 'fakeAccessToken'
    }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    })

    const credentials = { username: 'testuser', password: 'password123' }
    const response = await loginUser(credentials, mockSetFlashMessage, mockSetShowFlash)
    
    expect(response).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith('https://cscloud7-95.lnu.se/petsee/login', expect.any(Object))
  })

   /**
   * Tests handling of incorrect password.
   */
  it('handles incorrect password', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ message: 'Incorrect password' }),
    })

    const credentials = { username: 'testuser', password: 'wrongpassword' }
    await expect(loginUser(credentials, mockSetFlashMessage, mockSetShowFlash)).rejects.toThrow('Incorrect password')
  })

   /**
   * Tests handling of non-existent username.
   */
  it('handles non-existent username', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: "The username doesn't exist" }),
    })

    const credentials = { username: 'nonexistentuser', password: 'password123' }
    await expect(loginUser(credentials, mockSetFlashMessage, mockSetShowFlash)).rejects.toThrow("The username doesn't exist")
  })

   /**
   * Tests handling of other login failures.
   */
  it('handles other login failures', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ message: 'Invalid login' }),
    })

    const credentials = { username: 'testuser', password: 'password123' }
    await expect(loginUser(credentials, mockSetFlashMessage, mockSetShowFlash)).rejects.toThrow('Invalid login')
  })
})
