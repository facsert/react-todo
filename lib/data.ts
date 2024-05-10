import { create } from "zustand";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  content: string;
}

interface TodoState {
    todo: Todo;
    todos: Todo[];
    setTodo: (todo: Todo) => void;
    setTodos: (todos: Todo[]) => void;
}

// let defaultTodos:Todo[] = [
//     { id: 1, title: 'Todo 1', completed: false, content: 'Todo 1 content' },
//     {id: 2, title: 'Todo 2', completed: false, content: 'Todo 2 content' },
//     {id: 3, title: 'Todo 3', completed: false, content: 'Todo 3 content' }
// ]

function getDefaultTodo() {
    if (typeof window !== 'undefined') {
        console.log('You are on the browser')
        // const localTodo = localStorage.getItem('todos')
        // console.log(localTodo)
        // return localTodo ? JSON.parse(localTodo) : [];
        return [];
      } else {
        console.log('You are on the server')
        return [];
      }

}

const useTodo = create<TodoState>((set) => ({
    todo: { id: 0, title: '', completed: false, content: '' },
    setTodo: (todo: Todo) => set((state) => ({ todo: todo })),
    todos: [
        { id: 1, title: 'Todo 1', completed: false, content: 'Todo 1 content' },
        {id: 2, title: 'Todo 2', completed: false, content: 'Todo 2 content' },
        {id: 3, title: 'Todo 3', completed: false, content: 'Todo 3 content' }
    ],
    setTodos: (todos: Todo[]) => set({ todos: todos }),
}));


function updateTodo(state:TodoState, id: number, title: string, content: string) {
    const index = state.todos.findIndex((todo) => todo.id === id);
    return {
        todos: [
            ...state.todos.slice(0, index),
            { ...state.todos[index], title, content },
            ...state.todos.slice(index + 1),
        ],
    };
}

function saveTodo(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoId(todos: Todo[]): number {
    let id: number = 1
    while (todos.find(t => t.id === id)) {
        id++;
    }
    return id
}


// export { todos };
export { useTodo };
export type { Todo };