
import { apiFetch } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";


// Registration hook
export const useRegister = () => {
    return useMutation({
        mutationKey: ["register"],
        mutationFn: async (data: { name: string; email: string; password: string }): Promise<{ message?: string }> => {
            return await apiFetch("/api/register", {
                method: "POST",
                body: JSON.stringify(data),
            });
        }
    })
}


// Login hook
export const useLogin = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: { email: string; password: string }): Promise<{ token: string }> => {
            return await apiFetch("/api/login", {
                method: "POST",
                body: JSON.stringify(data),
            });
        }
    })
}

