import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { isEqual } from 'lodash'


/**
 * Async thunk for fetching pets.
 *
 * @async
 * @function fetchPets
 * @returns {Promise<Array>} The fetched pets data.
 * @throws {Error} If the request fails.
 */
export const fetchPets = createAsyncThunk('pets/fetchPets', async () => {
    const token = localStorage.getItem('token')
    console.log('Fetching pets with token:', token)
   

  /* const response = await fetch('https://cscloud7-95.lnu.se/petsee/pet/petdetails', { */
  const response = await fetch('https://cscloud7-95.lnu.se/petsee/api/petdetails', {
    headers: { 'Authorization': `Bearer ${token}`,
  },
}).catch(err => console.error('Fetch error:', err))

if (!response.ok) {
  const responseBody = await response.text()
  console.error("HTTP error", response.status, responseBody)
  throw new Error("Failed to fetch pets. Status: " + response.status)
}

  const data = await response.json()
  console.log('Pets fetched:', data)
  return data
})

/**
 * Redux slice for managing pets state.
 *
 * @constant
 * @type {Slice}
 */
const petsSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    loading: false,
    error: null
  },
  reducers: {
    /**
     * Set the current pet.
     *
     * @function
     * @param {Object} state - The current state of the slice.
     * @param {Object} action - The action to set the current pet.
     */
    setCurrentPet: (state, action) => {
      state.currentPet = action.payload
  },

  /**
     * Reset the current pet.
     *
     * @function
     * @param {Object} state - The current state of the slice.
     */
  resetCurrentPet: (state) => {
      state.currentPet = null
  }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPets.pending, (state) => {
      state.loading = true
    })

    builder.addCase(fetchPets.fulfilled, (state, action) => {
      if (!isEqual(state.pets, action.payload)) {
          state.pets = action.payload
          console.log('Updated pets state:', state.pets)
      }
      state.loading = false
  })
   
    builder.addCase(fetchPets.rejected, (state, action) => {
      console.error("Error fetching pets:", action.error.message)
      state.loading = false
      state.error = action.error.message
    })
  }
})

export const { setCurrentPet, resetCurrentPet } = petsSlice.actions

export default petsSlice.reducer
