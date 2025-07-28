import Link from "next/link";
import classNames from "classnames";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdArrowDropDown } from "react-icons/md";

export function NavItem({
  nav: { name, route, icon, children },
  path,
}: NavItemProps) {
  const routePath = route.split("/").filter((item) => item !== "");
  const currentPath = path.split("/").filter((item) => item !== "");

  const isActive = route === path;

  const activeParent = routePath.every(
    (item, index) => item === currentPath[index]
  );

  const colorClass = classNames(
    "py-2 px-4 flex items-center gap-2 text-sm rounded-md transition-all duration-200 hover:bg-primary-shade hover:text-white",
    {
      "bg-background text-primary": !isActive,
      "bg-primary text-white": isActive,
    }
  );

  const accordionClass = classNames(
    "rounded-md transition-all duration-200 hover:bg-primary-shade hover:text-white",
    {
      "bg-background text-primary": !activeParent,
      "bg-primary text-white": activeParent,
    }
  );

  const pointerClass = classNames({
    "text-primary-light": !activeParent,
    "text-white": activeParent,
  });

  if (children && children.length) {
    return (
      <Accordion className="w-[160px] bg-transparent border-none shadow-none p-0">
        <AccordionSummary
          className={accordionClass}
          expandIcon={<MdArrowDropDown className={pointerClass} size={20} />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <span className="flex items-center gap-2 text-sm">
            {icon}
            {name}
          </span>
        </AccordionSummary>
        <AccordionDetails className="bg-transparent flex flex-col gap-2 items-end px-0">
          {children.map((item) => {
            const activeChild = item.route === path;

            const childClass = classNames(
              "py-2 px-4 flex items-center gap-2 text-sm rounded-md transition-all duration-200 hover:bg-primary-shade hover:text-white",
              {
                "bg-background text-primary": !activeChild,
                "bg-primary text-white": activeChild,
              }
            );
            return (
              <Link
                key={item.name}
                href={item.route}
                className={`w-[144px] ${childClass}`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </AccordionDetails>
      </Accordion>
    );
  }
  return (
    <Link href={route} className={`w-[160px] ${colorClass}`}>
      {icon}
      {name}
    </Link>
  );
}
