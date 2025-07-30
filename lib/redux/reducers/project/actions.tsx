"use client";
import { apiFetch, apiPush } from "@/axios/requests";
import { projectEndpoints } from "@/endpoints";
import { useAppDispatch } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { setProjectLoading, setProjects, setProjectTotal } from ".";
import { useClientActions } from "../client/actions";

export function useProjectActions() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { url: clientUrl } = useClientActions();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const [url, setUrl] = useState(projectEndpoints.base);

  useEffect(() => {
    const queries: string[] = [];

    if (page && parseInt(page) > 1) {
      queries.push(`page=${page}`);
    }

    if (limit && parseInt(limit) >= 10) {
      queries.push(`limit=${limit}`);
    }

    const dist = queries.length
      ? `${projectEndpoints.base}?${queries.join("&")}`
      : projectEndpoints.base;
    setUrl(dist);
  }, [searchParams]);

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
        console.table(response.data);

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

  async function createProject(dto: CreateProjectDto) {
    try {
      const res: StandardResponse<IProject> = await apiPush(
        projectEndpoints.base,
        "POST",
        dto,
        clientUrl
      );

      return { success: true, msg: res.message };
    } catch (e: any) {
      return { success: false, msg: e.message };
    }
  }

  async function updateProject(id: string, dto: CreateProjectDto) {
    try {
      const res: StandardResponse<IProject> = await apiPush(
        projectEndpoints.one(id),
        "PATCH",
        dto,
        url
      );

      return { success: true, msg: res.message };
    } catch (e: any) {
      return { success: false, msg: e.message };
    }
  }

  async function deleteProject(id: string) {
    await apiPush(projectEndpoints.one(id), "DELETE", {}, url);
  }

  return {
    listProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    url,
  };
}
