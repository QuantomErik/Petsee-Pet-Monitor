/**
 * Registers a new user with the provided user data.
 *
 * @async
 * @param {Object} userData - The user data for registration.
 * @param {string} userData.username - The username of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password of the user.
 * @throws {Error} Throws an error if the username, email, or password is missing.
 * @throws {Error} Throws an error if the registration fails.
 * @returns {Promise<Object>} The response data from the registration API.
 */
export async function registerUser(userData) {
    if (!userData.username) {
      throw new Error('Username is required')
    }
    if (!userData.email) {
      throw new Error('Email is required')
    }
    if (!userData.password) {
      throw new Error('Password is required')
    }
  
    const response = await fetch('https://cscloud7-95.lnu.se/petsee/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Registration failed');
    }
    return response.json()
  }
  