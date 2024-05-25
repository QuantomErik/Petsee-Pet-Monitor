export async function loginUser(credentials) {
    const response = await fetch('https://cscloud7-95.lnu.se/petsee/login', {
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
  