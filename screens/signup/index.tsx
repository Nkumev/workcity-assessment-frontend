"use client";
import { AppButton } from "@/components";
import { TextField } from "@mui/material";
import { FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useAuthActions } from "@/lib";
import classNames from "classnames";

export function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuthActions();
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    adminKey: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState<boolean>();

  useEffect(() => {
    setCredentials((prev) => ({ ...prev, adminKey: "" }));
  }, [isAdmin]);

  const feebackClass = classNames("pt-6", {
    "text-green-500": success,
    "text-red-500": !success,
    hidden: !feedback,
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);

      const { adminKey, ...rest } = credentials;

      const payload = isAdmin ? credentials : rest;
      signup(payload).then((res) => {
        if (res.success) {
          setFeedback(res.msg);
          setSuccess(true);
          router.push("/login");
        } else {
          setFeedback(res.msg);
          setSuccess(false);
        }
        setLoading(false);
        setCredentials({
          username: "",
          email: "",
          password: "",
          adminKey: "",
        });

        setTimeout(() => {
          setFeedback("");
        }, 2000);
      });
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <main className="flex flex-col justify-center items-center h-screen bg-neutral-300">
      <form
        className="w-[280px] lg:w-[540px] p-6 flex flex-col gap-4 bg-neutral-700 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-semibold text-center py-4 text-white">
          SIGNUP
        </h2>
        <TextField
          name="username"
          label="Username"
          variant="filled"
          className="bg-white rounded-md"
          color="app-dark"
          type="text"
          fullWidth
          required
          onChange={handleChange}
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
        {isAdmin && (
          <TextField
            name="adminKey"
            label="Admin Key"
            variant="filled"
            className="bg-white rounded-md"
            color="app-dark"
            type="password"
            required={isAdmin}
            fullWidth
            onChange={handleChange}
          />
        )}
        <AppButton
          size="full"
          color="alt"
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Sign Up
        </AppButton>
        <div className="h-4"></div>
        <div className="flex flex-col lg:flex-row justify-between gap-2">
          <span
            className="text-blue-300 text-center lg:text-left cursor-pointer hover:text-blue-600"
            onClick={() => setIsAdmin(!isAdmin)}
          >
            {isAdmin ? "Not an Admin?" : "Admin?"}
          </span>
          <p className="text-white text-center lg:text-right">
            Have an account already?{" "}
            <Link
              href="/login"
              className="text-blue-300 cursor-pointer hover:text-blue-600"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
      <p className={feebackClass}>{feedback}</p>
    </main>
  );
}
