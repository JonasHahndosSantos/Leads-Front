"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function DarkButton() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        const root = document.documentElement;

        root.classList.add("theme-transition");

        setTheme(theme === "dark" ? "light" : "dark");

        setTimeout(() => {
            root.classList.remove("theme-transition");
        }, 250);
    }

    return (
        <Button variant="outline" size="icon" onClick={toggleTheme} className="cursor-pointer h-[35px] w-[35px]">
            <Moon className="h-[20px] w-[20px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Sun className="absolute h-[20px] w-[20px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    )
}