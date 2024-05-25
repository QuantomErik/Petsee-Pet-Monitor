import { registerUser } from '../../src/components/Register/RegisterUser.js'

window.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Registration successful' }),
  })
)

describe('registerUser', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('registers a user successfully', async () => {
    const userData = { username: 'testuser', email: 'testuser@example.com', password: 'password123' }
    const response = await registerUser(userData)
    expect(response).toEqual({ message: 'Registration successful' })
    expect(fetch).toHaveBeenCalledWith('https://cscloud7-95.lnu.se/petsee/register', expect.any(Object))
  })

  it('throws an error when registration fails with a general message', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Registration failed' }),
      })
    )

    const userData = { username: 'testuser', email: 'testuser@example.com', password: 'password123' }
    await expect(registerUser(userData)).rejects.toThrow('Registration failed')
    expect(fetch).toHaveBeenCalledWith('https://cscloud7-95.lnu.se/petsee/register', expect.any(Object))
  })

  it('throws an error when registration fails with a specific error code', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Email already in use' }),
      })
    )

    const userData = { username: 'testuser', email: 'testuser@example.com', password: 'password123' }
    await expect(registerUser(userData)).rejects.toThrow('Email already in use')
    expect(fetch).toHaveBeenCalledWith('https://cscloud7-95.lnu.se/petsee/register', expect.any(Object))
  })

  it('throws an error when username is missing', async () => {
    const userData = { email: 'testuser@example.com', password: 'password123' }
    await expect(registerUser(userData)).rejects.toThrow('Username is required')
  })

  it('throws an error when email is missing', async () => {
    const userData = { username: 'testuser', password: 'password123' }
    await expect(registerUser(userData)).rejects.toThrow('Email is required')
  })

  it('throws an error when password is missing', async () => {
    const userData = { username: 'testuser', email: 'testuser@example.com' }
    await expect(registerUser(userData)).rejects.toThrow('Password is required')
  })
})



/* import { registerUser } from '../../src/components/Register/Register.jsx'

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Registration successful' }),
  })
)

describe('registerUser', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('registers a user successfully', async () => {
    const userData = { username: 'testuser', email: 'testuser@example.com', password: 'password123' }
    const response = await registerUser(userData)
    expect(response).toEqual({ message: 'Registration successful' })
    expect(fetch).toHaveBeenCalledWith('https://cscloud7-95.lnu.se/petsee/register', expect.any(Object))
  })

  it('throws an error when registration fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Registration failed' }),
      })
    )

    const userData = { username: 'testuser', email: 'testuser@example.com', password: 'password123' }
    await expect(registerUser(userData)).rejects.toThrow('Registration failed')
    expect(fetch).toHaveBeenCalledWith('https://cscloud7-95.lnu.se/petsee/register', expect.any(Object))
  })


  it('throws an error when username is missing', async () => {
    const userData = { email: 'testuser@example.com', password: 'password123' }
    await expect(registerUser(userData)).rejects.toThrow('Username is required')
  })

})
 */