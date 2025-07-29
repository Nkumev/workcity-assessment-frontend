"use client";
import { AppButton } from "@/components";
import { TextField } from "@mui/material";
import { FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import classNames from "classnames";
import { useAuthActions } from "@/lib/redux/reducers/auth/actions";

export function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthActions();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      login(credentials).then((res) => {
        if (res.success) {
          setSuccess(true);
          setFeedback(res.msg);
          setLoading(false);
        } else {
          setSuccess(false);
          setFeedback(res.msg);
          setLoading(false);
        }
      });
      setLoading(false);
      setTimeout(() => {
        setFeedback("");
      }, 2000);
    }

    return;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState<boolean>();

  const feebackClass = classNames("pt-6", {
    "text-green-500": success,
    "text-red-500": !success,
    hidden: !feedback,
  });
  return (
    <main className="flex flex-col justify-center items-center h-screen bg-neutral-300">
      <form
        className="w-[280px] lg:w-[540px] p-6 flex flex-col gap-4 bg-neutral-700 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold text-center py-4 text-white">
          LOGIN
        </h2>
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
        />
        <TextField
          name="password"
          label="Password"
          variant="filled"
          className="bg-white rounded-md"
          color="app-dark"
          type="password"
          required
          fullWidth
          onChange={handleChange}
        />
        <AppButton
          size="full"
          color="alt"
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Login
        </AppButton>
        <div className="h-4"></div>
        <p className="text-white text-right">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-primary-light cursor-pointer hover:text-primary-alt"
          >
            Sign Up
          </Link>
        </p>
      </form>
      <p className={feebackClass}>{feedback}</p>
    </main>
  );
}
