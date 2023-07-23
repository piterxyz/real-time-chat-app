"use client";

import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import createUser from "@/actions/createUser";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.push("/conversations");
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
    }, [variant]);

    const formSchema = z
        .object({
            nickname: z
                .string()
                .min(2, {
                    message: "Nickname must be at least 2 characters.",
                })
                .max(32, {
                    message: "Nickname's max length is 32 characters.",
                }),
            password: z
                .string()
                .min(4, {
                    message: "Password must be at least 4 characters.",
                })
                .max(32, {
                    message: "Password's max length is 32 characters.",
                }),
            confirmPassword: z.string().optional(),
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
            if (confirmPassword !== password && variant == "REGISTER") {
                ctx.addIssue({
                    code: "custom",
                    message: "The passwords did not match",
                    path: ["confirmPassword"],
                });
            }
        });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        if (variant === "REGISTER") {
            createUser(data.nickname, data.password)
                .then(() =>
                    signIn("credentials", {
                        nickname: data.nickname,
                        password: data.password,
                        redirect: false,
                    }).then((callback) => {
                        if (callback?.error) {
                            toast.error(callback?.error);
                        }

                        if (callback?.ok) {
                            router.push("/conversations");
                        }
                    })
                )
                .catch((error) => {
                    toast.error(error.message);
                })
                .finally(() => setIsLoading(false));
        }

        if (variant === "LOGIN") {
            signIn("credentials", {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error(callback?.error);
                    }

                    if (callback?.ok) {
                        router.push("/conversations");
                    }
                })
                .finally(() => setIsLoading(false));
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h1 className="text-center text-2xl font-semibold text-black dark:text-white">
                    Sign in to your account
                </h1>
                <FormField
                    control={form.control}
                    name="nickname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nickname</FormLabel>
                            <FormControl>
                                <Input placeholder="piterxyz" {...field} />
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
                {variant == "REGISTER" && (
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button className="w-full" type="submit" disabled={isLoading}>
                    {variant == "LOGIN" ? "Login" : "Register"}
                </Button>
                <p className="text-center text-sm  text-black dark:text-white ">
                    Are you new here?{" "}
                    <button
                        type="button"
                        className="font-semibold text-blue-600 duration-200 hover:text-blue-800"
                        onClick={toggleVariant}
                    >
                        {variant == "LOGIN" ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </Form>
    );
};

export default AuthForm;
