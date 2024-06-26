"use client";

import { SearchCommandDialog } from "@/components/modal/SearchModalCommandDialog";
import { useMounted } from "@/hooks/useMounted";

export const ModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SearchCommandDialog />
    </>
  );
};
