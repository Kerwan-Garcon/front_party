import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEvent, fetchEvents } from "../../api/queries/events";
import { addEvent, deleteEvent, updateEvent } from "../../api/mutations/events";
import {
  CreateUpdateEvent,
  Event,
  EventQueries,
} from "@/utils/interfaces/events.interfaces";
import { CustomError } from "@/utils/interfaces/errors.interfaces";
import { useAxiosConfig } from "@/api/api";

export const useEvents = () => {
  useAxiosConfig();
  const queryClient = useQueryClient();

  const {
    data: events,
    error: eventsError,
    isLoading: eventsLoading,
    refetch: refetchEvents,
  } = useQuery<EventQueries, CustomError>({
    queryKey: ["events"],
    queryFn: async () => await fetchEvents(),
  });

  const addMutation = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { eventId: number; event: CreateUpdateEvent }) =>
      updateEvent(data.eventId, data.event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return {
    events,
    eventsError,
    eventsLoading,
    refetchEvents,
    addEvent: addMutation.mutate,
    updateEvent: updateMutation.mutate,
    deleteEvent: deleteMutation.mutate,
  };
};

export const useEvent = (eventId: number) => {
  useAxiosConfig();
  const {
    data: event,
    error: eventError,
    isLoading: eventLoading,
    refetch: refetchEvent,
  } = useQuery<Event, CustomError>({
    queryKey: ["event", eventId],
    queryFn: () => fetchEvent(eventId),
  });

  return {
    event,
    eventError,
    eventLoading,
    refetchEvent,
  };
};
