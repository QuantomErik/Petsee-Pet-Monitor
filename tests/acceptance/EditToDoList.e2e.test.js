import { Selector, ClientFunction } from 'testcafe';

fixture `Edit Task Flow`
    .page `http://localhost:5173/petsee/login`; // Update with your app's login URL

// Test data
const taskData = {
    initial: 'test1', // Adjust these values to match your actual test data
    updated: 'Updated Task'
};

// Selectors
const loginUsername = Selector('#username');
const loginPassword = Selector('#password');
const loginButton = Selector('button').withText('Log');
const newTaskInput = Selector('input').withAttribute('placeholder', 'Add new task');
const createTaskButton = Selector('button').withText('Create Task');
const taskList = Selector('.list-group');
const taskListItem = text => Selector('.list-group-item').withText(text);
const taskCheckbox = text => taskListItem(text).find('input[type="checkbox"]');
const updateButton = Selector('button').withText('Update');
const deleteButton = Selector('button').withText('Delete');
const toastMessage = Selector('.Toastify__toast-body');
const editTaskHeading = Selector('h1').withText('Edit Activity');
const taskInput = Selector('input').withAttribute('placeholder', 'Update task');

// Login function
async function login(t, username, password) {
    await t
        .typeText(loginUsername, username)
        .typeText(loginPassword, password)
        .click(loginButton);
}

async function createTaskIfNotExists(t, taskText) {
    if (await taskListItem(taskText).exists) {
        return;
    }
    await t
        .typeText(newTaskInput, taskText)
        .click(createTaskButton)
        .expect(taskListItem(taskText).exists).ok('Failed to create task');
}

test('Retrieve, update, and verify task', async t => {
    await login(t, 'testuser', 'password123'); // Update with valid credentials

    // Navigate to the to-do list page
    await t.navigateTo(`http://localhost:5173/petsee/todolist`);

    // Wait for the task list to load
    await t.expect(taskList.exists).ok({ timeout: 5000 });

    // Create the initial task if it doesn't exist
    await createTaskIfNotExists(t, taskData.initial);

    // Click on the updated task to edit (navigates to the specific edit URL)
    await t.navigateTo(`http://localhost:5173/petsee/todolist/edit/664fe0df953f343b3a1380a4`);

    // Verify navigation to the edit task page
    /* await t.expect(editTaskHeading.exists).ok({ timeout: 5000 }); */

    // Verify initial task details
    await t.expect(taskInput.value).eql(taskData.initial);

    // Update task details
    await t
        .selectText(taskInput)
        .typeText(taskInput, taskData.updated, { replace: true })
        .click(updateButton);

    // Verify update success message
    await t.expect(toastMessage.innerText).contains('Information updated successfully!', { timeout: 5000 });

    // Verify task details are updated
    await t.expect(taskInput.value).eql(taskData.updated);
});

test('Retrieve and delete task', async t => {
    await login(t, 'testuser', 'password123'); // Update with valid credentials

    // Navigate to the to-do list page
    await t.navigateTo(`http://localhost:5173/petsee/todolist`);

    // Wait for the task list to load
    /* await t.expect(taskList.exists).ok({ timeout: 5000 }); */

    // Create the updated task if it doesn't exist
    await createTaskIfNotExists(t, taskData.updated);

    // Click on the updated task to edit (navigates to the specific edit URL)
    await t.navigateTo(`http://localhost:5173/petsee/todolist/edit/664fe0df953f343b3a1380a4`);

    // Verify navigation to the edit task page
   /*  await t.expect(editTaskHeading.exists).ok({ timeout: 5000 }); */

    // Verify initial task details
    await t.expect(taskInput.value).eql(taskData.updated);

    // Delete task
    await t.click(deleteButton);

    // Verify delete success message
    await t.expect(toastMessage.innerText).contains('Task deleted successfully!', { timeout: 5000 });

    // Verify task is deleted (Redirected to the to-do list page)
    await t.expect(Selector('h1').withText('To-do list').exists).ok({ timeout: 5000 });
});
