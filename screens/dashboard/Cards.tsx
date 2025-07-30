"use client";

import { CountCard } from "@/components";
import { useAppSelector } from "@/hooks";
import { AiFillProduct } from "react-icons/ai";

export function DashboardCards() {
  const { isAdmin } = useAppSelector((state) => state.auth);
  const { total, loading } = useAppSelector((state) => state.project);

  return (
    <>
      <CountCard
        count={total}
        title={isAdmin ? "Total Projects" : "My Projects"}
        loading={loading}
        color="primary"
        icon={<AiFillProduct />}
      />
    </>
  );
}
