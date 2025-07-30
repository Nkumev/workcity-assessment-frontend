export function TableEntryDisplay({
  page,
  limit,
  totalItems,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
      <div>
        <span className="text-sm">
          Showing {((page - 1) * limit + 1).toLocaleString()} to{" "}
          {Math.min(page * limit, totalItems).toLocaleString()} of{" "}
          {totalItems.toLocaleString()} entries
        </span>
      </div>
    </div>
  );
}
