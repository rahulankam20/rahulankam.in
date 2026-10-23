import { Moon, Sun } from "lucide-react";

// No React state: the theme lives on <html class="dark">, set before paint by
// the script in index.html, so the pre-rendered page and the app always agree.
export default function ThemeToggle() {
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Private browsing can block storage; the switch still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="group inline-flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground"
    >
      <Moon className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-[25deg] dark:hidden" aria-hidden />
      <Sun className="hidden h-5 w-5 transition-transform duration-700 group-hover:rotate-90 dark:block" aria-hidden />
    </button>
  );
}
