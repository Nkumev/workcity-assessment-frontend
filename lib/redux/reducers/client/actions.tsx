"use client";
import { apiFetch, apiPush } from "@/axios/requests";
import { clientEndpoints } from "@/endpoints";
import { useAppDispatch } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { setClientLoading, setClients, setClientTotal } from ".";

export function useClientActions() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const [url, setUrl] = useState(clientEndpoints.base);

  useEffect(() => {
    const queries: string[] = [];

    if (page && parseInt(page) > 1) {
      queries.push(`page=${page}`);
    }

    if (limit && parseInt(limit) >= 10) {
      queries.push(`limit=${limit}`);
    }

    const dist = queries.length
      ? `${clientEndpoints.base}?${queries.join("&")}`
      : clientEndpoints.base;
    setUrl(dist);
  }, [searchParams]);

  async function listClients() {
    const { data, error, isLoading } = useSWR(url, apiFetch);

    useEffect(() => {
      if (isLoading) {
        dispatch(setClientLoading(true));
      } else {
        dispatch(setClientLoading(false));
      }

      if (data) {
        const response: ClientListResponse = data;
        console.log(response);

        dispatch(setClients(response.data));
        dispatch(setClientTotal(response.total));
      }

      if (error) {
        console.error(error);
        dispatch(setClients([]));
        dispatch(setClientTotal(0));
      }
    }, [data, error, isLoading]);
  }

  function listUrl() {
    const queries: string[] = [];

    if (page && parseInt(page) > 1) {
      queries.push(`page=${page}`);
    }

    if (limit && parseInt(limit) >= 10) {
      queries.push(`limit=${limit}`);
    }

    return queries.length
      ? `${clientEndpoints.base}?${queries.join("&")}`
      : clientEndpoints.base;
  }

  async function createClient(dto: CreateClientDto) {
    try {
      const response: ClientResponse = await apiPush(
        clientEndpoints.base,
        "POST",
        dto,
        url
      );
      return { success: true, msg: response.message };
    } catch (err: any) {
      return { success: false, msg: err.message };
    }
  }

  async function updateClient(id: string, dto: CreateClientDto) {
    try {
      const response: ClientResponse = await apiPush(
        clientEndpoints.one(id),
        "PATCH",
        dto,
        url
      );
      return { success: true, msg: response.message };
    } catch (err: any) {
      return { success: false, msg: err.message };
    }
  }

  async function deleteClient(id: string) {
    return await apiPush(clientEndpoints.one(id), "DELETE", {}, url);
  }

  return {
    listClients,
    createClient,
    listUrl,
    updateClient,
    deleteClient,
  };
}
