"use client";

import { useTheme } from "next-themes";
import { Theme, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToasterProvider() {
    const { theme, systemTheme } = useTheme();

    return (
        <ToastContainer
            theme={theme == "system" ? systemTheme : (theme as Theme)}
        />
    );
}
