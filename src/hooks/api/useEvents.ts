import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEvent,
  fetchEventParticipants,
  fetchEvents,
  fetchEventsParticipations,
} from "../../api/queries/events";
import {
  addEvent,
  addEventParticipant,
  deleteEvent,
  deleteEventParticipant,
  updateEvent,
  updateEventParticipant,
} from "../../api/mutations/events";
import {
  CreateUpdateEvent,
  Event,
  EventQueries,
} from "@/utils/interfaces/events.interfaces";
import { CustomError } from "@/utils/interfaces/errors.interfaces";
import { useAxiosConfig } from "@/api/api";
import { Participations } from "@/utils/interfaces/participations.interfaces";
import { toast } from "sonner";

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

export const useEventsParticipations = (
  eventId: number,
  userId: string | undefined
) => {
  useAxiosConfig();
  const queryClient = useQueryClient();

  const {
    data: participations,
    error: participationsError,
    isLoading: participationsLoading,
    refetch: refetchParticipations,
  } = useQuery<Participations, CustomError>({
    queryKey: ["participations", eventId],
    queryFn: async () => await fetchEventParticipants(eventId, userId ?? ""),
  });

  const addMutation = useMutation({
    mutationFn: addEventParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participations", eventId] });
      toast.success(
        "Participation asked successfully, it will now be shown in your profile"
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: {
      eventId: number;
      userId: string;
      participations: Participations;
    }) =>
      await updateEventParticipant(
        data.eventId,
        data.userId,
        data.participations
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participations", eventId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (data: { eventId: number; userId: string | undefined }) =>
      await deleteEventParticipant(data.eventId, data.userId ?? ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participations", eventId] });
      toast.success(
        "Participation deleted successfully, please refresh the page if it doesnt update"
      );
    },
  });

  return {
    addParticipation: addMutation.mutateAsync,
    updateParticipation: updateMutation.mutateAsync,
    deleteParticipation: deleteMutation.mutateAsync,
    participations,
    participationsError,
    participationsLoading,
    refetchParticipations,
  };
};
