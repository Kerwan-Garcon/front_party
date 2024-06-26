"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUser,
  fetchUsers,
  login,
  register,
} from "../../api/queries/users";
import { addUsers, deleteUser, updateUser } from "../../api/mutations/users";
import { CreateUpdateUser, User } from "@/utils/interfaces/users.interfaces";
import { useRouter } from "next/navigation";
import { useAxiosConfig } from "@/api/api";
import { toast } from "sonner";

import { useCookies } from "next-client-cookies";
import { CustomError } from "@/utils/interfaces/errors.interfaces";

export const useUsers = () => {
  useAxiosConfig();
  const queryClient = useQueryClient();

  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => await fetchUsers(),
  });

  const addMutation = useMutation({
    mutationFn: addUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { userId: number; user: CreateUpdateUser }) =>
      updateUser(data.userId, data.user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    users: users ?? [],
    usersError,
    usersLoading,
    refetchUsers,
    addUser: addMutation.mutate,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
  };
};

export const useUser = (userId: number) => {
  useAxiosConfig();
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  return {
    user,
    userError,
    userLoading,
    refetchUser,
  };
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { set } = useCookies();

  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      login(data.email, data.password),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      set("token", data.access_token);
      router.push("/home");
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error("Invalid credentials");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      register(data.email, data.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    signIn: loginMutation.mutate,
    signUp: registerMutation.mutate,
  };
};
