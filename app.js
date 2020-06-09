document.getElementById('formTask').addEventListener('submit',saveTask)

function saveTask(event){
  let title = document.getElementById('title').value
  let description = document.getElementById('description').value
  
  const task = {
    title,
    description
  }

  if (localStorage.getItem('tasks') === null){
    let tasks = [];
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
 
  getTasks()
  document.getElementById('formTask').reset()
  event.preventDefault()
}

function getTasks(){
  let tasks = JSON.parse(localStorage.getItem('tasks'))
  console.log(tasks)
  let tasksView = document.getElementById('tasks')
  console.log(tasksView)

  tasksView.innerHTML = '';

  console.log(tasks.length)

  for(let i = 0; i < tasks.length; i++){
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML += `
      <div class="card mb-4">
        <div class="card-body">
          <p>${title} - ${description}</p>
          <a class="btn btn-danger" onclick="deleteTasks('${title}')"> Borrar </a>
        </div>
      </div>
    `
  }
}

function deleteTasks(title){
  let tasks = JSON.parse(localStorage.getItem('tasks'))
  for(let i = 0; i < tasks.length; i++){
    if (tasks[i].title == title){
      tasks.splice(i,1)
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
  getTasks();
}

getTasks();