"use client";
import { useEffect } from "react";

export default function ThemeScript() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, []);
  return null;
}