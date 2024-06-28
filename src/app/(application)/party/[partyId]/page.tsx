"use client";
import PartyDetails from "@/components/cards/PartyDetails";
import { notFound } from "next/navigation";
import React from "react";

function Page({ params }: { params: { partyId: string } }) {
  const { partyId } = params;

  if (!partyId) return notFound();

  return <div>{<PartyDetails eventId={partyId} />}</div>;
}

export default Page;
