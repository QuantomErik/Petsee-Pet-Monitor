Test Specification Document
Introduction
This document outlines the test scenarios for the Pet Management Application, focusing on user login, pet details management, diet tracking, and activity scheduling. It is designed to ensure the application meets all functional requirements and handles edge cases gracefully.

Test Environment
Hardware Requirements: No specific hardware requirements; tests can be run on any standard computer.
Software Requirements: Web browser (e.g., Chrome, Firefox), internet access.
Tools: Jest for automated testing, Postman for API testing.

Test Cases

Test Suite: User Registration

Test Case 2.1: Successful User Registration
Objective: Verify that new users can register successfully using valid credentials.
Input:
Navigate to the registration page.
Enter username: "testuser"
Enter password: "testpassword"
Enter email: "testuser@example.com"
Expected Output:
User is redirected to the login page or a success message is displayed.
Database is updated with the new user's credentials.

Test Case 2.2: Failed Registration - Duplicate Username
Objective: Ensure the registration process validates for duplicate usernames.
Input:
Navigate to the registration page.
Enter an existing username: "testuser"
Enter password: "testpassword"
Enter email: "test@hotmail.com"
Expected Output:
Error message: "Username is already taken."
User remains on the registration page.

Test Case 2.3: Failed Registration - Duplicate Email
Objective: Ensure the registration process checks for duplicate email addresses.
Input:
Navigate to the registration page.
Enter username: "testuser1"
Enter password: "testpassword"
Enter an existing email: "testuser@example.com"
Expected Output:
Error message: "Email is already in use."
User remains on the registration page.

Test Case 2.4: Failed Registration - Empty Fields
Objective: Validate that all fields (username, password, email) are required.
Input:
Navigate to the registration page.
Leave one or more fields empty.
Attempt to submit the form.
Expected Output:
Error message: "Username, password, and email are required."
User remains on the registration page.

Test Case 2.5: Failed Registration - Invalid Email Format
Objective: Ensure that the email field validates for correct email format.
Input:
Navigate to the registration page.
Enter username: "testuser2"
Enter password: "testpassword"
Enter email: "testuser@examplecom"
Expected Output:
Error message: "Invalid email format."
User remains on the registration page.

Test Suite: User Authentication

Test Case 3.1: Successful Login
Objective: Verify that users can log in with correct credentials.
Input:
Navigate to login page.
Enter username: "peter"
Enter password: "aaaaaa"
Expected Output:
User is redirected to the homepage.
In the Navbar: "Register" button dissapears.
In the Navbar: "Login" button dissapears.
In the Navbar: "Logout" button appears.

Test Case 3.2: Failed Login - Empty Credentials
Objective: Ensure the login form validates the requirement of username and password.
Input:
Navigate to login page.
Username or password is left empty/username and password are left empty.
Press "login" button.
Expected Output:
Error message: "Username and password required."
User remains on the login page.

Test Case 3.3: Failed Login - Incorrect Credentials - Incorrect username
Objective: Ensure the system correctly handles incorrect login credentials.
Input:
Navigate to login page.
Enter username: "test"
Enter password: "aaaaaa"
Press "login" button.
Expected Output:
Error message: "The username doesn't exist"
User remains on the login page.

Test Case 3.4: Failed Login - Incorrect Credentials - Incorrect password
Objective: Ensure the system correctly handles incorrect login credentials.
Input:
Navigate to login page.
Enter username: "peter"
Enter password: "test"
Press "login" button.
Expected Output:
Error message: "Incorrect password"
User remains on the login page.

Test Suite: Pet Details Management

Test Case 4.1: View Pet Details on More page
Objective: Verify that users can view details of their pets.
Input:
Log in successfully.
Click on the dog paw icon on the Dock (more).
Expected Output:
Displays a "More" page with the user's added pets.

Test Case 4.2: Add new pet
Objective: Verify that users can add pets.
Input:
Log in successfully.
Click on the dog paw icon on the Dock (more).
Click on the "Add pet" button
Fill in the name "test" and click "Save Pet Details.
Expected Output:
The user is redirected to a form.
Displays input fields/drop down menus for pet's name, age, animal type, weight, length, favouriteFood, favouriteToy and medical notes.
The new Pet is saved and added to the user.
The new Pet "test" is displayed on the "more" page.

Test Case 4.3: Edit Pet Details
Objective: Ensure users can edit the details of a pet.
Input:
Log in successfully.
Click on the dog paw icon on the Dock (more).
Click on the pet named "test"
Change the name to "test2"
Click on "update".
Expected Output:
An edit page of the pet's details should appear.
The pet's name (test) should be changed to "test2" and appear on the more page.
Displays the updated name of the pet.

