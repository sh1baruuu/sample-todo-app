import z from "zod/v3";

export const RegisterFormSchema = z.object({
    name: z.string().min(1, "Please enter name"),
    email: z.string().min(1, "Please enter valid email address"),
    password: z
        .string()
        .min(1, "Please enter password")
        .min(6, "Password must be at least 6 characters long"),
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;
