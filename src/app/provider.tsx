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
      <ModalProvider />
      {children}
    </ThemeProvider>
  );
}

export default Provider;
