import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/**
 * Async thunk to fetch activities for a specific pet on a specific date.
 *
 * @function
 * @param {Object} params - Parameters for fetching activities.
 * @param {string} params.petId - The ID of the pet.
 * @param {string} params.date - The date for which to fetch activities.
 * @returns {Promise<Array>} The fetched activities.
 */
export const fetchActivitiess = createAsyncThunk(
    'activitiess/fetchActivitiess',
    async ({ petId, date }) => {
        const token = localStorage.getItem('token')
        /* const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${petId}/activitydetails?date=${date}`, { */
        /* const response = await fetch(`https://cscloud7-95.lnu.se/petsee/api/${petId}/activitydetails?date=${date}`, { */
           const response = await fetch(`https://erikyang.se/petsee/api/${petId}/activitydetails?date=${date}`, {
            
            headers: { 'Authorization': `Bearer ${token}` },
        })
        if (!response.ok) throw new Error('Failed to fetch activities')
        const data = await response.json()
        return data.activities
    }
)


/**
 * Slice for managing activities state.
 *
 * @redux
 * @property {Array} activities - The list of activities.
 * @property {boolean} isLoading - Loading state for fetching activities.
 * @property {string|null} error - Error message if fetching activities fails.
 * @property {Array} activitiesForWeek - Placeholder for future implementation.
 */
const activitiesSlice = createSlice({
    name: 'activities',
    initialState: {
        activities: [],
        isLoading: false,
        error: null,
        activitiesForWeek: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivitiess.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchActivitiess.fulfilled, (state, action) => {
                state.activities = action.payload
                state.isLoading = false
            })
            .addCase(fetchActivitiess.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})

export default activitiesSlice.reducer

