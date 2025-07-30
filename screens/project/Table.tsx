"use client";

import { AppButton, AppTable } from "@/components";
import { useAppSelector } from "@/hooks";
import { wordedDate } from "@/lib/utils";

export function ProjectTable() {
  const { projects, loading, total } = useAppSelector((state) => state.project);

  const headings: AppTableHeaderProps[] = [
    {
      title: "Name",
      key: "name",
      sortable: true,
    },
    {
      title: "Status",
      key: "status",
      sortable: true,
    },
    {
      title: "Client",
      key: "client.name",
      sortable: true,
    },
    {
      title: "Manager",
      key: "manager.username",
      sortable: true,
    },
    {
      title: "Created",
      key: "createdAt",
      sortable: true,
      body: (row: IProject) => <span>{wordedDate(row.createdAt)}</span>,
    },
    {
      title: "Updated",
      key: "updatedAt",
      sortable: true,
      body: (row: IProject) => <span>{wordedDate(row.updatedAt)}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      body: (row: IProject) => (
        <div className="flex gap-2">
          <AppButton size="sm" color="primary">
            View
          </AppButton>
          <AppButton size="sm" color="secondary">
            Edit
          </AppButton>
          <AppButton size="sm" color="danger">
            Delete
          </AppButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <AppTable
        loading={loading}
        data={projects}
        headings={headings}
        pageOptions={{
          page: 1,
          totalItems: total,
          limit: 20,
          changePage: () => {},
        }}
      />
    </>
  );
}
