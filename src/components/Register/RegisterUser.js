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
  