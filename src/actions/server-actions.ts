"use server";

import { revalidatePath } from "next/cache";

export const revalidateDetails = async (partyId: string) => {
  revalidatePath(`/party/${partyId}`);
};
