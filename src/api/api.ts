import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "next-client-cookies";

const api = axios.create({
  baseURL: "https://back-party.vercel.app/",
});

const useAxiosConfig = () => {
  const { get } = useCookies();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (get("token")) {
          config.headers.Authorization = `Bearer ${get("token")}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [get("token")]);
};

export { api, useAxiosConfig };
