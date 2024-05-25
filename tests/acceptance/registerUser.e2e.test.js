import { Selector } from 'testcafe'

// Function to generate a unique username and email address
const generateUniqueUsername = () => `testuser${new Date().getTime()}${Math.floor(Math.random() * 1000)}`
const generateUniqueEmail = () => `testuser${new Date().getTime()}${Math.floor(Math.random() * 1000)}@example.com`

fixture `User Registration`
  .page `http://localhost:5173/petsee/register`
  /* .page `https://cscloud7-95.lnu.se/petsee/register` */

test('should load the registration page and find the input fields', async t => {
  await t
    .expect(Selector('input[name="username"]').exists).ok()
    .expect(Selector('input[name="email"]').exists).ok()
    .expect(Selector('input[name="password"]').exists).ok()
    .expect(Selector('button[type="submit"]').exists).ok()
})

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

test('should show an error when username is missing', async t => {
  await t
    .typeText(Selector('input[name="email"]'), generateUniqueEmail())
    .typeText(Selector('input[name="password"]'), 'password123')
    .click(Selector('button[type="submit"]'))
    .expect(Selector('.mb-4.text-red-500').innerText).contains('Username is required', { timeout: 10000 })
})

test('should show an error when email is missing', async t => {
  await t
    .typeText(Selector('input[name="username"]'), generateUniqueUsername())
    .typeText(Selector('input[name="password"]'), 'password123')
    .click(Selector('button[type="submit"]'))
    .expect(Selector('.mb-4.text-red-500').innerText).contains('Email is required', { timeout: 10000 })
})

test('should show an error when password is missing', async t => {
  await t
    .typeText(Selector('input[name="username"]'), generateUniqueUsername())
    .typeText(Selector('input[name="email"]'), generateUniqueEmail())
    .click(Selector('button[type="submit"]'))
    .expect(Selector('.mb-4.text-red-500').innerText).contains('Password is required', { timeout: 10000 })
})
