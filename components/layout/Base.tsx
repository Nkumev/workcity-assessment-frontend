"use client";

import { useState } from "react";
import { AppHeader } from "./headers/Base";
import { AppSidebar } from "./sidebar/Base";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  const [sidebar, openSidebar] = useState(false);
  return (
    <>
      <AppHeader toggle={() => openSidebar(true)} />
      <div
        className={`w-[200px] bg-white h-full border-l fixed z-40 left-0 transform transition-transform duration-500 ${
          sidebar ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <AppSidebar toggle={() => openSidebar(false)} />
      </div>
      <div
        className="pt-16 lg:pt-[100px]"
        onClick={() => {
          sidebar && openSidebar(false);
        }}
      >
        {children}
      </div>
    </>
  );
}
