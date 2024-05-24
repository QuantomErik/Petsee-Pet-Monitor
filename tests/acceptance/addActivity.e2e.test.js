import { Selector } from 'testcafe'

// Fixture and URL
fixture `Add Activity`
  .page `http://localhost:5173/petsee/addactivity`

test('should add an activity successfully', async t => {
  // Fill out the activity form
  await t
    .click(Selector('select[name="type"]'))
    .click(Selector('option').withText('Running'))
    .click(Selector('select[name="duration"]'))
    .click(Selector('option').withText('30 min'))
    .click(Selector('select[name="intensity"]'))
    .click(Selector('option').withText('Medium'))
    .click(Selector('button').withText('Save Activity Details'))

  // Verify that the activity is added and the user is redirected
  const bodyText = await Selector('body').innerText
  await t.expect(bodyText).contains('Activity created successfully!')
  await t.expect(bodyText).contains('Activity Details')
})

test('should show validation errors for empty fields', async t => {
  // Click save without filling out the form
  await t.click(Selector('button').withText('Save Activity Details'))

  // Verify that the appropriate validation error is displayed
  const toastText = await Selector('.Toastify__toast-body').innerText
  await t.expect(toastText).contains('Please fill in all the fields.')
})
