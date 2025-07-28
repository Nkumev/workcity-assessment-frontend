"use client";
import { IoCloseOutline } from "react-icons/io5";
import { NavItem } from "../../ui";
import { NavigationItems } from "@/lib/nav";
import { usePathname } from "next/navigation";

export function UserSidebar({ toggle }: UserSidebarProps) {
  const path = usePathname();

  return (
    <div className="p-4">
      <div className="flex justify-end lg:justify-between p-4 items-center">
        <h3 className="text-2xl font-bold text-white hidden lg:block">W</h3>
        <span
          onClick={toggle}
          className="border-2 border-red-500 rounded-full p-2 cursor-pointer lg:hidden"
        >
          <IoCloseOutline
            size={24}
            className="text-red-500 hover:text-red-600 transition-all duration-300"
          />
        </span>
      </div>
      <div className="hidden lg:block h-[40px]"></div>
      <nav className="flex flex-col gap-4">
        {NavigationItems.map((item, index) => (
          <NavItem key={index} nav={item} path={path} />
        ))}
      </nav>
    </div>
  );
}
