import { Selector } from 'testcafe'

/**
 * Generates a unique username for testing.
 *
 * @returns {string} The generated unique username.
 */
const generateUniqueUsername = () => `testuser${new Date().getTime()}${Math.floor(Math.random() * 1000)}`

/**
 * Generates a unique email address for testing.
 *
 * @returns {string} The generated unique email address.
 */
const generateUniqueEmail = () => `testuser${new Date().getTime()}${Math.floor(Math.random() * 1000)}@example.com`

fixture `User Registration`
  .page `http://localhost:5173/petsee/register`


/**
 * Tests if the registration page loads correctly and all input fields are present.
 */
test('should load the registration page and find the input fields', async t => {
  await t
    .expect(Selector('input[name="username"]').exists).ok()
    .expect(Selector('input[name="email"]').exists).ok()
    .expect(Selector('input[name="password"]').exists).ok()
    .expect(Selector('button[type="submit"]').exists).ok()
})

/**
 * Tests the registration of a new user with unique credentials.
 */
test('should register a new user successfully', async t => {
  const uniqueUsername = generateUniqueUsername()
  const uniqueEmail = generateUniqueEmail()

  console.log(`Testing with username: ${uniqueUsername} and email: ${uniqueEmail}`)

  await t
    .typeText(Selector('input[name="username"]'), uniqueUsername)
    .typeText(Selector('input[name="email"]'), uniqueEmail)
    .typeText(Selector('input[name="password"]'), 'password123')
    .click(Selector('button[type="submit"]'))
})

/**
 * Tests if an error is shown when the username is missing during registration.
 */
test('should show an error when username is missing', async t => {
  await t
    .typeText(Selector('input[name="email"]'), generateUniqueEmail())
    .typeText(Selector('input[name="password"]'), 'password123')
    .click(Selector('button[type="submit"]'))
    .expect(Selector('.mb-4.text-red-500').innerText).contains('Username is required', { timeout: 10000 })
})

/**
 * Tests if an error is shown when the email is missing during registration.
 */
test('should show an error when email is missing', async t => {
  await t
    .typeText(Selector('input[name="username"]'), generateUniqueUsername())
    .typeText(Selector('input[name="password"]'), 'password123')
    .click(Selector('button[type="submit"]'))
    .expect(Selector('.mb-4.text-red-500').innerText).contains('Email is required', { timeout: 10000 })
})

/**
 * Tests if an error is shown when the password is missing during registration.
 */
test('should show an error when password is missing', async t => {
  await t
    .typeText(Selector('input[name="username"]'), generateUniqueUsername())
    .typeText(Selector('input[name="email"]'), generateUniqueEmail())
    .click(Selector('button[type="submit"]'))
    .expect(Selector('.mb-4.text-red-500').innerText).contains('Password is required', { timeout: 10000 })
})
