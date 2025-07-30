"use client";
import { AppButton } from "@/components";
import { TextField } from "@mui/material";
import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { FormWrapper } from "../wrapper";
import { useUserSelector } from "@/components/selector";
import { useProjectActions } from "@/lib/redux/reducers/project/actions";
import classNames from "classnames";

export function ProjectForm({
  project,
  client,
  cancelHandler,
}: ProjectFormProps) {
  const defaultProps: CreateProjectDto = {
    name: project?.name || "",
    description: project?.description || "",
    clientId: project?.clientId || client?.id || "",
    managerId: project?.managerId || undefined,
  };

  const [props, setProps] = useState(defaultProps);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    success: false,
    msg: "",
  });
  const feedbackClass = classNames({
    "text-green-500": feedback.success,
    "text-red-500": !feedback.success,
  });

  const { Selector, selected, handleSelect, users } = useUserSelector({
    required: false,
    placeholder: "Select Manager",
  });

  const { createProject, updateProject } = useProjectActions();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!client && !project) return;

    if (loading) {
      return;
    } else {
      setLoading(true);
    }

    if (project) {
      console.log("updating project");
      updateProject(project.id, props).then((res) => {
        setFeedback(res);
      });
    } else {
      createProject(props).then((res) => {
        setFeedback(res);
      });
    }

    setLoading(false);

    setTimeout(() => {
      setFeedback({
        success: false,
        msg: "",
      });
      cancelHandler();
    }, 2000);
  }

  function onCancel(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    cancelHandler();
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProps({
      ...props,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (project && project.managerId) {
      const user = users.find((user) => user.id === project.managerId);
      if (user) {
        handleSelect({ value: user.id, label: user.username });
      }
    }
  }, [project]);

  useEffect(() => {
    if (selected) {
      setProps((prev) => ({ ...prev, managerId: selected.value }));
    } else {
      setProps((prev) => ({ ...prev, managerId: undefined }));
    }
  }, [selected]);

  return (
    <FormWrapper loading={loading} cancelHandler={cancelHandler}>
      <form
        className="w-[280px] lg:w-[540px] p-6 flex flex-col gap-4 bg-neutral-700 rounded-lg"
        onSubmit={onSubmit}
        onReset={onCancel}
      >
        <h2 className="text-lg font-semibold text-center py-4 text-white">
          {project ? "UPDATE PROJECT" : "CREATE PROJECT"}
        </h2>

        <TextField
          name="name"
          label="Name"
          placeholder="Project Name"
          variant="filled"
          className="bg-white rounded-md"
          color="app-dark"
          type="text"
          fullWidth
          required
          onChange={handleChange}
          value={props.name}
        />

        <TextField
          name="description"
          label="Description"
          variant="filled"
          className="bg-white rounded-md"
          color="app-dark"
          type="text"
          fullWidth
          required
          onChange={handleChange}
          value={props.description}
        />

        {Selector}

        <div className="flex flex-col gap-3">
          <AppButton
            size="full"
            color="alt"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {project ? "Update" : "Create"}
          </AppButton>
          <AppButton size="full" color="danger" type="reset" disabled={loading}>
            Cancel
          </AppButton>
        </div>
      </form>
      <p className={feedbackClass}>{feedback.msg}</p>
    </FormWrapper>
  );
}
