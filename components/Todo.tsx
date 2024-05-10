"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import { 
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useTodo, Todo } from "@/lib/data"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    content: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
})


export default function TodoPage(id: number, useType: string) {
    const { todo, todos, setTodo, setTodos} = useTodo();

    if (useType === "edit" ) {
        todos.map((todo) => { todo.id === id? setTodo(todo): null })
    } else {
        setTodo({id: 0, title: "", content: "", completed: false})
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: todo.title,
            content: todo.content,
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        let id: number = 1
        while (todos.find(t => t.id === id)) { id++; }
        setTodos([...todos, {
            id: id,
            title: values.title,
            content: values.content,
            completed: false,
        }])
        localStorage.setItem("todos", JSON.stringify(todos))
        console.log(values)
    }

  return (
    <div className="w-full mb-4">
        <Dialog>
            <DialogTrigger className="w-full h-10 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                {useType === "edit"? "": "ADD"}
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Write todo here" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Write todo here" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                            </FormItem>
                          )}
                        />
                        <DialogClose type="submit">
                            FINISH
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </div>
  )
}