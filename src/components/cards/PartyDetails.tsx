import { Event } from "@/utils/interfaces/events.interfaces";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { extractDateInformations } from "@/utils/date/format";
import { Beer, CalendarIcon, DollarSign, MapIcon } from "lucide-react";

function PartyDetails({ event }: { event: Event | undefined }) {
  if (!event) return notFound();

  const TYPE_PARTY = {
    PARTY: {
      icon: "🎉",
      section: (
        <div className="flex flex-col gap-2">
          {event.bringDrinks && (
            <>
              <h2 className="text-base flex gap-2">
                <Beer /> If possible bring drinks with you
              </h2>
            </>
          )}
        </div>
      ),
      item: null,
    },
    VIDEO_GAME: {
      icon: "🎮",
      section: (
        <div className="flex flex-col gap-2">
          {event.bringEquipment && (
            <>
              <h2 className="text-2xl">You should bring your equipment</h2>
              <p>{event.equipmentDetails}</p>
            </>
          )}
          {event.bringDrinks && (
            <>
              <h2 className="text-base flex gap-2">
                <Beer /> If possible bring drinks with you
              </h2>
            </>
          )}
        </div>
      ),
      item: event.games.map(() => (
        <>
          <h2 className="text-2xl">Games</h2>
          <ul>
            {event.games.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        </>
      )),
    },
    BOARD_GAME: {
      icon: "🎲",
      section: (
        <div className="flex flex-col gap-2">
          {event.bringDrinks && (
            <>
              <h2 className="text-base flex gap-2">
                <Beer /> If possible bring drinks with you
              </h2>
            </>
          )}
        </div>
      ),
      item: event.games.map(() => (
        <>
          <h2 className="text-2xl">Games</h2>
          <ul>
            {event.games.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        </>
      )),
    },
  };

  const { formattedFullDate, formattedHours } = extractDateInformations(
    event.date
  );

  return (
    <main className="mx-auto w-3/5 py-8 px-4 flex flex-col gap-6 ">
      <section className="relative flex flex-col gap-4 ">
        <h1 className="text-3xl">
          {TYPE_PARTY[event.type].icon} {event.name} - {event.organizer.email}
        </h1>
        <Image
          src="/images/desktop-screen.webp"
          width={25}
          height={25}
          className="w-full h-[400px] "
          alt="..."
        />
      </section>

      <section className="flex justify-between">
        <div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl">Details</h2>
            <span className="flex gap-2">
              <CalendarIcon /> {formattedFullDate} - {formattedHours}H
            </span>
            <span className="flex gap-2">
              {" "}
              <DollarSign /> {event.price || "FREE"}
            </span>
            <span className="flex gap-2">
              <MapIcon /> {event.location.city}
            </span>
            <p className="mt-4 pl-4">{event.description}</p>
            <p className="mt-4 pl-4">{TYPE_PARTY[event.type].item}</p>
          </div>
          <div>{TYPE_PARTY[event.type].section}</div>
        </div>
        <Button>Participate </Button>
      </section>
    </main>
  );
}

export default PartyDetails;
