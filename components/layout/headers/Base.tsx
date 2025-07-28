"use client";

import { MdOutlineMenu } from "react-icons/md";
import Link from "next/link";
import { AppButton } from "@/components";
import { usePathname, useRouter } from "next/navigation";

export function AppHeader({ toggle }: AppHeaderProps) {
  const router = useRouter();
  const path = usePathname();
  return (
    <header className="flex fixed top-0 z-30 bg-primary-dark h-16 md:h-[100px] text-white w-full items-center p-4 justify-between font-sans border-b">
      <div className="hidden md:block w-[12%]"></div>
      <span
        className="border rounded-md p-2 block md:hidden cursor-pointer"
        onClick={toggle}
      >
        <MdOutlineMenu />
      </span>
      <Link href={"/"} className="font-sans font-semibold text-2xl">
        WORKCITY &reg;
      </Link>
      <nav className="hidden md:block">
        <ul className="flex gap-6">
          <li>
            <Link
              href="/"
              className="text-white hover:text-blue-300 transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-white hover:text-blue-300 transition-all duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-white hover:text-blue-300 transition-all duration-300"
            >
              Services
            </Link>
          </li>
        </ul>
      </nav>
      <AppButton
        size="md"
        color="alt"
        onClick={() => {
          console.log(path);
          let dist = "/";
          switch (path) {
            case "/":
              dist = "/login";
              break;
            case "/login":
              dist = "/signup";
              break;
            case "/signup":
              dist = "/login";
              break;
            default:
              dist = "/";
              break;
          }
          router.push(dist);
        }}
      >
        Get Started
      </AppButton>
      <div className="hidden md:block w-[12%]"></div>
    </header>
  );
}
