"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { Icons } from "@/components/Icon";
import {
  Event,
  EventQueries,
  EventType,
} from "@/utils/interfaces/events.interfaces";
import { extractDateInformations } from "@/utils/date/format";
import { PartysForm } from "@/components/forms/PartysForm";
import Link from "next/link";
import { useEvents, useEventsParticipations } from "@/hooks/api/useEvents";

function TableEvents(datas: EventQueries) {
  const { data } = datas;

  const [showParticipants, setShowParticipants] = React.useState(0);

  const { deleteEvent } = useEvents();

  const { updateParticipation } = useEventsParticipations(undefined, undefined);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <h2 className="text-xl text-primary">No event found</h2>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead className="hidden sm:table-cell">Date</TableHead>
          <TableHead className="hidden sm:table-cell">Location</TableHead>
          <TableHead className="text-right">Spot left</TableHead>
          <TableHead className="text-right">Participants</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((event: Event) => {
          const { formattedFullDate } = extractDateInformations(event.date);

          const colors = {
            PENDING: "bg-yellow-500",
            REJECTED: "bg-slate-900 text-white",
            APPROVED: "bg-primary",
          };

          return (
            <React.Fragment key={event.id}>
              <TableRow
                onClick={() => {
                  setShowParticipants((prev) =>
                    prev === event.id ? 0 : event.id
                  );
                }}
                className={`${
                  event.participants.length > 0
                    ? "cursor-pointer hover:bg-primary/10"
                    : ""
                }`}
              >
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {formattedFullDate}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {event.location.address} {event.location.city}{" "}
                  {event.location.zipCode} {event.location.country}
                </TableCell>
                <TableCell className=" text-right">
                  {event.remainingSpots}
                </TableCell>
                <TableCell className="text-right">
                  {event.participants.length}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <Icons.moveHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/party/${event.id}`}>View</Link>
                      </DropdownMenuItem>
                      <PartysForm event={event} />
                      <DropdownMenuItem
                        onClick={() => {
                          deleteEvent(event.id);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              {event.participants.map((participant) => {
                return (
                  <TableRow
                    key={participant.user?.id}
                    className={`py-1 ${colors[participant.status]} ${
                      showParticipants === event.id ? "" : "hidden"
                    }`}
                  >
                    <TableCell className="font-medium">
                      {participant.user?.name}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {participant.user?.email}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {participant.user?.age} y.o
                    </TableCell>
                    <TableCell className="space-x-4">
                      {participant.user?.interests.map((interest) => (
                        <span key={interest}>{interest}</span>
                      ))}
                    </TableCell>
                    {participant.status === "PENDING" && (
                      <>
                        <TableCell
                          onClick={() => {
                            updateParticipation({
                              eventId: event.id,
                              userId: participant.user?.id.toString() ?? "",
                              participations: {
                                ...participant,
                                status: "APPROVED",
                              },
                            });
                          }}
                          className="text-right text-primary font-semibold cursor-pointer"
                        >
                          APPROVE
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            updateParticipation({
                              eventId: event.id,
                              userId: participant.user?.id.toString() ?? "",
                              participations: {
                                ...participant,
                                status: "REJECTED",
                              },
                            });
                          }}
                          className="text-right text-primary font-semibold cursor-pointer"
                        >
                          DENY
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default TableEvents;
