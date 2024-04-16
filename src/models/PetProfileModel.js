/**
 * @file Defines the User model.
 * @module PetProfileModel
 * @author Erik Yang
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'


// Create a schema.
const petProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  age: {
    type: String,
    required: true,
    trim: true,
  },
  weight: {
    type: String,
    required: true,
    trim: true,
  },
  length: {
    type: String,
    required: true,
    trim: true,
  },
  favouriteFood: {
    type: String,
    required: true,
    trim: true,
  },
  favouriteToy: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  medicalNotes: {
    type: String,
    required: true,
    trim: true,
  },
  animalType: {
    type: String,
    required: true,
    trim: true,
    enum: ['Dog', 'Cat', 'Bird', 'Hamster', 'Rabbit']  // Enum to restrict the animal types
},
  image: String,
})


petProfileSchema.add(BASE_SCHEMA)


export const PetProfileModel = mongoose.model('PetDetails', petProfileSchema)
