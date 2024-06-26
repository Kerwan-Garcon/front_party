import { api } from "../api";

export const login = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const register = async (email: string, password: string) => {
  const { data } = await api.post("/auth/register", { email, password });
  return data;
};
export const logout = async () => {
  const { data } = await api.post("/users/logout");
  return data;
};

export const fetchUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

export const fetchUser = async (userId: number) => {
  const { data } = await api.get(`/users/${userId}`);
  return data;
};
