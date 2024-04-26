let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

// Empty array for local storage
let arrayOfTasks = [];

//check if the local storage is empty or not
if(localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}

//triggering
getDataFromLocalStorage();

// Add task
document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("task-form");
  var input = document.getElementById("task");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    if (input.value !== "") {
      addTaskToArray(input.value);
      input.value = "";
    }
  });

  //edit and delete
  taskDiv.addEventListener("click", (e) => {
    // Delete button
    if (e.target.classList.contains("del")) {
      // Delete element from local storage
      deleteTaskWithId(e.target.parentElement.getAttribute("data-id"));
      // Delete element from page
      e.target.parentElement.remove();
    }
    // Update task
    if (e.target.classList.contains("task")) {
      // Toggle completed task
      toggleStatusTaskWithId(e.target.getAttribute("data-id"));
  
      // Toggle "done" class
      e.target.classList.toggle("done");
    }
  });

  function addTaskToArray(taskText) {
    const task = {
      id: Date.now(),
      title: taskText,
      completed: false
    };
    arrayOfTasks.push(task);
    addElementsToPage(arrayOfTasks);

    //add task to local storage
    addDataToLocalStorage(arrayOfTasks);

  }
});

function addElementsToPage(arrayOfTasks) {
  // Empty task div
  taskDiv.innerHTML = "";

  // Looping on array of tasks
  arrayOfTasks.forEach((task) => {
    //create main div
    let div = document.createElement("div");
    div.className = "task";

    //check if task is done
    if(task.completed){
        div.className="task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    taskDiv.appendChild(div);
    //create delete button
    let span=document.createElement("span");
    span.className="del";
    span.appendChild(document.createTextNode("Delete"));
    //appened button to main div
    div.appendChild(span);
    // add task to container
    taskDiv.appendChild(div);
  });
}

function addDataToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data=window.localStorage.getItem("tasks");
    if(data){
        let tasks=JSON.parse(data);
    }
    
}

function deleteTaskWithId(taskId){
    for(let i=0;i<arrayOfTasks.length;i++){
        console.log(`${arrayOfTasks[i]} === ${taskId}`);
    }
    //filter all tasks except the one deletion
    arrayOfTasks=arrayOfTasks.filter((task)=> task.id !=taskId)
    //update the local storage
    addDataToLocalStorage(arrayOfTasks);
}

//update
function toggleStatusTaskWithId(taskId){
    for(let i=0;i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].id==taskId){
            arrayOfTasks[i].completed== false? (arrayOfTasks[i].completed= true):(arrayOfTasks[i].completed= false);
        }
    }
    console.log(arrayOfTasks);
    addDataToLocalStorage(arrayOfTasks);
}