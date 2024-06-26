"use client";
import PartyDetails from "@/components/cards/PartyDetails";
import { useEvent } from "@/hooks/api/useEvents";
import React from "react";

function Page({ params }: { params: { partyId: string } }) {
  const { partyId } = params;

  const { event, eventError, eventLoading } = useEvent(parseInt(partyId));

  return (
    <div>{eventLoading ? "Loading..." : <PartyDetails event={event} />}</div>
  );
}

export default Page;
