"use client";

import { AppButton } from "@/components";
import { FormWrapper } from "./wrapper";
import { useState } from "react";
import classNames from "classnames";

export function DeleteForm({
  confirmHandler,
  cancelHandler,
  resource,
  identifier,
}: DeleteFormProps) {
  const [feedback, setFeedback] = useState({
    msg: "",
    success: false,
  });

  const feedbackClass = classNames({
    "text-green-500": feedback.success,
    "text-red-500": !feedback.success,
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (loading) return;

    setLoading(true);
    try {
      await confirmHandler();
      setFeedback({
        msg: "Deleted successfully",
        success: true,
      });
    } catch (e: any) {
      setFeedback({
        msg: e.message || "Action failed",
        success: false,
      });
    }
    setLoading(false);

    setTimeout(() => {
      setFeedback({
        msg: "",
        success: false,
      });
      cancelHandler();
    }, 2000);
  }

  return (
    <FormWrapper cancelHandler={cancelHandler} loading={loading}>
      <form
        className="w-[280px] lg:w-[540px] p-6 flex flex-col gap-4 bg-neutral-700 rounded-lg"
        onSubmit={handleSubmit}
        onReset={cancelHandler}
      >
        <h3 className="uppercase font-semibold text-2xl text-center text-white">
          Delete this {resource}?
        </h3>
        <p className="text-lg text-center text-white">{identifier}</p>
        <div className="flex flex-col gap-2">
          <AppButton
            size="full"
            color="danger"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Delete
          </AppButton>
          <AppButton size="full" color="alt" type="reset" disabled={loading}>
            Cancel
          </AppButton>
        </div>
      </form>
    </FormWrapper>
  );
}
