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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"

import { Trash2  } from 'lucide-react';
import { useTodo } from "@/lib/data";

import EditTodo from "@/components/EditTodo"

export default function List() {
    const { todos, setTodos} = useTodo();
    const switchComplete = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id? {...todo, completed: !todo.completed}: todo ))
    }
    const DeleteTodo = (id: number) => { setTodos(todos.filter((todo) => todo.id !== id))}
    if (todos.length === 0) {
        return (
            <Command>
                <div className="border ">
                    <CommandInput placeholder="Search todo" />
                </div>
                <CommandList>
                    <CommandEmpty>No Todo found</CommandEmpty>
                    <CommandGroup heading="Todos">
                        <CommandItem></CommandItem>
                        <p className="w-full bg-transparent text-center">No Todo</p>
                    </CommandGroup>
                </CommandList>
            </Command>
        );
    }

    return (
        <Command>
            <div className="border ">
                <CommandInput placeholder="Search todo" />
            </div>
            <CommandList>
                <CommandEmpty>No Todo found</CommandEmpty>
                <CommandGroup heading="Todos">
                    {todos.map(todo => {
                        return (
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
                    })}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}