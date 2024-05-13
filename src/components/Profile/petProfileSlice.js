import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { isEqual } from 'lodash'


// Async thunk for fetching pets
export const fetchPets = createAsyncThunk('pets/fetchPets', async () => {
    const token = localStorage.getItem('token')
    console.log('Fetching pets with token:', token)
   
  /*   const response = await fetch('http://localhost:3000/petsee/pet/petdetails', { */
  const response = await fetch('https://cscloud7-95.lnu.se/petsee/pet/petdetails', {
   /*  method: 'GET', */
    headers: { 'Authorization': `Bearer ${token}`,
    /* 'Content-Type': 'application/json' */
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
  /* return data.pets */
})

// Slice definition
const petsSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    loading: false,
    error: null
  },
  reducers: {
    setCurrentPet: (state, action) => {
      state.currentPet = action.payload
  },
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
