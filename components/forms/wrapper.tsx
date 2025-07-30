"use client";
import { MouseEvent } from "react";

export function FormWrapper({
  children,
  loading,
  cancelHandler,
}: {
  children: React.ReactNode;
  loading: boolean;
  cancelHandler: () => void;
}) {
  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      if (!loading) {
        cancelHandler();
      }
    }
  };
  return (
    <div
      className="flex flex-col items-center h-[80vh] justify-center p-4"
      onClick={handleBackgroundClick}
    >
      {children}
    </div>
  );
}
