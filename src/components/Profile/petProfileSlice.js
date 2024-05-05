import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching pets
export const fetchPets = createAsyncThunk('pets/fetchPets', async () => {
    const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/pet/petdetails', {
    headers: { 'Authorization': `Bearer ${token}` },
})
  const data = await response.json();
  return data;
});

// Slice definition
const petsSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPets.fulfilled, (state, action) => {
      state.loading = false;
      state.pets = action.payload;
    });
    builder.addCase(fetchPets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export default petsSlice.reducer;
