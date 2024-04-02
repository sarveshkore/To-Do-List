    function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    var task = taskInput.value.trim();
    if (task !== "") {
        var li = document.createElement("li");
        li.innerHTML = task + '<div> </div><div class="edit" onclick="editTask(this)">Edit</div><div class="delete" onclick="deleteTask(this)">Delete</div>';
        taskList.appendChild(li);
        taskInput.value = "";
        saveTask(task);
        task.value = "";
    } else {
        alert("Please enter a task!");
    }
}

function editTask(element) {
    var newText = prompt("Edit task:", element.parentElement.firstChild.textContent);
    if (newText !== null) {
        element.parentElement.firstChild.textContent = newText;
        saveTasks();
    }
    updateTaskInLocalStorage(newText, element.parentElement.firstChild.textContent);
}

function deleteTask(element) {
    if (confirm("Are you sure you want to delete this task?")) {
        var taskText = element.parentElement.firstChild.textContent.trim();
        element.parentElement.remove();
        removeTaskFromLocalStorage(taskText);
        saveTasks();
    }
}

function saveTask(task){
    var tasks = localStorage.getItem("tasks");
        if (tasks === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(tasks);
        }
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var index = tasks.indexOf(task);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function updateTaskInLocalStorage(oldTask, newTask) {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks !== null) {
        var taskList = document.getElementById("taskList");
        tasks.forEach(function(task) {
            var li = document.createElement("li");
            li.textContent = task;
            li.innerHTML += '<div> </div><div class="edit" onclick="editTask(this)">Edit</div><div class="delete" onclick="deleteTask(this)">Delete</div>';
            taskList.appendChild(li);
        });
    }
}
    
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});
