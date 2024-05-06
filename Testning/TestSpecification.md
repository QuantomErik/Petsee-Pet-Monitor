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

Test Case 4.1: View Pet Details on Home page
Objective: Verify that users can view details of their pets.
Input:
Log in successfully.
Redirected to the logged in "home" page.
Expected Output:
Displays a card with the Pet details.

Test Case 4.2: View Pet Details
Objective: Verify that users can view details of their pets.
Input:
Log in successfully.
Navigate to the pet details section.
Expected Output:
Displays pet's name, age, weight, length, favouriteFood, favouriteToy, breed and medical notes.

Test Case 4.3: Edit Pet Details - Save when creating new document.
Objective: Ensure users can create a new document to pet details.
Input:
Log in and view pet details.
Click "Edit".
Add input to the form.
Save changes.
Expected Output:
Only the "save" button should appear.
Details succesfully stored in mongoDB.
User is redirected to the logged in "home" page.
Saved details are displayed.

Test Case 4.4: Edit Pet Details - Update when existing document exists.
Objective: Ensure users can edit and update changes to pet details.
Input:
Log in and view pet details.
Click "Edit".
Change pet's name to "Kalle"
Update changes.
Expected Output:
Only the "update" button should appear.
User is redirected to the logged in "home" page.
Updated details are displayed.

Test Suite: Diet Management

Test Case 5.1: Add Diet Plan
Objective: Verify that users can add diet plans for pets.
Input:
Navigate to the diet section after logging in.
Enter diet details (type, quantity, schedule).
Submit the form.
Expected Output:
Diet details are added.
Display "Diet plan added successfully."

Test Case 5.2: Edit Diet Plan
Objective: Ensure users can edit existing diet plans.
Input:
Select an existing diet plan.
Modify details and save.
Expected Output:
Updated diet details are saved.
Display "Diet plan updated successfully."
Test Suite: Activity Scheduling

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








