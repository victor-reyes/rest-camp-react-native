import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: Props) {
  return <div className={cn("p-4 border rounded shadow-sm space-y-4", className)}>{children}</div>;
}
