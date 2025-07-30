import { useAppDispatch } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { userEndpoints } from "@/endpoints";
import useSWR from "swr";
import { setUserLoading, setUsers, setUsersTotal } from ".";
import { apiFetch } from "@/axios/requests";

export function useUserActions() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const [listUrl, setListUrl] = useState(userEndpoints.base);

  useEffect(() => {
    const queries: string[] = [];

    if (page && parseInt(page) > 1) {
      queries.push(`page=${page}`);
    }

    if (limit && parseInt(limit) >= 10) {
      queries.push(`limit=${limit}`);
    }

    const dist = queries.length
      ? `${userEndpoints.base}?${queries.join("&")}`
      : userEndpoints.base;
    setListUrl(dist);
  }, [searchParams]);

  function listUsers() {
    const { data, error, isLoading } = useSWR(listUrl, apiFetch);

    useEffect(() => {
      if (isLoading) {
        dispatch(setUserLoading(true));
      } else {
        dispatch(setUserLoading(false));
      }

      if (data) {
        const response: UserListResponse = data;
        console.log(response);

        dispatch(setUsers(response.data));
        dispatch(setUsersTotal(response.total));
      }

      if (error) {
        console.error(error);
        dispatch(setUsers([]));
        dispatch(setUsersTotal(0));
      }
    }, [data, error, isLoading]);
  }

  return {
    listUsers,
  };
}
