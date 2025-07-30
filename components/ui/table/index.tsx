import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "@mui/material";
import { AppTableFooter } from "./footer";
import { TableSortIcon } from "./sort";
import classNames from "classnames";

export function AppTable<T>({
  headings,
  data,
  loading,
  pageOptions,
  rowClick,
}: AppTableProps<T>) {
  const placeholder = Array.from({ length: pageOptions.limit }, (_, i) => ({
    load: true,
  }));
  return (
    <div className="flex flex-col bg-[#fff8f8] p-[20px] items-center rounded-[20px]">
      <div className="w-full">
        <DataTable<any>
          value={loading ? placeholder : data}
          size="small"
          removableSort
          emptyMessage={
            <div className="w-full text-center">No data available</div>
          }
          onRowClick={(e) => {
            if (!loading && rowClick) rowClick(e.data as any);
          }}
          sortIcon={TableSortIcon}
          rowClassName={() =>
            classNames({
              "bg-[#fff8f8] hover:bg-highlight transition-all duration-300":
                !loading,
            })
          }
          className="outline-primary"
        >
          {headings.map((heading) => (
            <Column
              key={heading.key}
              field={loading ? "load" : heading.key}
              header={heading.node ?? heading.title.toUpperCase()}
              sortable={heading.sortable ? heading.sortable : false}
              body={loading ? <Skeleton /> : heading.body ?? undefined}
              headerClassName="bg-primary text-white text-sm font-[600]"
            />
          ))}
        </DataTable>
        <AppTableFooter {...pageOptions} />
      </div>
    </div>
  );
}
