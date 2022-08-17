class Todo {
  constructor(id, userID, title, isCompleted) {
    this.id = id;
    this.userID = userID;
    this.title = title;
    this.isCompleted = isCompleted;
  }
}

class TodoApp {
  constructor() {
      this.todoList = [];
      this.dummyIdIncre = 201; // TODO: may fix for uniqueID
      this.init();
  }
  
  init() {
    setTimeout(async () => {
      const results = await this.fetchInitData();
      for (const e of results) {
        this.addTodo(e);
      } 
    }, 500);
    this.todoInputHandler();
  }

  async fetchInitData() {
    const todos = []
    await fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(result => {
        console.log(result.length);
        for (const elem of result) {
          const t = new Todo(elem.id, elem.userId, elem.title, elem.completed);
          todos.push(t);
        }
      })
      .catch(err => console.error(err));
      
      return todos
  }

  todoInputHandler() {
    const todoInputNode = document.querySelector("#todoInput");
    todoInputNode.addEventListener("keypress", (evt) => {
      if (evt.key === "Enter") {
        if (0 === evt.target.value.trim().length) {
          evt.target.value = "";
          return;
        }
        this.dummyIdIncre += 1;
        const newId = this.dummyIdIncre;
        const title = evt.target.value;
        evt.target.value = "";
        const newItem = new Todo(newId, 0, title, false);
        this.todoList.push(newItem);
        this.addTodo(newItem);
      }
    })
  }

  addTodo = (todo) => {
    // Fist button
    const firstBtn = document.createElement("button");
    firstBtn.innerText = todo.title;
    if (todo.isCompleted) {
      firstBtn.classList.add("completed");
    }  
    firstBtn.addEventListener("click", this.toggleCompleteness);

    // Last button(del)
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.addEventListener("click", this.deleteTodo);
    
    // New todo
    this.todoList.push(todo);
    const todoListNode = document.querySelector("#todoList");
    const newTodo = document.createElement("li");
    newTodo.id = todo.id;
    newTodo.appendChild(firstBtn);
    newTodo.appendChild(delBtn);
    todoListNode.appendChild(newTodo);
  }

  toggleCompleteness = (evt) => {
    const id = evt.target.parentElement.id;
    const selectedTodo = this.todoList.find((each) => each.id == id);
    
    const selectedTodoNode = document.getElementById(id);
    if (selectedTodo.isCompleted) {
      selectedTodo.isCompleted = false;
      selectedTodoNode.classList.remove("completed");
    } else {
      selectedTodo.isCompleted = true;
      selectedTodoNode.classList.add("completed");
    }
  }
  
  deleteTodo = (evt) => {
    const id = evt.target.parentElement.id;
    this.todoList = this.todoList.filter((each) => each.id != id); // NOTE: convert and compare with !==
    const todoListNode = document.querySelector("#todoList");
    todoListNode.removeChild(evt.target.parentElement);
  }
}


document.addEventListener("DOMContentLoaded", () => { new TodoApp() });

// () => this 해결
// toggle, 공백 입력 예외처리

// todo button / button
// button -> 상위에 이벤트 달고

// debugger;
// setTimeout(() => {
//   debugger;
// }, 100);

// binding: 중복
// 
// 
