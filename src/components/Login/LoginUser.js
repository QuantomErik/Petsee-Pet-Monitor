/**
 * Sends a login request to the server with the provided credentials.
 *
 * @async
 * @function
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.username - The username of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<Object>} The response data from the server.
 * @throws {Error} If the login request fails, an error is thrown with the message from the server.
 */
export async function loginUser(credentials) {
    const response = await fetch('https://cscloud7-95.lnu.se/petsee/api/login', {
   /* const response = await fetch('https://cscloud7-95.lnu.se/petsee/login', { */
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    if (response.ok) {
      return response.json()
    } else {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }
  }
  