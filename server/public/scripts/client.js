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
      let completeClass = "";
      $("#noteList").empty();

      for (const task of results) {
        task.is_complete
          ? (completeClass = "table-danger text-decoration-line-through")
          : (completeClass = "");
        $("#noteList").append(`
            <tr class="${completeClass} align-middle table-font-sm" data-is-complete="${
          task.is_complete
        }" data-id="${task.id}">
                <td class="">${task.note}</td>
                <td class="">${
                  task.is_complete ? "Complete" : "Not Completed"
                }</td>
                <td class="py-0 table-icons-sm">
                <button class="complete-button btn-sm btn btn-outline-success m-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
              </svg></button>
                <button class="edit-button btn-sm btn btn-outline-secondary m-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
              </svg></button>
                <button class="delete-button btn-sm btn btn-outline-danger m-0"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg></button>
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
