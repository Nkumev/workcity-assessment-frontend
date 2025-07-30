"use client";

import { AppTable } from "@/components";
import { useAppSelector } from "@/hooks";

export function StaffTable() {
  const { users, loading, total } = useAppSelector((state) => state.user);
  const headings: AppTableHeaderProps[] = [
    {
      title: "Username",
      key: "username",
      sortable: true,
    },
    {
      title: "Email",
      key: "email",
      sortable: true,
    },
    {
      title: "Role",
      key: "role",
      sortable: true,
    },
  ];

  return (
    <>
      <AppTable
        loading={loading}
        data={users}
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
