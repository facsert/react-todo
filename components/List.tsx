
import { 
    Command,
    CommandShortcut,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

const todos = [
    {
        id: 1,
        title: "Todo 1",
        description: "Description 1",
        completed: false,
    },
    {
        id: 2,
        title: "Todo 2",
        description: "Description 1",
        completed: false,
    },
    {
        id: 3,
        title: "Todo 3",
        description: "Description 1",
        completed: false,
    },
    {
        id: 4,
        title: "Todo 4",
        description: "Description 1",
        completed: false,
    },
    {
        id: 5,
        title: "Todo 5",
        description: "Description 1",
        completed: false,
    },
    {
        id: 6,
        title: "Todo 6",
        description: "Description 1",
        completed: false,
    },
]

export default function List() {
  return (
      <Command>
        <CommandInput />
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Todos">
                {todos.map((todo) => {
                    return (
                        <CommandItem key={todo.id} className="h-[50px] mt-4 border">
                            {todo.title}
                            <CommandShortcut>⌘T</CommandShortcut>
                        </CommandItem>
                    )
                })}
            </CommandGroup>
        </CommandList>
      </Command>
  );
}