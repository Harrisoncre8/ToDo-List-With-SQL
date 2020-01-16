$(document).ready( function() {
    console.log('Hello JQ');
    addClickHandlers();
    refreshTasks();
});

// click handlers
function addClickHandlers() {
    console.log('Buttons Working');
    $('#addTaskBtn').on('click', submitNewTask);
    $('#taskList').on('click','.deleteBtn', deleteTask);
    // Toggle checkbox
    $('#taskList').on('click', '.completedCheck', completeTask);
}// end click handlers

// adding new task to DB and DOM
function submitNewTask() {
    console.log('Add New Task button clicked.');
    let todo = {};
    todo.task = $('#taskIn').val();
    addTask(todo);
    todo.task = $('#taskIn').val('');
} // end submitNewTask

// POST route that adds a task to the database
function addTask(taskToAdd) {
    $.ajax({
      type: 'POST',
      url: '/tasks',
      data: taskToAdd,
      }).then(function(response) {
        console.log('Response from server.', response);
        refreshTasks();
      }).catch(function(error) {
        console.log('Error in POST client side', error)
        alert('Unable to add task at this time. Please try again later.');
      });
} // end addTask

// refreshTasks will get all tasks from the server and render to page
function refreshTasks() {
    $.ajax({
      method: 'GET',
      url: '/tasks'
    }).then(function(response) {
      console.log(response);
      renderTasks(response);
    }).catch(function(error){
      console.log('error in GET', error);
    });
  }// end refreshTasks

// Displays an array of tasks to the DOM
function renderTasks(tasks) {
    console.log('in renderTasks');
    $('#taskList').empty();
    for(let i = 0; i < tasks.length; i++) {
      let taskToDo = tasks[i];
      // For each task, append a new row to our table
      let $tr = $(`<tr></tr>`);
      $tr.data('id', taskToDo.id);  
      $tr.append(`<div class="container">
                        <button class="completedCheck" type="checkbox">✔️</button>
                </div>`); 
      $tr.append(`<td>${taskToDo.task}</td>`);
      $tr.append(`<td>${taskToDo.status}</td>`);
      $tr.append(`<td><button class="deleteBtn text-dark">Delete</button></td>`);
      $('#taskList').append($tr);
    }// end for loop
} // end renderTasks

// DELETE selected task
function deleteTask() {
    console.log('in deleteTask');
    let id = $(this).closest('tr').data('id');
    console.log(id);
    $.ajax({
      method: 'DELETE',
      url: `/tasks/${id}` 
    }).then( function (response){
      refreshTasks();
    }).catch( function(error){
      alert('error deleting task, see console for details');
      console.log(error);
    })
  }// end deleteTask

function completeTask() {
    console.log('complete works');
    let id = $(this).closest('tr').data('id');
    let checkBox = document.getElementsByClassName("completedCheck")
    if (checkBox.checked){
        toggleTaskStatus('completed', id);
      } 
    if (!checkBox.checked) {
        toggleTaskStatus('in-progress', id);
        $(this).closest('tr').css('background-color');
      }
}// end completeTask

function toggleTaskStatus(progress, id) {
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`,
        data: {
            progress: progress
        }
    }).then( function(response) {
        refreshTasks();
    }).catch( function( error ){
        // handle errors
        alert( 'error putting tasks client side. see console for details' );
        console.log( error );
    })
}// end toggleTaskStatus