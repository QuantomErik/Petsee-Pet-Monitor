// src/models/DietProfileModel.js

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

/* const nutrientSchema = new mongoose.Schema({
    CrudeProtein: Number,
    FatContent: Number,
    CrudeAsh: Number,
    CrudeFibre: Number,
    Moisture: Number,
    Calcium: Number,
    Phosphorus: Number,
    Omega3FattyAcids: Number,
    Omega6FattyAcids: Number
}) */

/* const mealSchema = new mongoose.Schema({
    mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
    time: { type: String, required: true },
    nutrients: nutrientSchema,
    quantity: Number,
    totalCalories: Number
}) */

/* const mealSchema = new mongoose.Schema({
    mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
    time: { type: String, required: true },
    quantity: Number,
    totalCalories: Number,
    nutrients: nutrientSchema
}) */


/* const dietProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    meals: [mealSchema],
   mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
   time: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalCalories: { type: Number, required: true },
    name: {type: String, required: true}
}) */

const dietProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
    mealType: { type: String, required: true },
    time: { type: String/* , required: true */ },
    quantity: { type: Number, required: true },
    totalCalories: { type: Number, required: true },
    selectedBrand: { type: String, required: true }
})

/* const mealSchema = new mongoose.Schema({
    mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
    time: { type: String, required: true }
})

const dietProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    meals: [mealSchema],
    quantity: { type: Number, required: true },
    totalCalories: { type: Number, required: true },
    nutrients: { 
        protein: Number,
        fat: Number,
        carbs: Number,
        moisture: Number
    }
}) */

/* const dietProfileSchema = new mongoose.Schema({
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
}) */

dietProfileSchema.add(BASE_SCHEMA)

export const DietModel = mongoose.model('DietDetails', dietProfileSchema)
