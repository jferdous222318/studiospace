"use client";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
  };

  return (
    <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="Toggle theme">
      <FiSun className="icon-sun size-5" />
      <FiMoon className="icon-moon size-5" />
    </button>
  );
}