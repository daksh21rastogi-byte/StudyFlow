const API = "http://127.0.0.1:8000/api/tasks";

async function loadTasks() {
    const response = await fetch(API);
    const tasks = await response.json();

    displayTasks(tasks);
}


async function addTask() {
    const title = document.getElementById("title").value.trim();
    const subject = document.getElementById("subject").value.trim();

    if (!title || !subject) {
        alert("Please enter task and subject.");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            subject: subject
        })
    });

    document.getElementById("title").value = "";
    document.getElementById("subject").value = "";

    loadTasks();
}


async function toggleTask(id) {
    await fetch(`${API}/${id}`, {
        method: "PUT"
    });

    loadTasks();
}


async function deleteTask(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}


function displayTasks(tasks) {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let completed = 0;

    tasks.forEach(task => {

        if (task.completed) {
            completed++;
        }

        const div = document.createElement("div");

        div.className = task.completed
            ? "task completed"
            : "task";

        div.innerHTML = `
            <div class="task-info">
                <strong class="title">${task.title}</strong>
                <div class="subject">${task.subject}</div>
            </div>

            <div class="actions">
                <button onclick="toggleTask(${task.id})">✓</button>
                <button onclick="deleteTask(${task.id})">×</button>
            </div>
        `;

        taskList.appendChild(div);
    });

    document.getElementById("total").textContent = tasks.length;
    document.getElementById("completed").textContent = completed;
}


loadTasks();
