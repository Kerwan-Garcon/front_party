import { api } from "../api";

export const fetchEvents = async () => {
  const { data } = await api.get(`/events`);

  return data;
};

export const fetchEvent = async (id: number) => {
  const { data } = await api.get(`/events/${id}`);
  return data;
};

export const fetchEventParticipants = async (id: number, userId: string) => {
  const { data } = await api.get(
    `/events/${id}/participations?userId=${userId}`
  );
  return data;
};

export const fetchEventsParticipations = async () => {
  const { data } = await api.get(`/events/participations`);
  return data;
};
