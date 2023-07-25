"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FullUserType } from "@/types/full-prisma";
import { useState } from "react";
import Avatar from "@/components/Avatar";
import getInitials from "@/utils/getInitials";
import createConversation from "@/actions/createConversation";

export default function CreateGroupButton({
    currentUser,
}: {
    currentUser: FullUserType;
}) {
    const [open, setOpen] = useState(false);

    const formSchema = z.object({
        name: z
            .string()
            .min(2, {
                message: "Name must be at least 2 characters.",
            })
            .max(32, {
                message: "Name's max length is 32 characters.",
            }),
        users: z
            .array(z.string())
            .min(2, {
                message: "You need to add at least 2 users.",
            })
            .max(32, {
                message: "Exceeded max users limit (32).",
            }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            users: [],
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        createConversation({
            members: users,
            name: form.getValues("name"),
            isGroup: true,
        }).then(() => setOpen(false));
    };

    const users = form.watch("users");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create group</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Group name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={`${currentUser.nickname}'s group`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="users"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Friends</FormLabel>
                                    <div className="flex flex-wrap gap-1">
                                        {users.map((user) => {
                                            const userData =
                                                currentUser.friends.find(
                                                    (friend) =>
                                                        friend.id == user
                                                );
                                            return (
                                                <div
                                                    className="flex w-fit items-center gap-1 rounded-md border border-neutral-800 text-xs"
                                                    key={user}
                                                >
                                                    <p className="py-1 pl-3 pr-1.5">
                                                        {userData?.nickname}
                                                    </p>
                                                    <button
                                                        className="border-l border-neutral-800 px-1.5"
                                                        onClick={() =>
                                                            form.setValue(
                                                                "users",
                                                                users.filter(
                                                                    (u) =>
                                                                        u !=
                                                                        user
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <FormControl>
                                        <Popover
                                            open={open}
                                            onOpenChange={setOpen}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={open}
                                                    className="w-full justify-between"
                                                >
                                                    Select friends...
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search for friends..." />
                                                    <CommandEmpty>
                                                        No friends found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {currentUser.friends
                                                            .filter(
                                                                (user) =>
                                                                    !users.includes(
                                                                        user.id
                                                                    )
                                                            )
                                                            .map((user) => (
                                                                <CommandItem
                                                                    key={
                                                                        user.id
                                                                    }
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            "users",
                                                                            [
                                                                                ...users,
                                                                                user.id,
                                                                            ]
                                                                        );
                                                                        setOpen(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    <Avatar
                                                                        initials={getInitials(
                                                                            user.nickname
                                                                        )}
                                                                        width={
                                                                            6
                                                                        }
                                                                        height={
                                                                            6
                                                                        }
                                                                        color="gray"
                                                                        className="mr-2"
                                                                    />
                                                                    {
                                                                        user.nickname
                                                                    }
                                                                </CommandItem>
                                                            ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Create</Button>
                        </DialogFooter>{" "}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
