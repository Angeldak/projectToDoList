/// <reference path="jquery.js" />
$(onReady);
let editMode = false;
let globalIDHolder = "";

function onReady() {
  // Setup click handlers on load
  clickHandler();
  // Show current tasks on load
  appendTasks();
} // end onReady

function clickHandler() {
  $("#addNoteBtn").on("click", addTask);
  $("#noteList").on("click", ".complete-button", completeTask);
  $("#noteList").on("click", ".edit-button", editTask);
  $("#noteList").on("click", ".delete-button", deleteTask);
  $(".cancel-button").on("click", resetAfterEdit);
  // Setup submit on enter press
  $("html").on("keypress", (event) => {
    if (event.which === 13) {
      return addTask();
    }
  });
} // end clickHandler

function appendTasks() {
  // Function to append task list to DOM with buttons
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then((results) => {
      $("#noteList").empty();

      for (const task of results) {
        $("#noteList").append(`
            <tr data-is-complete="${task.is_complete}" data-id="${task.id}">
                <td>${task.note}</td>
                <td>${task.is_complete ? "Complete" : "Pending"}</td>
                <td>
                <button class="complete-button">Complete</button>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
                </td>
            </tr>
        `);
      }
    })
    .catch(() => {
      console.log("error in appendTasks", error);
    });
} // end appendTasks

function addTask() {
  //Function to add task
  // Checking if in global edit mode
  // if in edit mode update current task on click
  if (editMode === true) {
    $.ajax({
      method: "PUT",
      url: `/tasks/edit/${globalIDHolder}`,
      data: {
        note: $("#inputNote").val(),
      },
    })
      .then(() => {
        appendTasks();
        resetAfterEdit();
      })
      .catch(() => {
        console.log("error in addTask edit", error);
      });
  } else {
    // If not in global edit mode then add on new task on click
    $.ajax({
      method: "POST",
      url: "/tasks",
      data: {
        note: $("#inputNote").val(),
      },
    })
      .then(() => {
        appendTasks();
        $("#inputNote").val("");
      })
      .catch(() => {
        console.log("error in addTask non-edit", error);
      });
  }
} // end addTask

function deleteTask(event) {
  // Function to remove task from DOM and database
  const currentID = $(event.target).closest("tr").data("id");

  $.ajax({
    method: "DELETE",
    url: `/tasks/${currentID}`,
  })
    .then(() => {
      appendTasks();
    })
    .catch(() => {
      console.log("error in deleteTask", error);
    });
} // end deleteTask

function completeTask(event) {
  // Function to toggle complete on click
  const currentID = $(event.target).closest("tr").data("id");

  $.ajax({
    method: "PUT",
    url: `/tasks/togcomplete/${currentID}`,
  })
    .then(() => {
      appendTasks();
    })
    .catch(() => {
      console.log("error in completeTask", error);
    });
} // end completeTask

function editTask(event) {
  // Function to get into global edit mode and save the clicked id
  globalIDHolder = $(event.target).closest("tr").data("id");
  editMode = true;
  $("#inputNote").val($(event.target).closest("tr").children().first().text());
  $("#addNoteBtn").text("Edit Task");
  $(".cancel-button").show();
} // end editTask

function resetAfterEdit() {
  // Function to reset after edit add or cancel
  globalIDHolder = "";
  editMode = false;
  $("#inputNote").val("");
  $("#addNoteBtn").text("Add Task");
  $(".cancel-button").hide();
} // end resetAfterEdit
