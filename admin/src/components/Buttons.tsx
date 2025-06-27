import type { PropsWithChildren } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  onClick: () => void;
  title?: string;
  disabled?: boolean;
  className?: string;
}>;

export { Button };

export function ButtonIcon({ children, onClick, className, title, disabled }: Props) {
  return (
    <Button
      variant="default"
      size="icon"
      className={cn("size-6 [&_svg]:size-99", className)}
      onClick={onClick}
      title={title}
      disabled={disabled}>
      {children}
    </Button>
  );
}
