/* import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchActivitiess = createAsyncThunk('activitiess/fetchActivitiess', async ({ petId, date }, { getState }) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${petId}/activitydetails?date=${date}`, {
        headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!response.ok) throw new Error('Failed to fetch activities')
    const data = await response.json()
    return data
})

// Creating the slice
const activitiesSlice = createSlice({
    name: 'activities',
    initialState: {
        activities: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivitiess.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchActivitiess.fulfilled, (state, action) => {
                state.activities = action.payload.activities
                state.isLoading = false
            })
            .addCase(fetchActivitiess.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})

export default activitiesSlice.reducer
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk for fetching activities from the server
export const fetchActivitiess = createAsyncThunk(
    'activitiess/fetchActivitiess',
    async ({ petId, date }, { getState }) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${petId}/activitydetails?date=${date}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
        if (!response.ok) throw new Error('Failed to fetch activities')
        const data = await response.json()
        return data.activities
    }
)

/* export const fetchActivitiesForWeek = createAsyncThunk(
    'activities/fetchActivitiesForWeek',
    async ({ petId, date }) => {
        const token = localStorage.getItem('token')
        const endDate = new Date().toISOString().split('T')[0]
        const startDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]
        const url = `https://cscloud7-95.lnu.se/petsee/pet/${petId}/activitydetails?date=${date}&startDate=${startDate}&endDate=${endDate}`
        console.log('Fetching activities for week with URL:', url)

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        if (!response.ok) throw new Error('Failed to fetch activities')

        const data = await response.json()
        console.log('Activities for week fetched:', data)
        return data.activities
    }
) */


export const fetchActivitiesForWeek = createAsyncThunk(
    'activities/fetchActivitiesForWeek',
    async ({ petId, startDate, endDate, date }) => {
        const token = localStorage.getItem('token')
        const formattedStartDate = startDate.toISOString().split('T')[0]
        const formattedEndDate = endDate.toISOString().split('T')[0]
        
        const url = `https://cscloud7-95.lnu.se/petsee/pet/${petId}/activitydetails?date=${date}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
        console.log('Fetching activities for week with URL:', url)

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        if (!response.ok) throw new Error('Failed to fetch activities')

        const data = await response.json()
        console.log('Activities for week fetched:', data)
        return data.activities
    }
)
/* export const fetchActivitiesForWeek = createAsyncThunk(
    'activities/fetchActivitiesForWeek',
    async ({ petId, date }) => {
      const token = localStorage.getItem('token')
      const endDate = new Date().toISOString().split('T')[0]
      const startDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]
      const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${petId}/activitydetails?date=${date}&startDate=${startDate}&endDate=${endDate}`, {
      const response = await fetch(`https://cscloud7-95.lnu.se/petsee/pet/${petId}/activitydetails?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) throw new Error('Failed to fetch activities')
      const data = await response.json()
      console.log('Activities for week fetched:', data)
      return data.activities
    }
  ) */


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
            .addCase(fetchActivitiesForWeek.pending, (state) => {
                state.isLoading = true
                state.error = null
                console.log('Fetching activities for week: pending')
            })
            .addCase(fetchActivitiesForWeek.fulfilled, (state, action) => {
                state.isLoading = false
                state.activitiesForWeek = action.payload
                console.log('Fetching activities for week: fulfilled', action.payload)
            })
            .addCase(fetchActivitiesForWeek.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
                console.log('Fetching activities for week: rejected', action.error.message)
            })
    },
})

export default activitiesSlice.reducer

