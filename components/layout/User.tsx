"use client";

import { useState } from "react";
import { UserHeader } from "./headers/Admin";
import { UserSidebar } from "./sidebar/User";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

export function UserLayout({ children }: { children: React.ReactNode }) {
  const [sidebar, openSidebar] = useState(false);
  const [profile, openProfile] = useState(false);

  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <div
        className={`w-[200px] bg-primary-dark h-full border-l fixed z-40 left-0 transform transition-transform duration-500 ${
          sidebar ? "translate-x-0" : "translate-x-[-100%] lg:translate-x-0"
        }`}
      >
        <UserSidebar toggle={() => openSidebar(false)} />
      </div>
      <UserHeader
        toggle={() => openSidebar(true)}
        toggleProfile={() => {
          openProfile((prev) => !prev);
        }}
        profile={profile}
      />

      <div
        className="pt-16 lg:pt-[100px] lg:pl-[200px] h-screen bg-background"
        onClick={() => {
          sidebar && openSidebar(false);
          profile && openProfile(false);
        }}
      >
        {children}
      </div>
    </PrimeReactProvider>
  );
}
