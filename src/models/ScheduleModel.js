// src/models/DietProfileModel.js

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const scheduleSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    note: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

scheduleSchema.add(BASE_SCHEMA)

export const ScheduleModel = mongoose.model('ScheduleDetails', scheduleSchema)
