import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async (_, { getState }) => {
    const token = localStorage.getItem('token')
    const response = await fetch('https://cscloud7-95.lnu.se/petsee/pet/dietdetails', {
        headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!response.ok) throw new Error('Failed to fetch meals')
    const data = await response.json()
    return data
})

const mealsSlice = createSlice({
    name: 'meals',
    initialState: {
        meals: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeals.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchMeals.fulfilled, (state, action) => {
                state.meals = action.payload.meals
                state.isLoading = false
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})

export default mealsSlice.reducer