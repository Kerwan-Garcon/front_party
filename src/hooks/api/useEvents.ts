import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import {
  fetchEvent,
  fetchEventParticipants,
  fetchEvents,
  fetchUserEvents,
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
import { Participations } from "@/utils/interfaces/participations.interfaces";
import { toast } from "sonner";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

const refetchEventRelatedQueries = (queryClient: QueryClient) => {
  queryClient.refetchQueries({ queryKey: ["events"] });
  queryClient.refetchQueries({ queryKey: ["event"] });
  queryClient.refetchQueries({ queryKey: ["userEvents"] });
  queryClient.refetchQueries({ queryKey: ["participations"] });
};

export const useEvents = () => {
  const queryClient = useQueryClient();

  const {
    data: events,
    error: eventsError,
    isLoading: eventsLoading,
    refetch: refetchEvents,
  } = useQuery<EventQueries, CustomError>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    refetchInterval: 60000, // Refetch every minute
  });

  const addMutation = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      refetchEventRelatedQueries(queryClient);
      toast.success("Event added successfully");
    },
    onError: (error: AxiosError<CustomError>) => {
      toast.error(error.response?.data.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { eventId: number; event: CreateUpdateEvent }) =>
      updateEvent(data.eventId, data.event),
    onSuccess: () => {
      refetchEventRelatedQueries(queryClient);
      toast.success("Event updated successfully");
    },
    onError: (error: AxiosError<CustomError>) => {
      toast.error(error.response?.data.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      refetchEventRelatedQueries(queryClient);
      toast.success("Event deleted successfully");
    },
    onError: (error: AxiosError<CustomError>) => {
      toast.error(error.response?.data.message);
    },
  });

  return {
    addEvent: addMutation.mutateAsync,
    updateEvent: updateMutation.mutateAsync,
    deleteEvent: deleteMutation.mutateAsync,
    events,
    eventsError,
    eventsLoading,
    refetchEvents,
  };
};

export const useEvent = (eventId: number) => {
  const queryClient = useQueryClient();

  const {
    data: event,
    error: eventError,
    isLoading: eventLoading,
    refetch: refetchEvent,
  } = useQuery<Event, CustomError>({
    queryKey: ["event"],
    queryFn: () => fetchEvent(eventId),
    refetchInterval: 60000, // Refetch every minute
  });

  return {
    event,
    eventError,
    eventLoading,
    refetchEvent,
  };
};

export const useEventsParticipations = (
  eventId: number | undefined,
  userId: string | undefined
) => {
  const queryClient = useQueryClient();

  const queryKey = ["participations", eventId, userId];

  const {
    data: participations,
    error: participationsError,
    isLoading: participationsLoading,
    refetch: refetchParticipations,
  } = useQuery<Participations, CustomError>({
    queryKey,
    queryFn: () => fetchEventParticipants(eventId ?? 0, userId ?? ""),
    refetchInterval: 60000, // Refetch every minute
    enabled: !!eventId && !!userId,
  });

  const addMutation = useMutation({
    mutationFn: addEventParticipant,
    onSuccess: (newParticipation) => {
      queryClient.setQueryData(
        queryKey,
        (oldData: Participations | undefined) => {
          return { ...oldData, ...newParticipation };
        }
      );
      toast.success(
        "Participation asked successfully, it will now be shown in your profile"
      );
      // Delayed refetch to ensure backend has processed the addition
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey });
      }, 1000);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: {
      eventId: number;
      userId: string;
      participations: Participations;
    }) =>
      updateEventParticipant(data.eventId, data.userId, data.participations),
    onSuccess: (updatedParticipation) => {
      queryClient.setQueryData(
        queryKey,
        (oldData: Participations | undefined) => {
          return { ...oldData, ...updatedParticipation };
        }
      );
      queryClient.refetchQueries({ queryKey });
      toast.success("Participation status updated successfully");
    },
    onError: (error: AxiosError<CustomError>) => {
      toast.error(error.response?.data.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (data: { eventId: number; userId: string | undefined }) =>
      deleteEventParticipant(data.eventId, data.userId ?? ""),
    onMutate: async (deleteData) => {
      await queryClient.cancelQueries({ queryKey });
      const previousParticipations =
        queryClient.getQueryData<Participations>(queryKey);
      queryClient.setQueryData(queryKey, undefined);
      return { previousParticipations };
    },
    onError: (err, deleteData, context) => {
      queryClient.setQueryData(queryKey, context?.previousParticipations);
      toast.error("Failed to delete participation");
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey });
    },
    onSuccess: () => {
      toast.success("Participation deleted successfully");
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

export const useUserEvents = () => {
  const { get } = useCookies();
  const user = jwtDecode(get("token") ?? "").sub;
  const queryClient = useQueryClient();

  const {
    data: userEvents,
    error: userEventsError,
    isLoading: userEventsLoading,
    refetch: refetchUserEvents,
  } = useQuery<EventQueries, CustomError>({
    queryKey: ["userEvents", user],
    queryFn: () => fetchUserEvents(user ?? ""),
    refetchInterval: 60000, // Refetch every minute
    enabled: !!user,
  });

  return {
    userEvents,
    userEventsError,
    userEventsLoading,
    refetchUserEvents,
  };
};