Test Case 4.4: Delete a pet
Objective: Ensure that the user can delete a pet.
Input:
Click on the dog paw icon on the Dock (more).
Click on the pet named "test2"
CLick on the delete" button.
Update changes.
Expected Output:
A warning message appears warning the user about the deletion.
Deletes the pet.
Displays updated more page without the pet named test2.

Test Suite: Diet Management

Test Case 5.1: Add Meals
Objective: Verify that users can add meals for pet.
Input:
Log in.
Click on the "Diet" card.
Choose Kalle in the drop down menu.
Click on "Create Meal.
Fill out the form.
Click "Add Meal and save"
Expected Output:
A new meal is added which displayes calories, brand name of the food and quantity in grams.
Displays the meals and a summary of the meals.

Test Case 5.2: Edit Meal
Objective: Ensure that the user can edit meals.
Input:
Log in.
Click on the "Diet" card.
Choose Kalle in the drop down menu.
Choose the meal "Snack" and click edit.
Change the quantity from 5 grams to 10 grams.
Cick the "Update Meal" button.
Expected Output:
Details of the meal are updated.
Displays the updated meal with the quantity of 10 grams.

Test Case 5.3: Delete Meal
Objective: Ensure that the user can delete meals.
Input:
Log in.
Click on the "Diet" card.
Choose Kalle in the drop down menu.
Choose the meal "Snack" and click edit.
Cick the "Delete Meal" button.
Expected Output:
A warning is shown to the user.
The meal is deleted.


Test Suite: Activity Management

Test Case 6.1: Add New Button
Objective: Verify that the url for adding activities work and that a button to "create activity" displays. 
Input:
Log in and navigate to the "activitydetails" section.
Expected Output:
A new page is opened.
A create button is displayed.

Test Case 6.2: Add New Activity Form
Objective: Verify that users can add activities for their pets through dropdown menus.
Input:
Log in and navigate to the activitydetails section.
Choose activity details from dropdown (type, duration, intensity).
Expected Output:
User interface is displayed where the user can choose activity from dropdown menus.

Test Case 6.3: Add New Activity
Objective: Verify that users can save activities for their pets.
Input:
Log in and navigate to the activitydetails section.
Choose activity details from dropdown (type, duration, intensity).
Save the activity.
Expected Output:
Activity is added to the "activitydetails" page.
Displays the new activity.

Test Case 6.4: Edit Activity
Objective: Verify that users can edit activities for their pets.
Input:
Log in and navigate to the activitydetails section.
Choose activity and press the "edit" button.
Expected Output:
User is redirected to an "edit" url for the specified activity.
Displays Buttons for "update" activity" and "delete activity".

Test Case 6.5: Update Activity
Objective: Verify that users can update activities for their pets.
Input:
Log in and navigate to the activitydetails section.
Choose activity and press the "edit" button.
Change duration to 60.
Press the "update activity" button.
Expected Output:
User is redirected to the activitydetails url and the activity is updated.
Displayes A message "update succesfull" is displayed.

Test Case 6.6: Delete Activity
Objective: Verify that users can delete activities for their pets.
Input:
Log in and navigate to the activitydetails section.
Choose activity and press the "edit" button.
Click the "delete" button.
Expected Output:
A warning is displayed warning the user about the deletion.
User is redirected to the activitydetails url and the activity is deleted.
Displayes A message "delete succesfull" is displayed.

Test Suite: Schedule Management

Test Case 7.1: Add New Button
Objective: Verify that the url for adding schedule work and that a button to "create schedule" displays. 
Input:
Log in and navigate to the "scheduledetails" section.
Expected Output:
A new page is opened.
A create button is displayed.

Test Case 7.2: Add New Schedule Form
Objective: Verify that users can add schedule for their pet.
Input:
Log in and navigate to the "scheduledetails" section.
Choose schedule details from dropdown.
Expected Output:
User interface is displayed where the user can add date and note.

Test Case 7.3: Add New Schedule
Objective: Verify that users can save the schedule for their pet.
Input:
Log in and navigate to the scheduledetails section.
Choose date and write a note.
Save the schedule.
Expected Output:
A schedule is added to the "scheduledetails" page.
Displays the new schedule.

Test Case 7.4: Edit Schedule
Objective: Verify that users can edit the schedule for their pet.
Input:
Log in and navigate to the schedule details section.
Choose the schedule and press the "edit" button.
Expected Output:
User is redirected to an "edit" url for the schedule.
Displays Buttons for "update" schedule" and "delete schedule".

Test Case 7.5: Update Schedule
Objective: Verify that users can update the schedule for their pet.
Input:
Log in and navigate to the schedule details section.
Choose the schedule and press the "edit" button.
Change note to..
Press the "update schedule" button.
Expected Output:
User is redirected to the scheduledetails url and the schedule is updated.
Displayes A message "update succesfull" is displayed.

