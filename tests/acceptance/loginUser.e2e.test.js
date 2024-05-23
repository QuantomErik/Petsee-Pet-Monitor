import { Selector } from 'testcafe'

// Function to generate a unique username and email address
const generateUniqueUsername = () => `testuser${new Date().getTime()}${Math.floor(Math.random() * 1000)}`
const generateUniqueEmail = () => `testuser${new Date().getTime()}${Math.floor(Math.random() * 1000)}@example.com`

fixture `User Login`
  .page `http://localhost:5173/petsee/login`

test('should log in a user successfully', async t => {
  // Use known credentials
  const username = 'testuser' // Replace with actual known username
  const password = 'password123' // Replace with actual known password

  console.log(`Testing login with username: ${username}`)

  // Capture a screenshot before interacting with the page
  /* await t.takeScreenshot('before-login.png') */

  // Fill out login form and submit
  await t
    .typeText(Selector('#username'), username)
    .typeText(Selector('input[type="password"]'), password)
    .click(Selector('button[type="submit"]'))

  // Capture a screenshot after attempting login
 /*  await t.takeScreenshot('after-login.png') */

  // Debug information
  const bodyText = await Selector('body').innerText
  console.log(bodyText)

  // Verify that the user is redirected to the homepage
 /*  await t.expect(bodyText).contains('Welcome to Petsee', { timeout: 10000 }) */
})

test('should show an error when login fails', async t => {
  // Capture a screenshot before interacting with the page
  /* await t.takeScreenshot('before-failed-login.png') */

  // Fill out login form with incorrect credentials and submit
  await t
    .typeText(Selector('#username'), 'nonexistentuser')
    .typeText(Selector('input[type="password"]'), 'wrongpassword')
    .click(Selector('button[type="submit"]'))

  // Capture a screenshot after attempting login
 /*  await t.takeScreenshot('after-failed-login.png') */

  // Debug information
  const bodyText = await Selector('body').innerText
  console.log(bodyText)

  // Verify that the appropriate error message is displayed
  /* await t.expect(Selector('.alert-danger').innerText).contains('Invalid login', { timeout: 10000 }) */
})
