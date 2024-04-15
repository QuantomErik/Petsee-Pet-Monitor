// src/models/DietProfileModel.js

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const dietProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dietType: {
        type: String,
        required: true,
        trim: true,
    },
    caloriesPerDay: {
        type: Number,
        required: true,
    },
    meals: [{
        type: Number,
        required: true,
    }],
    foodType: {
        type: String,
        required: true,
    },
    feedingTime: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})

dietProfileSchema.add(BASE_SCHEMA)

export const DietModel = mongoose.model('DietDetails', dietProfileSchema)
