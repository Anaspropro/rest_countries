"use client";

import "../globals.css";
import { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

export default function Toggle() {
  const [theme, setTheme] = useState("light");

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme); // Ensure consistency in attribute name
    localStorage.setItem("theme", newTheme); // Persist theme in localStorage
  };

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme); // Ensure the theme is applied
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 text-lg font-medium"
    >
      {theme === "light" ? <FaRegMoon /> : <IoSunny />}
      <span className="hidden md:block">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}
