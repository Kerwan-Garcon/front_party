import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { extractDateInformations } from "@/utils/date/format";
import { CalendarIcon, DollarSign, Loader, MapIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { useEvent, useEventsParticipations } from "@/hooks/api/useEvents";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { Card } from "../ui/card";
import { TYPE_PARTY } from "@/utils/constantes";
import { deleteEvent } from "@/api/mutations/events";
import { PartysForm } from "../forms/PartysForm";

// composant trop long à refactoriser évidemment
function PartyDetails({ eventId }: { eventId: string }) {
  const router = useRouter();

  const { get } = useCookies();

  const user = jwtDecode(get("token") ?? "");

  if (!user.sub) router.push("/");

  const { event, eventLoading } = useEvent(parseInt(eventId));
  const {
    addParticipation,
    deleteParticipation,
    participations,
    participationsLoading,
  } = useEventsParticipations(parseInt(eventId), user.sub);

  if (eventLoading)
    return (
      <main className="h-screen flex justify-center items-center">
        <Loader className="animate-spin" />
      </main>
    );

  if (!event) return notFound();

  const isOrganizer = event.organizer.id.toString() === user.sub;

  const checkParticipation = () => {
    if (participationsLoading) return <Loader className="animate-spin" />;

    if (participations?.userId === user.sub) {
      return (
        <Button
          onClick={async () => {
            await deleteParticipation({ eventId: event.id, userId: user.sub });
          }}
          disabled={participationsLoading}
        >
          Cancel participation
          <Loader
            className={participationsLoading ? "animate-spin" : "hidden"}
          />
        </Button>
      );
    }

    return (
      <Button
        onClick={async () => {
          await addParticipation({
            userId: user.sub,
            eventId: event.id,
            status: "PENDING",
            paymentStatus: event.isPaid ? "PAID" : "NONE",
          });
        }}
        disabled={
          event.participants.length >= event.remainingSpots ||
          participationsLoading
        }
      >
        Participate{" "}
        <Loader className={participationsLoading ? "animate-spin" : "hidden"} />
      </Button>
    );
  };

  const orgnaizerButtons = () => {
    return (
      <div className="flex flex-col gap-2">
        <PartysForm event={event} />
        <Button
          onClick={async () => {
            await deleteEvent(event.id);
            router.push("/events");
          }}
        >
          Delete event
        </Button>
      </div>
    );
  };

  const { formattedFullDate, formattedHours } = extractDateInformations(
    event.date
  );

  return (
    <main className="mx-auto w-3/5 py-8 px-4 flex flex-col gap-6 ">
      <section className="relative flex flex-col gap-4 mt-4 ">
        <h1 className="text-3xl">
          {TYPE_PARTY(event).icon} {event.name} - {event.organizer.email}
        </h1>
        <Image
          src={TYPE_PARTY(event).image}
          width={500}
          height={25}
          className="w-full h-[400px] object-cover bg-primary p-2 rounded-lg"
          alt="..."
        />
      </section>

      <Card className="flex justify-between p-4">
        <div className="flex flex-col gap-2">
          <span className="flex gap-2">
            <CalendarIcon className=" text-primary" /> {formattedFullDate} -{" "}
            {formattedHours}H
          </span>
          <span className="flex gap-2">
            <DollarSign className=" text-primary" /> {event.price || "FREE"}
          </span>
          <span className="flex gap-2">
            <MapIcon className=" text-primary" /> {event.location.city}
          </span>
          <div>{TYPE_PARTY(event).section}</div>
          <Separator
            className="w-[500px] mt-5 bg-primary"
            orientation="horizontal"
          />

          <p className="mt-4 pl-4 mb-4">{event.description}</p>
          <div className="mt-4 pl-4">{TYPE_PARTY(event).item}</div>
        </div>
        {isOrganizer ? orgnaizerButtons() : checkParticipation()}
      </Card>
    </main>
  );
}

export default PartyDetails;
