import { TableEntryDisplay } from "./data";
import { AppPagination } from "../pagination";

export function AppTableFooter(props: PaginationProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row items-center p-4 w-full lg:justify-between">
      <TableEntryDisplay {...props} />
      <AppPagination {...props} />
    </div>
  );
}
