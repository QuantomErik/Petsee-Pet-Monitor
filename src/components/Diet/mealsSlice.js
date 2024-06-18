import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


/**
 * Async thunk to fetch meals for a specific pet on a specific date.
 *
 * @function
 * @param {Object} params - Parameters for fetching meals.
 * @param {string} params.petId - The ID of the pet.
 * @param {string} params.date - The date for which to fetch meals.
 * @returns {Promise<Array>} The fetched meals.
 */
export const fetchMeals = createAsyncThunk('meals/fetchMeals', async ({ petId, date}) => {
    const token = localStorage.getItem('token')
    /* const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${petId}/dietdetails?date=${date}`, { */
    const response = await fetch(`https://erikyang.se/petsee/api/${petId}/dietdetails?date=${date}`, {
        headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!response.ok) throw new Error('Failed to fetch meals')
    const data = await response.json()
    return data.meals
})


/**
 * Slice for managing meals state.
 *
 * @redux
 * @property {Array} meals - The list of meals.
 * @property {boolean} isLoading - Loading state for fetching meals.
 * @property {string|null} error - Error message if fetching meals fails.
 */
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
                state.meals = action.payload
                state.isLoading = false
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})

export default mealsSlice.reducer
