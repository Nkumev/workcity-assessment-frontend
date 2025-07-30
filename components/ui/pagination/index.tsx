"use client";

import { GrPrevious, GrNext } from "react-icons/gr";
import { FormEvent, useState } from "react";
import classNames from "classnames";
import { AppButton } from "..";

export function AppPagination({
  page,
  totalItems,
  limit,
  changePage,
}: PaginationProps) {
  const [target, setTarget] = useState<number>(page);

  const totalPages = Math.ceil(totalItems / limit);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    target && changePage(target);
  }

  return (
    <div className="page-comp flex flex-col lg:flex-row items-center gap-2">
      <div className="flex gap-2">
        <span
          className="p-3 border border-primary-dark rounded-full cursor-pointer"
          onClick={() => {
            if (page > 1) {
              changePage(page - 1);
            }
          }}
        >
          <GrPrevious />
        </span>

        <div className="flex gap-1 items-center">
          <span>{page}</span>
          <span>of</span>
          <span>{totalPages || 1}</span>
        </div>

        <span
          className="p-3 border border-primary-dark rounded-full cursor-pointer"
          onClick={() => {
            if (page < totalPages) {
              changePage(page + 1);
            }
          }}
        >
          <GrNext />
        </span>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <label htmlFor="target" className="flex items-center gap-1">
          <span>Go</span>
          <span>to</span>
          <span>page</span>
        </label>
        <input
          type="number"
          className={classNames(
            "rounded-lg no-spin border border-primary-dark bg-background focus:border-primary focus:outline-none p-2",
            {
              "w-14": totalPages < 10000,
              "w-20": totalPages >= 10000,
            }
          )}
          value={target}
          onChange={(e) => {
            const notNumber = isNaN(Number(e.target.value));

            if (notNumber) {
              return;
            }

            const dist = parseInt(e.target.value);

            setTarget(dist);
          }}
        />
        <AppButton
          color="secondary"
          size="md"
          type="submit"
          disabled={!target || target < 0 || target > totalPages}
        >
          Go
        </AppButton>
      </form>
    </div>
  );
}
