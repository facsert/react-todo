import { Card } from "@/components/ui/card";

export default function Summary() {
    return (
        <Card className="flex flex-row justify-center items-center w-full h-full">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Total Todos: 3 / 5
            </h1>
        </Card>
    )
}