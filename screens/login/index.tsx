"use client";
import { AppButton } from "@/components";
import { TextField } from "@mui/material";
import { FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
// import { authActions } from "@/actions";
import { useState } from "react";
import Link from "next/link";

export function LoginScreen() {
  const router = useRouter();
  //   const { useLogin } = authActions();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credentials);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <main className="flex justify-center items-center h-screen bg-neutral-300">
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
        <AppButton size="full" color="alt" type="submit">
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
    </main>
  );
}
