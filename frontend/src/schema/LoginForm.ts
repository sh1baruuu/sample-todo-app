import z from "zod/v3";

export const LoginFormSchema = z.object({
    email: z.string().min(1, "Please enter email address"),
    password: z.string().min(1, "Please enter password"),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
