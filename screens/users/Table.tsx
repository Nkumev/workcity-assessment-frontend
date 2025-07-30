"use client";

import { AppButton, AppTable } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setClient } from "@/lib";

export function ClientsTable({
  onUpdate,
  onDelete,
  newProject,
}: {
  onUpdate: () => void;
  onDelete: () => void;
  newProject: () => void;
}) {
  const dispatch = useAppDispatch();
  const { clients, loading, total } = useAppSelector((state) => state.client);

  const headings: AppTableHeaderProps[] = [
    { title: "Name", key: "name", sortable: true },
    { title: "Email", key: "email", sortable: true },
    { title: "Phone", key: "phone", sortable: true },
    {
      title: "Open Projects",
      key: "_count.projects",
      sortable: true,
      body: (row: IClient) => (
        <span>{row._count?.projects.toLocaleString() || 0}</span>
      ),
    },
    { title: "Address", key: "address", sortable: true },
    { title: "Industry", key: "industry", sortable: true },
    {
      title: "Actions",
      key: "actions",
      body: (row: IClient) => (
        <div className="flex gap-2">
          <AppButton
            size="sm"
            color="primary"
            onClick={() => {
              dispatch(setClient(row));
              onUpdate();
            }}
          >
            update
          </AppButton>
          <AppButton
            size="sm"
            color="secondary"
            onClick={() => {
              dispatch(setClient(row));
              newProject();
            }}
          >
            + project
          </AppButton>
          <AppButton
            size="sm"
            color="danger"
            onClick={() => {
              dispatch(setClient(row));
              onDelete();
            }}
          >
            delete
          </AppButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <AppTable
        loading={loading}
        data={clients}
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
