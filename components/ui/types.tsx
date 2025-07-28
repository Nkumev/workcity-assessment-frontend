type AppBtnProps = {
  children: React.ReactNode;
  size: "sm" | "md" | "lg" | "full";
  color: "primary" | "secondary" | "tertiary" | "alt";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "contained" | "outlined" | "text";
};