Test Case 7.6: Delete Schedule
Objective: Verify that users can delete the schedule.
Input:
Log in and navigate to the scheduledetails section.
Choose the schedule and press the "edit" button.
Click the "delete" button.
Expected Output:
A warning is displayed warning the user about the deletion.
User is redirected to the scheduledetails url and the schedule is deleted.
Displayes A message "delete succesfull" is displayed.


Test Suite: Multiple Pets

Test Case 8.1: Add New Pet
Objective: Verify that user can add a new pets.
Input:
Log in and navigate to the "more" section on the dock.
Choose "Add a pet".
Put in test as name of the Pet.
Save the new pet.
Expected Output:
A new Pet is added to the "more" page.
Displays the new Pet.

Test Case 8.2: Button/Dropdown for multiple pets
Objective: Verify that user sees a button for switching between pets.
Input:
Log in.
Expected Output:
A button for selecting pet should be visible to the user at all times.

Test Case 8.3: Display information for specific pet
Objective: Verify that only the saved information for the selected pet i displayed.
Input:
Navigate to "dietdetails".
Choose Kali as selected pet.
Expected Output:
The saved meals for the pet Kali should be displayed. 
Input:
Switch selected pet to Chelsea.
The saved meal for the pet Chelsea should be displayed. 

Test Case 8.4: Add information for specific pet
Objective: Verify that only the saved information only applies to the selected pet.
Input:
Navigate to "dietdetails".
Choose Kali as selected pet.
Click the "Create meal" button.
Create a meal and save it. 
Expected Output:
The new meal should only be displayed for the pet Kali.

Test Suite: Dock

Test Case 9.1: Display Dock
Objective: Verify that a Dock displays at the bottom of the page. 
Input:
Log in.
Expected Output:
A dock should be visible at the bottom at the page.
Displays Dock.

Test Case 9.2: Dock always visible
Objective: Verify that the Dock is always visible, no matter what page the user is currently on.
Input:
Log in and navigate to "Activity".
Expected Output:
The Dock should still be visble to the user no matter which page the user is on.
Displays the Dock.

Test Case 9.3: More Page
Objective: Verify that the user can navitage to the "More" page via the Dock.
Input:
Log in and click on the dog paw on the dock (More).
Expected Output:
The More page should display with additional functions. 
Displays More page.

Test Case 9.4: Logout from Dock
Objective: Verify that the user can logout from the Dock.
Input:
Log in and click on the dog paw on the dock (More).
Click the logout Button.
Expected Output:
The user should log out and be redirected to the Login page.
Displays Login page.

Test Case 9.5: Redirect to Home from the Dock.
Objective: Verify that the user can navigate to the Home page from the Dock.
Input:
Log in and click on Activity.
Click on the House icon on the dock (Home).
Expected Output:
The user should be redirected to the Home page.
Displays Home page.

Test Case 9.6: Open the Calendar (ScheduleDetails) from Dock.
Objective: Verify that the user can navigate to the calendar page from the Dock.
Input:
Log in and click on the calendar icon on the dock (ScheduleDetails).
Expected Output:
The user should be redirected to the ScheduleDetails.
Displays Calendar


Test Suite: To-do List

Test Case 10.1: To-do List function
Objective: Verify that a To-Do list function displays on the application.
Input:
Log in.
Expected Output:
Displays a clickable card ToDoList.

Test Case 10.2: Create new task
Objective: Verify that the user can navigate to the To-do List page and create a new task
Input:
Log in and click on the ToDoList card.
Input "test" in the input field and click the button "Create Task"
Expected Output:
The task "test" should display on the dashboard.
Displays the "test" task.

Test Case 10.3: checkbox to indigate if task is completed.
Objective: Verify that the user can click the checkbox next to the task name to indicate completion.
Input:
Log in and click on the ToDoList card.
CLick the checkbox next to the task "test"
Expected Output:
The checkbox should be filled and the task overwritten with a line indicating completion of the task.
Displays the changed state of the task.

Test Case 10.4: Edit task
Objective: Verify that the user can edit a task.
Input:
Log in and click on the ToDoList card.
Click on the "test" task.
Change text from "test" to "test2".
CLick the "Update Task button.
Expected Output:
The user should be navigated to the edit task page.
Displays the task with buttons to update or delete task.
The task should be updated with the new task "test".
Displays the updated task.

Test Case 10.5: Delete task
Objective: Verify that the user can delete a task.
Input:
Log in and click on the ToDoList card.
Click on the "test2" task.
CLick the "Delete" Task button.
Expected Output:
The user should be navigated to the edit task page.
Displays the task with buttons to update or delete task.
The task should be deleted and removed from the dashboard.
Displays the updated dashboard without the task "test2".












