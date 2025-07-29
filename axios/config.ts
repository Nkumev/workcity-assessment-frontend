import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

const api = axios.create({
  baseURL,
});

export async function retrieveAuthToken() {
  const response = await fetch("/api/auth");

  if (response.ok) {
    const result = await response.json();

    return result.token;
  } else {
    return null;
  }
}

api.interceptors.request.use(async (config) => {
  const auth = await retrieveAuthToken();

  if (auth) {
    config.headers.Authorization = `Bearer ${auth}`;
  }

  return config;
});

export const API = api;
