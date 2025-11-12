import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema, type LoginFormType } from "@/schema/LoginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { FieldSeparator } from "./ui/field";
import { useLogin } from "@/hooks/auth";
import { toast } from "sonner";


export function LoginForm() {
    const navigate = useNavigate();
    const { isPending, mutateAsync } = useLogin();

    const form = useForm<LoginFormType>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(LoginFormSchema),
    });

    const onSubmit = async (values: LoginFormType) => {
        try {
            const res = await mutateAsync(values);
            localStorage.setItem("token", res.token);

            toast.success("Login successful!");

            form.reset();

            navigate("/");
        } catch (error) {
            
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An error occurred during login.");
            }
        }
    };


    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col gap-6">
                                <Button type="submit">{isPending ? "Logging in..." : "Login"}</Button>
                                <FieldSeparator>OR</FieldSeparator>
                                <Button type="button" variant="secondary" onClick={() => navigate("/register")}>Register</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
