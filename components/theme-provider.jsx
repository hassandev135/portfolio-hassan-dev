"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps next-themes. Uses the `class` strategy (toggles `.dark` on <html>),
 * which pairs with the `@custom-variant dark` rule in globals.css.
 */
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
