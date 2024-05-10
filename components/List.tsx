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


export default function List() {
    const { todos, setTodos } = useTodo();

    return (
        <Command>
            <div className="border ">
                <CommandInput placeholder="Search todo" />
            </div>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
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
        todos.map((todo) => {
            updatedTodos.push(todo.id === id? {...todo, completed: !todo.completed}: todo)
        })
        setTodos(updatedTodos)
    }
    todos.map((todo) => {
        items.push(
            <CommandItem key={todo.id} className="h-[50px] mt-4 border">
            <Checkbox className="mr-2" key={todo.id} onCheckedChange={() => {switchComplete(todo.id)}} />  
            <Label className={todo.completed? "line-through": ""}>
                {todo.title}
            </Label>
            <CommandShortcut className="flex flex-row gap-0">
                <Button variant="ghost">
                    <PenLine className="mr-2 h-6 w-6" />
                </Button>
                <Button variant="ghost">
                    <Trash2 className="mr-2 h-6 w-6" />
                </Button>
            </CommandShortcut>
            </CommandItem>
        )
    })
    return items
}