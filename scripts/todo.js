
async function addTodo() {

  let todoText = document.getElementById("todo-input").value;
  let todoDate = document.getElementById("todo-date").value;

  const response = await fetch('http://localhost:3000/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ todoText, todoDate })
  })

  const data = await response.json();
  console.log(data);


  if (todoText === "" || todoDate === "") return;
  
  let todoList = document.getElementById("todo-list");
  let todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  
  todoItem.innerHTML = `
      <span>${todoText}</span>
      <span>${todoDate}</span>
      <button class="delete-btn" onclick="this.parentElement.remove()">DELETE</button>
      <button class="complete-btn" onclick="this.parentElement.style.textDecoration='line-through'">COMPLETED</button>
  `;
  
  todoList.appendChild(todoItem);
  document.getElementById("todo-input").value = "";
}