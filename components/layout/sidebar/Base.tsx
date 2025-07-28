"use client";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

export function AppSidebar({ toggle }: AppSidebarProps) {
  return (
    <div className="p-4">
      <div className="flex justify-end p">
        <span
          onClick={toggle}
          className="border-2 border-red-500 rounded-full p-2 cursor-pointer"
        >
          <IoCloseOutline
            size={24}
            className="text-red-500 hover:text-red-600 transition-all duration-300"
          />
        </span>
      </div>
      <ul className="px-4">
        <li>
          <Link
            href="/"
            className="text-primary hover:text-primary-alt transition-all duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="text-primary hover:text-primary-alt transition-all duration-300"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="text-primary hover:text-primary-alt transition-all duration-300"
          >
            Services
          </Link>
        </li>
      </ul>
    </div>
  );
}
