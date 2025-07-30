import { FaSort } from "react-icons/fa";
import {
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineKeyboardDoubleArrowDown,
} from "react-icons/md";

export function TableSortIcon({ sortOrder, sorted }: TableSortProps) {
  if (sorted && sortOrder === 1) {
    return (
      <span className="flex px-1 justify-center items-center">
        <MdOutlineKeyboardDoubleArrowUp />
      </span>
    );
  }

  if (sorted && sortOrder === -1) {
    return (
      <span className="flex px-1 justify-center items-center">
        <MdOutlineKeyboardDoubleArrowDown />
      </span>
    );
  }
  return <FaSort />;
}
