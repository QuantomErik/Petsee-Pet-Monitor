# Test Report for Diet Management

## 2024-04-20

### Test Environment
- **Development Tools:** VSCode
- **Browser:** Google Chrome
- **Database:** MongoDB
- **Framework:** [React, MongoDB, node.js, express]

### Test Suite: Diet Management

#### Test Case 5.1: Add Meals
**Objective:** Verify that users can add meals for pet.
- **Input:** Log in.
Click on the "Diet" card.
Choose Kalle in the drop down menu.
Click on "Create Meal.
Fill out the form.
Click "Add Meal and save"
- **Expected Output:** A new meal is added which displayes calories, brand name of the food and quantity in grams.
Displays the meals and a summary of the meals.
- **Result:** [Pass]
- **Screenshots:** ![Local Image](./screenshots/TC5.1.png)

#### Test Case 5.2: Edit Meal
**Objective:** Ensure that the user can edit meals.
- **Input:** Click on the "Diet" card.
Choose Kalle in the drop down menu.
Choose the meal "Snack" and click edit.
Change the quantity from 5 grams to 10 grams.
Cick the "Update Meal" button.
- **Expected Output:** Details of the meal are updated.
Displays the updated meal with the quantity of 10 grams.
- **Result:** [Pass]
- **Screenshots:** ![Local Image](./screenshots/TC5.2.1.png) ![Local Image](./screenshots/TC5.2.2.png)

#### Test Case 5.3: Delete Meal
**Objective:** Ensure that the user can delete meals.
- **Input:** Click on the "Diet" card.
Choose Kalle in the drop down menu.
Choose the meal "Snack" and click edit.
Cick the "Delete Meal" button.
- **Expected Output:** A warning is shown to the user.
The meal is deleted.
- **Result:** [Pass]
- **Screenshots:** ![Local Image](./screenshots/TC5.3.1.png) ![Local Image](./screenshots/TC5.3.2.png)



### Summary
- **Overall Success Rate:** [6 out of 6]
- **General Comments:** Implementing React Toast/ToastContainer for the flash messages. Overall the routes, the fetching, the schemas and the interface works. Needs more improvement with the UI ofcourse.




# Test Report for Activity Management

## 2024-04-20

### Test Environment
- **Development Tools:** VSCode
- **Browser:** Google Chrome
- **Database:** MongoDB
- **Framework:** [React, MongoDB, node.js, express]

### Test Suite: Activity Management

#### Test Case 6.1: Add New Button
**Objective:** Verify that the URL for adding activities works and that a button to "create activity" is displayed.
- **Input:** Log in and navigate to the "activitydetails" section.
- **Expected Output:** A new page is opened. A create button is displayed.
- **Result:** [Pass]
- **Screenshots:** ![Local Image](./screenshots/TC6.1.png)
- **Comments:** [Any additional notes]

#### Test Case 6.2: Add New Activity Form
**Objective:** Verify that users can add activities for their pets through dropdown menus.
- **Input:** Log in and navigate to the activitydetails section. Choose activity details from dropdown (type, duration, intensity).
- **Expected Output:** User interface is displayed where the user can choose activity from dropdown menus.
- **Result:** [Pass]
- **Screenshots:** ![Local Image](./screenshots/TC6.2.png)
- **Comments:** [Any additional notes]

#### Test Case 6.3: Add New Activity
**Objective:** Verify that users can save activities for their pets.
- **Input:** Log in and navigate to the activitydetails section. Choose activity details from dropdown (type, duration, intensity). Save the activity.
- **Expected Output:** Activity is added to the "activitydetails" page. Displays the new activity.
- **Result:** [Pass]
- **Screenshots:** ![Local Image](./screenshots/TC6.3.png)
- **Comments:** [Any additional notes]

#### Test Case 6.4: Edit Activity
**Objective:** Verify that users can edit activities for their pets.
- **Input:** Log in and navigate to the activitydetails section. Choose activity and press the "edit" button.
- **Expected Output:** User is redirected to an "edit" url for the specified activity. Displays Buttons for "update activity" and "delete activity".
- **Result:** [Pass]
- **Screenshots:** ![Local Image](./screenshots/TC6.4.png)
- **Comments:** [Any additional notes]

#### Test Case 6.5: Update Activity
**Objective:** Verify that users can update activities for their pets.
- **Input:** Log in and navigate to the activitydetails section. Choose activity and press the "edit" button. Change duration to 60. Press the "update activity" button.
- **Expected Output:** User is redirected to the activitydetails url and the activity is updated. Displays A message "update successful" is displayed.
- **Result:** [Pass]
- **Screenshots:** ![Local Image](./screenshots/TC6.5.1.png) ![Local Image](./screenshots/TC6.5.2.png)
- **Comments:** [Any additional notes]

#### Test Case 6.6: Delete Activity
**Objective:** Verify that users can delete activities for their pets.
- **Input:** Log in and navigate to the activitydetails section. Choose activity and press the "edit" button. Click the "delete" button.
- **Expected Output:** A warning is displayed warning the user about the deletion. User is redirected to the activitydetails url and the activity is deleted. Displays A message "delete successful" is displayed.
- **Result:** [Pass]
- **Screenshots:** ![Local Image](./screenshots/TC6.6.1.png) ![Local Image](./screenshots/TC6.6.2.png)
- **Comments:** [Any additional notes]

### Summary
- **Overall Success Rate:** [6 out of 6]
- **General Comments:** Implementing React Toast/ToastContainer for the flash messages. Overall the routes, the fetching, the schemas and the interface works. Needs more improvement with the UI ofcourse.





