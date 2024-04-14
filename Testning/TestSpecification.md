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

Test Case 4.1: View Pet Details
Objective: Verify that users can view details of their pets.
Input:
Log in successfully.
Navigate to the pet details section.
Expected Output:
Displays pet's name, age, breed, and medical notes.

Test Case 4.2: Edit Pet Details
Objective: Ensure users can edit and save changes to pet details.
Input:
Log in and view pet details.
Click "Edit".
Change the pet's age and medical notes.
Save changes.
Expected Output:
Confirmation message "Details updated successfully."
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

Test Case 6.1: Schedule New Activity
Objective: Verify that users can schedule activities for their pets.
Input:
Log in and navigate to the activity section.
Enter activity details (type, duration, notes).
Set date and time.
Save the activity.
Expected Output:
Activity is scheduled.
Display "Activity scheduled successfully."

Test Case 6.2: Edit Scheduled Activity
Objective: Ensure users can modify scheduled activities.
Input:
Choose an existing activity.
Change the time and notes.
Update the activity.
Expected Output:
Activity details are updated.
Display "Activity updated successfully."