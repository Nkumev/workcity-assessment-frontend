import { RiHome2Fill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

export const NavigationItems: SideBarItem[] = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: <RiHome2Fill />,
  },

  {
    name: "Projects",
    route: "/project",
    icon: <AiFillProduct />,
  },
  {
    name: "Users",
    route: "/user",
    icon: <FaUserCircle />,
    children: [
      {
        name: "Clients",
        route: "/user/client",
      },
      {
        name: "Admin",
        route: "/user/admin",
      },
    ],
  },
];
