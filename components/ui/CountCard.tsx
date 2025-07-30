import { formatNumber } from "@/lib/utils";
import { Box, Tooltip } from "@mui/material";
import classNames from "classnames";

export function CountCard({
  count,
  currency,
  title,
  icon,
  color = "primary",
  loading,
}: CountCardProps) {
  const bannerClass = classNames(
    "flex items-center gap-3 p-3 rounded-t-lg text-white font-semibold",
    {
      "bg-primary": color === "primary",
      "bg-secondary": color === "secondary",
      "bg-primary-dark": color === "tertiary",
      "bg-primary-alt": color === "alt",
    }
  );

  const spinnerClass = classNames(
    "w-6 h-6 rounded-full border-2 border-t-transparent animate-spin",
    {
      "border-primary": color === "primary",
      "border-secondary": color === "secondary",
      "border-primary-dark": color === "tertiary",
      "border-primary-alt": color === "alt",
    }
  );
  return (
    <Box className="shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] rounded-lg bg-white">
      <div className={bannerClass}>
        {icon && icon}
        <span>{title}</span>
      </div>
      <div className="flex items-center gap-2 px-2 py-6 text-3xl font-semibold">
        {!loading && (
          <>
            {currency && "$"}
            <Tooltip title={count.toLocaleString()} placement="right">
              <span>{formatNumber(count)}</span>
            </Tooltip>
          </>
        )}
        {loading && (
          <>
            <span className={spinnerClass}></span>
          </>
        )}
      </div>
    </Box>
  );
}
