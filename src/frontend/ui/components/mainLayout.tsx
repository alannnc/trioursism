import { ReactNode } from "react";
import { cn } from "ui/@/lib/utils";

const MainLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center px-8 max-w-screen-lg mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export { MainLayout };
