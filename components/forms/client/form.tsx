"use client";
import { AppButton } from "@/components";
import { TextField } from "@mui/material";
import { FormEvent, ChangeEvent, useState, MouseEvent, useEffect } from "react";
import { FormWrapper } from "../wrapper";
import { useClientActions } from "@/lib/redux/reducers/client/actions";
import classNames from "classnames";

export function ClientForm({
  client,
  submitHandler,
  cancelHandler,
}: ClientFormProps) {
  const defaultProps: CreateClientDto = {
    name: client?.name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    address: client?.address || "",
    industry: client?.industry || "",
  };

  const [props, setProps] = useState(defaultProps);
  const [feedback, setFeedback] = useState({
    msg: "",
    success: false,
  });

  const feedbackClass = classNames({
    "text-green-500": feedback.success,
    "text-red-500": !feedback.success,
  });
  const [loading, setLoading] = useState(false);

  const { createClient, updateClient } = useClientActions();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProps({
      ...props,
      [e.target.name]: e.target.value,
    });
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) {
      return;
    } else {
      setLoading(true);
    }
    if (client) {
      updateClient(client.id, props).then((res) => {
        setFeedback(res);

        setTimeout(() => {
          setFeedback({
            msg: "",
            success: false,
          });
          setLoading(false);
          cancelHandler();
        }, 2000);
      });
    } else {
      createClient(props).then((res) => {
        setFeedback(res);

        setTimeout(() => {
          setFeedback({
            msg: "",
            success: false,
          });
          setLoading(false);
          cancelHandler();
        }, 2000);
      });
    }
  }

  function onCancel() {
    if (loading) return;

    setProps(defaultProps);
    cancelHandler();
  }
  return (
    <FormWrapper cancelHandler={cancelHandler} loading={loading}>
      <form
        className="w-[280px] lg:w-[540px] p-6 flex flex-col gap-4 bg-neutral-700 rounded-lg"
        onSubmit={onSubmit}
        onReset={onCancel}
      >
        <h2 className="text-lg font-semibold text-center py-4 text-white">
          {client ? "UPDATE CLIENT" : "CREATE CLIENT"}
        </h2>
        <TextField
          name="name"
          label="Name"
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
          name="email"
          label="Email"
          variant="filled"
          className="bg-white rounded-md"
          color="app-dark"
          type="email"
          fullWidth
          required
          onChange={handleChange}
          value={props.email}
        />
        <TextField
          name="phone"
          label="Phone"
          variant="filled"
          className="bg-white rounded-md"
          color="app-dark"
          type="tel"
          fullWidth
          required
          onChange={handleChange}
          value={props.phone}
        />
        <TextField
          name="address"
          label="Address"
          variant="filled"
          className="bg-white rounded-md"
          color="app-dark"
          type="text"
          fullWidth
          required
          onChange={handleChange}
          value={props.address}
        />
        <TextField
          name="industry"
          label="Industry"
          variant="filled"
          className="bg-white rounded-md"
          color="app-dark"
          type="text"
          fullWidth
          required
          onChange={handleChange}
          value={props.industry}
        />
        <div className="flex flex-col gap-3">
          <AppButton
            size="full"
            color="alt"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {client ? "Update" : "Create"}
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
