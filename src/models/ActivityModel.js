// src/models/DietProfileModel.js

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const activitySchema = new mongoose.Schema({
    type: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    intensity: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
})

activitySchema.add(BASE_SCHEMA)

export const ActivityModel = mongoose.model('ActivityDetails', activitySchema)
