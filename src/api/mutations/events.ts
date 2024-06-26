import { CreateUpdateEvent } from "@/utils/interfaces/events.interfaces";
import { api } from "../api";

export const addEvent = async (event: CreateUpdateEvent) => {
  const { data } = await api.post("/events", event);
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
