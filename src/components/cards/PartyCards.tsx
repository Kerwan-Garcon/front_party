import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Event } from "@/utils/interfaces/events.interfaces";
import { extractDateInformations } from "@/utils/date/format";
import Link from "next/link";
import Image from "next/image";

function PartyCards({ partys }: { partys: Event[] }) {
  if (partys.length === 0)
    return (
      <div className="flex items-center justify-center">
        <h2 className="text-3xl text-primary">No party found</h2>
      </div>
    );

  return partys.map((party: Event) => {
    const { formattedFullDate, formattedHours } = extractDateInformations(
      party.date
    );

    const TYPE_PARTY = {
      PARTY: {
        image: "/images/party.jpg",
      },
      VIDEO_GAME: {
        image: "/images/games.png",
      },
      BOARD_GAME: {
        image: "/images/board.png",
      },
    };

    return (
      <Card
        className="min-h-[500] flex flex-col justify-between"
        key={party.id}
      >
        <CardHeader>
          <h3 className="underline text-foreground">
            {party.name} - {party.organizer.name}
          </h3>
          <Image
            src={TYPE_PARTY[party.type].image}
            width={250}
            height={250}
            alt="..."
            className="rounded-md w-full h-[200px] object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardDescription className="flex flex-col gap-8">
            <span> {party.description} </span>
          </CardDescription>
          <div className="flex flex-col gap-1 ">
            <span> Price: {party.price || "FREE"} €</span>
            <span>
              Event planned: {formattedFullDate} at {formattedHours}H
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Link
            className="bg-primary text-background px-6 text-sm py-1 rounded-sm font-semibold cursor-pointer hover:bg-primary/90"
            href={`/party/${party.id}`}
          >
            See more
          </Link>
        </CardFooter>
      </Card>
    );
  });
}

export default PartyCards;
