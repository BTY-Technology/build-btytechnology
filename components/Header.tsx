"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to dark mode on first load
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = document.documentElement;

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.toggle("dark", systemTheme === "dark");
    } else {
      root.classList.toggle("dark", newTheme === "dark");
    }
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const getSliderPosition = () => {
    if (theme === "light") return "translate-x-0";
    if (theme === "system") return "translate-x-[25px]";
    return "translate-x-[50px]";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-1 sm:py-2 lg:py-4 px-0 sm:px-2 lg:px-12 transition-all duration-300 ease-in-out backdrop-blur-xl border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/browse" className="md:block hidden">
            <div className="h-10 w-10 transition-all hover:opacity-80 rounded-xl flex items-center justify-center">
              <img
                src="/btyfavi.svg"
                alt="BTY Technology Logo"
                className="h-10 w-10"
              />
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none h-10 md:hidden flex p-1 w-12"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="18" x2="6" y1="6" y2="18"></line>
                <line x1="6" x2="18" y1="6" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <a
            href="https://btytechnology.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 px-4 py-2 rounded-md"
          >
            MAIN
          </a>
          <Link
            href="/browse"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 px-4 py-2 rounded-md"
          >
            WEBSITES
          </Link>
          <a
            href="https://btytechnology.com/resources/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 px-4 py-2 rounded-md"
          >
            ABOUT
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <div className="relative flex h-6 w-auto bg-neutral-50 dark:bg-neutral-900 px-0.5 py-1 rounded-full border border-neutral-200/50 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700">
            <div
              className={`absolute h-[20px] w-6 top-[1px] bg-white dark:bg-neutral-700 rounded-full transition-all duration-200 ease-in-out shadow-beautiful-md ${getSliderPosition()}`}
            ></div>
            <button
              onClick={() => handleThemeChange("light")}
              className={`relative -top-[1px] -left-[1px] z-10 flex items-center justify-center h-4 w-6 rounded-full transition-colors ${theme === "light" ? "text-neutral-900 dark:text-white" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"}`}
              aria-label="Light mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </button>
            <button
              onClick={() => handleThemeChange("system")}
              className={`relative -top-[1px] left-[1px] z-10 flex items-center justify-center h-4 w-6 rounded-full transition-colors ${theme === "system" ? "text-neutral-900 dark:text-white" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"}`}
              aria-label="System theme"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                <line x1="8" x2="16" y1="21" y2="21"></line>
                <line x1="12" x2="12" y1="17" y2="21"></line>
              </svg>
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`relative -top-[1px] left-[1px] z-10 flex items-center justify-center h-4 w-6 rounded-full transition-colors ${theme === "dark" ? "text-neutral-900 dark:text-white" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"}`}
              aria-label="Dark mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutral-950 border-b border-border/30 backdrop-blur-xl">
          <nav className="container mx-auto py-4 px-4 flex flex-col space-y-2">
            <Link
              href="/browse"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md"
            >
              WEBSITES
            </Link>
            <a
              href="https://btytechnology.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md"
            >
              ABOUT
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
