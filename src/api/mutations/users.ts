import { CreateUpdateUser } from "@/utils/interfaces/users.interfaces";
import { api } from "../api";

export const deleteUser = async (userId: number) => {
  const { data } = await api.delete(`/users/${userId}`);
  return data;
};

export const updateUser = async (userId: number, user: CreateUpdateUser) => {
  const { data } = await api.put("/users");
  return data;
};

export const addUsers = async (user: CreateUpdateUser) => {
  const { data } = await api.post("/users", user);
  return data;
};
