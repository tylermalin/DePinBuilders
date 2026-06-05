"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// Detect whether the component has been hydrated on the client.
// useSyncExternalStore avoids the setState-in-effect lint warning.
const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-grid h-[38px] w-[38px] place-items-center rounded-[3px] border-[1.5px] border-line bg-transparent text-ink transition-colors hover:border-ink"
      aria-label="Toggle theme"
    >
      {hydrated && theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
