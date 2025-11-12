import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { useAddTodo, useDeleteTodo, useTodos, useToggleTodo } from "@/hooks/todos";
import type { Todo } from "@/types/Todo";
import { BadgeCheckIcon, CheckCircleIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function App() {
    const navigate = useNavigate()
    const { data, isFetching } = useTodos();
    const { mutateAsync: addTodo, isPending: isAdding } = useAddTodo();
    const { mutateAsync: deleteTodo } = useDeleteTodo();
    const { mutateAsync: toggleTodo } = useToggleTodo();

    const [title, setTitle] = useState("");
    const todoLists: Todo[] = data?.data || [];

    const handleAddTodo = async () => {
        if (!title.trim()) return toast.error("Please enter a todo title.");
        try {
            await addTodo({ title });
            toast.success("Todo added successfully!");
            setTitle("");
        } catch {
            toast.error("Failed to add todo.");
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            await deleteTodo(id);
            toast.success("Todo deleted successfully!");
        } catch {
            toast.error("Failed to delete todo.");
        }
    };

    const handleToggleTodo = async (id: number) => {
        try {
            await toggleTodo(id);
            toast.success("Todo updated successfully!");
        } catch {
            toast.error("Failed to update todo.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/login");   
    };


    return (
        <div className="max-w-2xl mx-auto mt-12 space-y-6">
            <Card className="shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold">My Todo List</CardTitle>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleLogout} // your logout function
                    >
                        Logout
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Input Row */}
                    <div className="flex gap-2">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Add a new todo..."
                            disabled={isAdding}
                            className="flex-1 rounded-lg"
                        />
                        <Button
                            onClick={handleAddTodo}
                            disabled={isAdding}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4"
                        >
                            {isAdding ? "Adding..." : "Add"}
                        </Button>
                    </div>

                    {/* Todo List */}
                    <div className="space-y-2">
                        {isFetching ? (
                            <p className="text-center text-gray-400">Loading todos...</p>
                        ) : todoLists.length > 0 ? (
                            todoLists.map((todo) => (
                                <Item key={todo.id} variant="outline">
                                    <ItemMedia>
                                        {todo.is_done ? (
                                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <BadgeCheckIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle className={todo.is_done ? "line-through text-gray-400" : ""}>
                                            {todo.title}
                                        </ItemTitle>
                                        <ItemDescription>
                                            {todo.is_done ? "Completed" : "Pending"}
                                        </ItemDescription>
                                    </ItemContent>
                                    <ItemActions className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleToggleTodo(todo.id)}
                                        >
                                            {todo.is_done ? "Undo" : "Done"}
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDeleteTodo(todo.id)}
                                        >
                                            <Trash2Icon className="h-4 w-4" />
                                        </Button>
                                    </ItemActions>
                                </Item>
                            ))
                        ) : (
                            <p className="text-center text-gray-400">No todos yet.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
