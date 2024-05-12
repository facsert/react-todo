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


const useTodo = create<TodoState>((set) => ({
    todo: { id: 0, title: '', completed: false, content: '' },
    setTodo: (t: Todo) => set({ todo: t }),
    todos: [
        {id: 1, title: 'Todo 1', completed: false, content: 'Todo 1 content' },
        {id: 2, title: 'Todo 2', completed: false, content: 'Todo 2 content' },
        {id: 3, title: 'Todo 3', completed: false, content: 'Todo 3 content' }
    ],
    setTodos: (todos: Todo[]) => set({ todos: todos }),
}));


export { useTodo };
export type { Todo };