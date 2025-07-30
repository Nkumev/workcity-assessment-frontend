"use client";
import { StaffTable } from "./Table";
import { useUserActions } from "@/lib/redux/reducers/users/actions";

export function StaffScreen() {
  const { listUsers } = useUserActions();
  listUsers();
  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold">Staff Members</h2>
      <StaffTable />
    </main>
  );
}
