import { apiFetch } from "@/lib/utils";
import { queryClient } from "@/routes";
import type { Todo } from "@/types/Todo";
import { useMutation, useQuery } from "@tanstack/react-query";

// Helper to include auth header
const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
});

// Fetch Todos
export const useTodos = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: async (): Promise<{ data: Todo[] }> => {
            return await apiFetch<{ data: Todo[] }>("/api/todos", {
                method: "GET",
                headers: authHeaders(),
            });
        },
        refetchOnWindowFocus: false,
    });
};

// Add Todo
export const useAddTodo = () => {
    return useMutation({
        mutationKey: ["addTodo"],
        mutationFn: async (data: { title: string }): Promise<Todo> => {
            return await apiFetch<Todo>("/api/todos", {
                method: "POST",
                headers: { ...authHeaders(), "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });
};

// Delete Todo
export const useDeleteTodo = () => {
    return useMutation({
        mutationKey: ["deleteTodo"],
        mutationFn: async (id: number): Promise<{ message: string }> => {
            return await apiFetch<{ message: string }>(`/api/todos/${id}`, {
                method: "DELETE",
                headers: authHeaders(),
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });
};

// Toggle Todo
export const useToggleTodo = () => {
    return useMutation({
        mutationKey: ["toggleTodo"],
        mutationFn: async (id: number): Promise<Todo> => {
            return await apiFetch<Todo>(`/api/todos/${id}/toggle`, {
                method: "PATCH",
                headers: authHeaders(),
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });
};
