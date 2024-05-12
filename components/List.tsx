"use client"
import { 
    Command,
    CommandShortcut,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"

import { PenLine, Trash2  } from 'lucide-react';
import { useTodo, Todo } from "@/lib/data";

import EditTodo from "@/components/EditTodo"

export default function List() {
    const { todos } = useTodo();

    return (
        <Command>
            <div className="border ">
                <CommandInput placeholder="Search todo" />
            </div>
            <CommandList>
                <CommandEmpty>No Todo found</CommandEmpty>
                <CommandGroup heading="Todos">
                    {todos.length === 0 ? Empty() : Items()}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

function Empty() {
    return (
        <>
            <CommandItem></CommandItem>
            <p className="w-full bg-transparent text-center">No Todo</p>
        </>
    )
}

function Items() {
    const { todos, setTodos } = useTodo();
    const items: JSX.Element[] = [];
    let updatedTodos: Todo[] = [];
    const switchComplete = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id? {...todo, completed: !todo.completed}: todo ))
        // setTodos(updatedTodos)
    }
    const DeleteTodo = (id: number) => { setTodos(todos.filter((todo) => todo.id !== id))}
    todos.map((todo) => {
        items.push(
            <CommandItem key={todo.id} className="h-[50px] mt-4 border">
                <Checkbox className="mr-2" key={todo.id} onCheckedChange={() => {switchComplete(todo.id)}} />  
                <Label className={todo.completed? "line-through": ""}>
                    {todo.title}
                </Label>
                <CommandShortcut className="h-full flex flex-row items-center gap-0">
                    <EditTodo editId={todo.id} />
                    <Button variant="ghost" onClick={() => DeleteTodo(todo.id)}>
                        <Trash2 className="h-6 w-6" />
                    </Button>
                </CommandShortcut>
            </CommandItem>
        )
    })
    return items
}