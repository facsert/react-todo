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

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"

import { PenLine, Trash2  } from 'lucide-react';
import { useTodo, Todo } from "@/lib/data";

const todo:Todo[] = [
    {
        id: 1,
        title: "Buy milk",
        completed: false,
        content: "Buy milk from the store",
    },
    {
        id: 2,
        title: "Buy bread",
        completed: false,
        content: "Buy bread from the store",
    },
    {
        id: 3,
        title: "Buy eggs",
        completed: false,
        content: "Buy eggs from the store",
    },
]
export default function List() {
    const { todos } = useTodo();
    return (
        <Command>
            <div className="border ">
                <CommandInput placeholder="Search todo" />
            </div>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Todos">
                    {todos.length === 0 ? Empty() : Items(todos)}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

function Empty() {
    return <CommandItem>No results found.</CommandItem>
}

function Items(todos: Todo[]) {
    const items: JSX.Element[] = [];
    todos.map((todo) => {
        items.push(
            <CommandItem key={todo.id} className="h-[50px] mt-4 border">
            <Checkbox />  
            <Label className="line-through">
                {todo.title}
            </Label>
            <CommandShortcut className="flex flex-row border">
                <PenLine />
                <Trash2 />
            </CommandShortcut>
            </CommandItem>
        )
    })
    return items
}