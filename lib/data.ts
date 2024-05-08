interface Todo {
  id: number;
  title: string;
  completed: boolean;
  content: string;
}

let todos: Todo[] = [];

function getTodos() {
    const localTodos = localStorage.getItem('todos')
    if (localTodos) {
      todos.push(...JSON.parse(localTodos))
    }
    return todos;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getId(): number {
    let id: number = 1
    while (todos.find(t => t.id === id)) {
        id++;
    }
    return id
}

function addTodo(todo: Todo) {
    todos.push(todo);
    saveTodos();
}

// export { todos };
export { getTodos, addTodo, getId };
export type { Todo };