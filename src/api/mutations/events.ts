import { CreateUpdateEvent } from "@/utils/interfaces/events.interfaces";
import { api } from "../api";
import { Participations } from "@/utils/interfaces/participations.interfaces";

export const addEvent = async (event: CreateUpdateEvent) => {
  const { data } = await api.post("/events", {
    ...event,
    remainingSpots: parseInt(event.remainingSpots.toString()),
  });
  return data;
};

export const updateEvent = async (
  eventId: number,
  event: CreateUpdateEvent
) => {
  const { data } = await api.put(`/events/${eventId}`, event);
  return data;
};

export const deleteEvent = async (eventId: number) => {
  const { data } = await api.delete(`/events/${eventId}`);
  return data;
};

export const addEventParticipant = async (participations: Participations) => {
  const { data } = await api.post(`/events/participations`, participations);
  return data;
};

export const deleteEventParticipant = async (
  eventId: number,
  userId: string
) => {
  const { data } = await api.delete(
    `/events/${eventId}/participations?userId=${userId}`
  );
  return data;
};

export const updateEventParticipant = async (
  eventId: number,
  userId: string,
  participations: Participations
) => {
  const { data } = await api.put(
    `/events/${eventId}/participations?userId=${userId}`,
    participations
  );
  return data;
};
