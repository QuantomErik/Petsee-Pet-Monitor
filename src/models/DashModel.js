/**
 * @file Defines the Dash model.
 * @module DashModel
 * @author Erik Yang
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

// Create a schema.
const schema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
    trim: true,
    minlength: 1
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  tags: [{
    type: String,
    trim: true
  }]
})

schema.add(BASE_SCHEMA)

// Create a model using the schema.
export const DashModel = mongoose.model('Dash', schema)
