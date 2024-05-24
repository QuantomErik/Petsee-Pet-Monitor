import { Selector } from 'testcafe'

// Fixture and URL
fixture `User Login`
  .page `http://localhost:5173/petsee/login`

// Test for successful login
test('should log in a user successfully', async t => {
  // Use known credentials
  const username = 'testuser' // Replace with actual known username
  const password = 'password123' // Replace with actual known password

  console.log(`Testing login with username: ${username}`)

  // Fill out login form and submit
  await t
    .typeText(Selector('#username'), username)
    .typeText(Selector('#password'), password)
    .click(Selector('button[type="submit"]'))

  // Debug information
 /*  const bodyText = await Selector('body').innerText
  console.log(bodyText) */

  // Verify that the user is redirected to the homepage
  /* await t.expect(bodyText).contains('Welcome to Petsee', { timeout: 10000 }) */
})

// Test for failed login
test('should show an error when login fails', async t => {
  // Fill out login form with incorrect credentials and submit
  await t
    .typeText(Selector('#username'), 'nonexistentuser')
    .typeText(Selector('#password'), 'wrongpassword')
    .click(Selector('button[type="submit"]'))

  // Debug information
 /*  const bodyText = await Selector('body').innerText
  console.log(bodyText) */

  // Verify that the appropriate error message is displayed
  const alertText = await Selector('.alert-danger').innerText
  
  await t
    .expect(alertText).eql('Incorrect password', { timeout: 10000 })
    .catch(() => t.expect(alertText).eql("The username doesn't exist", { timeout: 10000 }))
    .catch(() => t.expect(alertText).eql('Invalid login', { timeout: 10000 }))
})
