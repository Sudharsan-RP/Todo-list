
async function addTodo() {
  let todoText = document.getElementById("todo-input").value;
  let todoDate = document.getElementById("todo-date").value;

  if (todoText === "" || todoDate === "") return;

  const response = await fetch('http://localhost:3000/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ todoText, todoDate })
  });

  const data = await response.json();
  console.log(data.todo);
  
  let todo = data.todo;

  displayTodo(todo)
  // Clear Input Fields
  document.getElementById("todo-input").value = "";
  // document.getElementById("todo-date").value = "";
}

 async function getData() {
  //get data from db
 
 const getResponse = await fetch('http://localhost:3000/todo')
 const getData = await getResponse.json();
 let todoArr = getData.todo
 todoArr.forEach(todos => { 
  displayTodo(todos) 
 })
 }

 async function displayTodo (todo) {
  // **New Todo Item Create & Append to List**
  let todoList = document.getElementById("todo-list");
  let todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  todoItem.innerHTML = `
    <span class="todo-text">${todo.todoText}</span>
    <span class="todo-date">${todo.todoDate}</span>
    <button class="delete-btn" onclick="deleteData('${todo._id}')">DELETE</button>
    <button class="edit-btn" onclick="edit(this,'${todo._id}')">EDIT</button>
    <button class="complete-btn" onclick="completed(this)">COMPLETED</button>
  `;

  todoList.appendChild(todoItem); // UI la add aagum
}

async function deleteData(id) {
  try {
    const response = await fetch(`http://localhost:3000/todo/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("todo-list").innerHTML = ""; // Clear old list
      getData(); // Refresh list after deletion
    } else {
      console.error("Failed to delete:", data.message);
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}


async function edit(editBtn, id) {
  let parent = editBtn.parentElement;
  let todoText = parent.querySelector('.todo-text');
  let todoDate = parent.querySelector('.todo-date').textContent;
  let editedText = prompt('edit here : ', todoText.textContent);
  if(editedText !== null) {
    const response = await fetch(`http://localhost:3000/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todoText: editedText,
        todoDate
      })
    });
    const data = await response.json();
    console.log('edited', data)
    todoText.textContent = editedText;
  };
};

// function del(deleteBtn) {
//   let parent = deleteBtn.parentElement;
//   parent.remove();
// }

function completed(comBtn) {
  let parent = comBtn.parentElement;
  parent.classList.toggle('line');
  //let editBtn = parent.querySelector('.edit-btn');
  // if(editBtn) {
  //   editBtn.remove();
  // }
}

document.querySelector('#todo-input').addEventListener('keydown', (event) => {
  if(event.key == 'Enter') {
    addTodo()
  }
})

getData() //initial fetching