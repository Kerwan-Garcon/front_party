import { api } from "../api";

export const fetchEvents = async () => {
  const { data } = await api.get(`/events`);

  return data;
};

export const fetchEvent = async (id: number) => {
  const { data } = await api.get(`/events/${id}`);
  return data;
};
