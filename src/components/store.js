import { configureStore } from '@reduxjs/toolkit'
import mealsReducer from './Diet/mealsSlice.js'
import petsReducer from './Profile/petProfileSlice.js'

export const store = configureStore({
    reducer: {
        meals: mealsReducer,
        pets: petsReducer,
    },
})