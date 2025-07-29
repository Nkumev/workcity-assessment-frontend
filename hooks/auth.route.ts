"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from ".";
import { useEffect } from "react";
import { retrieveAuthToken } from "@/axios/config";

const BASE_ROUTES = ["/", "/login", "/signup"];

export function AuthAutoRouter() {
  const { loggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    retrieveAuthToken().then((res) => {
      if (res) {
        if (BASE_ROUTES.includes(path)) {
          router.push("/dashboard");
        }
      } else {
        if (!BASE_ROUTES.includes(path)) {
          router.push("/login");
        }
      }
    });
  }, [loggedIn, path]);

  return null;
}
