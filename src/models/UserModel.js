/**
 * @file Defines the User model.
 * @module UserModel
 * @author Erik Yang
 */

import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'
import bcrypt from 'bcryptjs'

// Create a schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 2000
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  permissionLevel: {
    type: Number,
    required: [true, 'Permission level is required.'],
    default: 1,
    enum: [
      1, // read
      2, // create
      3, // read and create
      4, // update
      5, // read and update
      6, // create and update
      8, // delete
      9, // read and delete
      10, // create and delete
      12, // update and delete
      15] // read, create, update and delete
  }
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

userSchema.add(BASE_SCHEMA)

/**
 * Authenticates a user based on the provided username and password.
 *
 * @memberof UserModel
 * @param {string} username - The username of the user to authenticate.
 * @param {string} password - The password of the user to authenticate.
 * @throws {Error} Throws an error if the login attempt is invalid.
 * @returns {Promise<object>} A promise that resolves to the authenticated user document.
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }

  return user
}

export const UserModel = mongoose.model('User', userSchema)
