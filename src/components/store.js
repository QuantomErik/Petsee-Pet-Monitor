import { configureStore } from '@reduxjs/toolkit'
import mealsReducer from './Diet/mealsSlice.js'

export const store = configureStore({
    reducer: {
        meals: mealsReducer,
    },
});