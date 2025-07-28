import { useAppSelector } from "@/hooks";
import classNames from "classnames";

export function ProfileWidget({ show }: ProfileWidgetProps) {
  const { email } = useAppSelector((state) => state.auth);
  const menuClass = classNames(
    "profile-menu absolute top-[72px] lg:top-[100px] right-2 w-[200px] bg-primary-dark border border-primary-dark rounded-md text-white",
    { hidden: !show }
  );
  return (
    <div className={menuClass}>
      <h4 className="p-2 border-b">{email}</h4>
      <ul className="flex flex-col">
        <li className="hover:bg-primary-shade hover:text-white p-2 transition-all duration-300 cursor-pointer">
          Profile
        </li>
        <li className="hover:bg-primary-shade hover:text-white p-2 transition-all duration-300 cursor-pointer">
          Settings
        </li>
        <li
          className="hover:bg-primary-shade hover:text-white p-2 transition-all duration-300 cursor-pointer"
          // onClick={logout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}
