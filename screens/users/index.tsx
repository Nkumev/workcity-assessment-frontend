"use client";
import { useClientActions } from "@/lib/redux/reducers/client/actions";
import { StaffScreen } from "./staff";
import { ClientsTable } from "./Table";
import { AnimatePresence, motion } from "framer-motion";
import { appearAnimation } from "@/lib/utils";
import { useState } from "react";
import { ClientForm, DeleteForm, ProjectForm } from "@/components/forms/";
import { AppButton } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setClient } from "@/lib";

export function ClientsScreen() {
  const dispatch = useAppDispatch();
  const { client } = useAppSelector((state) => state.client);
  const { listClients, deleteClient } = useClientActions();
  listClients();
  const [screen, setScreen] = useState(0);

  const pageItems = [
    <main className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Clients</h2>
        <AppButton
          size="md"
          color="primary"
          onClick={() => {
            dispatch(setClient(null));
            setScreen(1);
          }}
        >
          Create Client
        </AppButton>
      </div>
      <ClientsTable
        onUpdate={() => setScreen(1)}
        onDelete={() => setScreen(2)}
        newProject={() => setScreen(3)}
      />
    </main>,
    <ClientForm
      client={client}
      submitHandler={() => {
        setScreen(0);
      }}
      cancelHandler={() => {
        setScreen(0);
      }}
    />,
    <DeleteForm
      resource="Client"
      identifier={client?.name || ""}
      confirmHandler={async () => deleteClient(client?.id || "")}
      cancelHandler={() => setScreen(0)}
    />,
    <ProjectForm client={client} cancelHandler={() => setScreen(0)} />,
  ];
  return (
    <AnimatePresence mode="popLayout">
      <motion.div key={screen} {...appearAnimation}>
        {pageItems[screen]}
      </motion.div>
    </AnimatePresence>
  );
}

export { StaffScreen };
