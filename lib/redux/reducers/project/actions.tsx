"use client";
import { apiFetch } from "@/axios/requests";
import { projectEndpoints } from "@/endpoints";
import { useAppDispatch } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { setProjectLoading, setProjects, setProjectTotal } from ".";

export function useProjectActions() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  async function listProjects() {
    const { data, error, isLoading } = useSWR(listUrl(), apiFetch);

    useEffect(() => {
      if (isLoading) {
        dispatch(setProjectLoading(true));
      } else {
        dispatch(setProjectLoading(false));
      }

      if (data) {
        const response: ProjectListResponse = data;
        console.log(response);

        dispatch(setProjects(response.data));
        dispatch(setProjectTotal(response.total));
      }

      if (error) {
        console.error(error);
        dispatch(setProjects([]));
        dispatch(setProjectTotal(0));
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
      ? `${projectEndpoints.base}?${queries.join("&")}`
      : projectEndpoints.base;
  }

  async function getProject() {}

  async function createProject() {}

  async function updateProject() {}

  async function deleteProject() {}

  return {
    listProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  };
}
