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

import { PenLine  } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useTodo, Todo } from "@/lib/data"
import { useEffect, useState } from "react"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    content: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
})


export default function EditTodo({ editId }: { editId: number }) {
    const { todos, setTodos} = useTodo();
    const [vail, setVail] = useState(false)
    const [btnTheme, setButton] = useState("h-10 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90")
    const editTodo = todos.find(t => t.id === editId) ?? {
        id: 0,
        title: "",
        content: "",
        completed: false,
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { title: editTodo.title, content: editTodo.content},
    })

    useEffect(() => {
        setVail(form.formState.isValid)
        setButton((form.formState.isValid 
            ? "h-10 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90" 
            : "h-10 w-full rounded-md bg-secondary text-secondary-foreground"
        ))
    }, [form.formState.isValid])
    
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        let updateTodos: Todo[] = [];
        [...todos].forEach(t => {
            updateTodos.push(t.id === editId ? { ...t, title: values.title, content: values.content }: t)
        }) 
        setTodos(updateTodos)
        localStorage.setItem("todos", JSON.stringify(todos))
    }

  return (
    <div>
        <Dialog>
            <DialogTrigger className="mt-1 bg-transparent hover:text-accent-foreground">
                <PenLine className="mr-2 h-6 w-6" />
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
                                    This is your Todo title
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
                                    This is your Todo title
                                </FormDescription>
                            </FormItem>
                          )}
                        />
                        <DialogClose type="submit" disabled={!vail} className={btnTheme}>
                            FINISH
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </div>
  )
}