import CookieProvider from "@/components/providers/cookie-providers";
import { ModalProvider } from "@/components/providers/modal-providers";
import { ThemeProvider } from "@/components/providers/theme-providers";
import React from "react";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CookieProvider>
        <ModalProvider />
        {children}
      </CookieProvider>
    </ThemeProvider>
  );
}

export default Provider;
