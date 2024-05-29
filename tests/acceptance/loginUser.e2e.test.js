import { Selector } from 'testcafe'

/**
 * Fixture for User Login tests.
 */
fixture `User Login`
  .page `http://localhost:5173/petsee/login`

/**
 * Test for successful login.
 * @param {TestController} t - The test controller provided by TestCafe.
 */
test('should log in a user successfully', async t => {
  // Use known credentials
  const username = 'testuser'
  const password = 'password123'

  console.log(`Testing login with username: ${username}`)

  // Fill out login form and submit
  await t
    .typeText(Selector('#username'), username)
    .typeText(Selector('#password'), password)
    .click(Selector('button[type="submit"]'))

})

/**
 * Test for failed login with incorrect credentials.
 * @param {TestController} t - The test controller provided by TestCafe.
 */
test('should show an error when login fails', async t => {
  // Fill out login form with incorrect credentials and submit
  await t
    .typeText(Selector('#username'), 'nonexistentuser')
    .typeText(Selector('#password'), 'wrongpassword')
    .click(Selector('button[type="submit"]'))

  const alertText = await Selector('.alert-danger').innerText
  
  await t
    .expect(alertText).eql('Incorrect password', { timeout: 10000 })
    .catch(() => t.expect(alertText).eql("The username doesn't exist", { timeout: 10000 }))
    .catch(() => t.expect(alertText).eql('Invalid login', { timeout: 10000 }))
})
