/**
 * @file  Provides helper methods for working with JSON Web Tokens (JWTs).
 * @module lib/JsonWebTokens
 * @author Erik Yang
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'
import fs from 'fs'

console.log('Reading private key from:', process.env.PRIVATE_KEY_PATH)

const privateKeyPath = process.env.PRIVATE_KEY_PATH || '/Users/eriky/OneDrive/Skrivbord/auth-service/private.pem'
const privateKey = fs.readFileSync(privateKeyPath, 'utf8')
const publicKey = fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf8')

/**
 * Exposes methods for working with JSON Web Tokens (JWTs).
 */
export class JsonWebToken {
  /**
   * Encodes user information into a JSON Web Token (JWT) payload.
   *
   * @param {object} user - The user object containing user information to encode.
   * @param {string|number} expiresIn - The expiration time for the JWT, specified in seconds or as a string describing a time span (e.g., '1d', '2h') using the vercel/ms library.
   * @returns {Promise<string>} A Promise that resolves to the generated JWT.
   */
  static async encodeUser (user, expiresIn) {
    const payload = {
      sub: user.id,
      email: user.email,
      permissionLevel: user.permissionLevel,
      username: user.username,
      password: user.password
    }

    console.log(payload)

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        privateKey,

        {
          algorithm: 'RS256',
          expiresIn: 12000000
        },
        (error, token) => {
          if (error) {
            reject(error)
            return
          }

          resolve(token)
        }
      )
    })
  }

  static async decodeUser (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (error, decoded) => {
        if (error) {
          reject(error)
          return
        }

        const user = {
          id: decoded.sub,
          email: decoded.email,
          permissionLevel: decoded.permissionLevel,
          username: decoded.username,
          password: decoded.password
        }

        resolve(user)
      })
    })
  }


}
