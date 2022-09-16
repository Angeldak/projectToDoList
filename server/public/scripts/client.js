$(onReady);

function onReady() {
  clickHandler();
  appendTasks();
}

function clickHandler() {
  $("#addNoteBtn").on("click", addTask);
}

function checkError(error) {
  console.log("error caught :>> ", error);
}

function appendTasks() {
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then((results) => {
      $("#noteList").empty();
      console.log("results :>> ", results);

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
    .catch(checkError);
}

function addTask() {}
