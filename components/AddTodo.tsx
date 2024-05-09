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
import { stat } from "fs"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    content: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
})


export default function AddTodo() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    })
    const { todos, setTodos} = useTodo();
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
                ADD TODO
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
                        <DialogFooter>
                            <DialogClose >
                                <Button type="submit">Add</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </div>
  )
}