"use client";

import { useState } from "react";
import { ChevronUp } from "lucide-react";
import clsx from "clsx";
import createMessage from "@/actions/createMessage";

export default function Form({ conversationId }: { conversationId: string }) {
    const [isDisabled, setDisabled] = useState(true);
    const [message, setMessage] = useState("");

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisabled(true);

        createMessage(message, conversationId).then(() => {
            setMessage("");
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim() != "") setDisabled(false);
        else setDisabled(true);

        setMessage(e.target.value);
    };

    return (
        <div className="flex w-full items-center justify-center">
            <form onSubmit={onSubmit} className="flex w-full gap-4">
                <input
                    type="text"
                    placeholder="Type message..."
                    value={message}
                    className="flex-1 rounded-2xl bg-[#424656] px-6 py-2 text-sm font-light text-white focus:outline-none focus:ring-2 focus:ring-[#1d90f5]"
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className={clsx(
                        "flex h-12 w-12 items-center justify-center rounded-xl shadow duration-200",
                        isDisabled
                            ? "bg-[#424656] hover:cursor-not-allowed"
                            : "bg-[#1d90f5] shadow-[#1d90f5]"
                    )}
                    disabled={isDisabled}
                >
                    <ChevronUp
                        size={16}
                        className={clsx(
                            "rounded-full ",
                            isDisabled
                                ? "bg-neutral-400 text-[#424656]"
                                : "bg-white text-[#1d90f5]"
                        )}
                    />
                </button>
            </form>
        </div>
    );
}
