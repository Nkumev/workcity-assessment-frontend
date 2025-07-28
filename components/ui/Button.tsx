import classNames from "classnames";
import Button from "@mui/material/Button";

export function AppButton({
  children,
  size,
  color,
  type = "button",
  onClick,
  disabled,
  className,
  variant = "contained",
}: AppBtnProps) {
  const sizeClass = classNames({
    "py-1 px-3 text-sm rounded-xl": size === "sm",
    "py-2 px-3 text-md rounded-md": size === "md",
    "py-2 px-6 text-md rounded-[8px]": size === "lg",
    "py-2 px-3 text-md rounded-[8px] w-full": size === "full",
  });

  const colorClass = classNames({
    "bg-primary hover:bg-primary-light": color === "primary",
    "bg-primary-shade text-white hover:bg-primary-neutral":
      color === "secondary",
    "bg-transparent border hover:bg-white hover:text-black hover:border-black":
      color === "tertiary",
    "bg-secondary hover:bg-[#0D783A]": color === "alt",
  });

  return (
    <Button
      className={`flex items-center justify-center font-semibold hover:cursor-pointer disabled:cursor-not-allowed transition-all duration-300 ${sizeClass} ${colorClass} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
    >
      {children}
    </Button>
  );
}
