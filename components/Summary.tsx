"use client"

import { useTodo } from "@/lib/data"

export default function Summary() {
    const { todos } = useTodo();
    const completed = todos.filter((todo) => todo.completed).length;
    return (
        <div className="flex flex-row justify-center items-center w-full h-full">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {`Total Todos: ${completed} / ${todos.length}`}
            </h1>
        </div>
    )
}