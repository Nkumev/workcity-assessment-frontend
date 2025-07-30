"use client";

import { useProjectActions } from "@/lib/redux/reducers/project/actions";
import { ProjectTable } from "./Table";
import { AnimatePresence, motion } from "framer-motion";
import { appearAnimation } from "@/lib/utils";
import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { ProjectForm, DeleteForm } from "@/components/forms";

export function ProjectScreen() {
  const { project } = useAppSelector((state) => state.project);
  const { listProjects, deleteProject } = useProjectActions();
  listProjects();
  const [screen, setScreen] = useState(0);

  const pageItems = [
    <main className="p-4">
      <h2 className="text-2xl font-bold">Projects</h2>
      <ProjectTable
        onUpdate={() => setScreen(1)}
        onDelete={() => setScreen(2)}
      />
    </main>,
    <ProjectForm
      project={project}
      cancelHandler={() => {
        setScreen(0);
      }}
    />,
    <DeleteForm
      resource="Project"
      identifier={project?.name || ""}
      confirmHandler={async () => {
        await deleteProject(project?.id || "");
      }}
      cancelHandler={() => setScreen(0)}
    />,
  ];

  return (
    <AnimatePresence mode="popLayout">
      <motion.div key={screen} {...appearAnimation}>
        {pageItems[screen]}
      </motion.div>
    </AnimatePresence>
  );
}
