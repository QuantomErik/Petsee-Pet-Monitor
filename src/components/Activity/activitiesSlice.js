import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchActivitiess = createAsyncThunk(
    'activitiess/fetchActivitiess',
    async ({ petId, date }) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${petId}/activitydetails?date=${date}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        if (!response.ok) throw new Error('Failed to fetch activities')
        const data = await response.json()
        return data.activities
    }
)


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

