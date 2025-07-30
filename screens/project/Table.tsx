"use client";

import { AppButton, AppTable } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setProject } from "@/lib";
import { wordedDate } from "@/lib/utils";

export function ProjectTable({
  onUpdate,
  onDelete,
}: {
  onUpdate: () => void;
  onDelete: () => void;
}) {
  const dispatch = useAppDispatch();
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
          <AppButton
            size="sm"
            color="secondary"
            onClick={() => {
              dispatch(setProject(row));
              onUpdate();
            }}
          >
            Edit
          </AppButton>
          <AppButton
            size="sm"
            color="danger"
            onClick={() => {
              dispatch(setProject(row));
              onDelete();
            }}
          >
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
