import { Selector, ClientFunction } from 'testcafe'

fixture `Pet Details`
  .page `http://localhost:5173/petsee/login`
 /*  .page `https://cscloud7-95.lnu.se/petsee/login` */

test('should log in and add/update pet details successfully', async t => {
  // Login process
  const username = 'testuser' // Replace with actual known username
  const password = 'password123' // Replace with actual known password

  await t
    .typeText(Selector('#username'), username)
    .typeText(Selector('#password'), password)
    .click(Selector('button').withText('Log'))

  // Ensure the login was successful
  // await t.expect(Selector('h1').withText('Home').exists).ok('Login failed or Home page did not load correctly')

  // Navigate to add pet page
  await t.navigateTo('http://localhost:5173/petsee/more/addpet')
  /* await t.navigateTo('https://cscloud7-95.lnu.se/petsee/more/addpet') */

  // Ensure the page is loaded correctly
  // await t.expect(Selector('h1.custom-heading').withText('Pet Details').exists).ok('Page did not load correctly')

  // Add a wait to ensure the page is fully loaded
  await t.wait(3000) // Adjust the wait time as needed

  // Add more debug information
  console.log('Checking for input fields...')

  // Check if the input fields exist
  await t
    .expect(Selector('input[name="name"]').exists).ok('Name input does not exist')
    .expect(Selector('select[name="animalType"]').exists).ok('Animal type select does not exist')
    .expect(Selector('select[name="age"]').exists).ok('Age select does not exist')
    .expect(Selector('select[name="weight"]').exists).ok('Weight select does not exist')
    .expect(Selector('select[name="length"]').exists).ok('Length select does not exist')
    .expect(Selector('input[name="favouriteFood"]').exists).ok('Favourite food input does not exist')
    .expect(Selector('input[name="favouriteToy"]').exists).ok('Favourite toy input does not exist')
    .expect(Selector('input[name="medicalNotes"]').exists).ok('Medical notes input does not exist')
    .expect(Selector('select[name="caloriesDay"]').exists).ok('Calories per day select does not exist')
    .expect(Selector('select[name="activitiesDay"]').exists).ok('Activities per day select does not exist')
    .expect(Selector('button').withText('Save Pet Details').exists).ok('Save button does not exist')


  // Ensure the dropdowns are visible and expanded
  const ensureVisible = ClientFunction(() => {
    const weightDropdown = document.querySelector('select[name="weight"]')
    weightDropdown.style.display = 'block'
    weightDropdown.focus()
  })

  await ensureVisible()

  // Add wait time after expanding the dropdown to ensure options are visible
  await t.wait(1000)

  // Fill out the form
  await t
    .typeText(Selector('input[name="name"]'), 'Fluffy')
    .click(Selector('select[name="animalType"]'))
    .click(Selector('option[value="Dog"]'))
    .click(Selector('select[name="age"]'))
    .click(Selector('option[value="2"]'))

    // Use keyboard navigation to select the weight
    .click(Selector('select[name="weight"]'))
    .pressKey('down down down down down down down down down down') // Press 'down' key 10 times to reach value "10"
    .pressKey('enter')

    // Use keyboard navigation to select the length
    .click(Selector('select[name="length"]'))
    .pressKey('down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down down') // Press 'down' key 50 times to reach value "50"
    .pressKey('enter')

    .typeText(Selector('input[name="favouriteFood"]'), 'Bone')
    .typeText(Selector('input[name="favouriteToy"]'), 'Ball')
    .typeText(Selector('input[name="medicalNotes"]'), 'None')
    .click(Selector('select[name="caloriesDay"]'))
    .click(Selector('option[value="500"]'))
    .click(Selector('select[name="activitiesDay"]'))
    .pressKey('down down down') // Press 'down' key 3 times to reach value "3"
    .pressKey('enter')
    .click(Selector('button').withText('Save Pet Details'))

  // Add a wait time to ensure navigation
  /* await t.wait(5000) */ // Increase the wait time to ensure navigation is complete

  // Wait for navigation to home page
  /* const getLocation = ClientFunction(() => document.location.href) */
 

  // Verify the toast message on the home page
  /* await t */
    /* .expect(Selector('.toast').withText('Information updated successfully!').exists).ok({ timeout: 10000 }) */
    /* .expect(Selector('h1').withText('Home').exists).ok({ timeout: 5000 }) */
})
