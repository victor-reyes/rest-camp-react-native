import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Status } from "../../types";
import { cn } from "@/lib/utils";

{
  /* <span
            className={cn(
              "font-semibold text-white py-1 px-4 m-1 rounded-2xl",
              restArea.status === "inOperation" ? "bg-green-700"
              : restArea.status === "limitedOperation" ? "bg-yellow-700"
              : "bg-red-700",
            )}>
            Status:{" "}
            {restArea.status === "inOperation" ?
              "I drift"
            : restArea.status === "limitedOperation" ?
              "Begränsad drift"
            : "Ej i drift"}
          </span> */
}

type Props = { status: Status; isEditing?: boolean; onChange?: (status: Status) => void };

export function RestAreaStatus({ status, isEditing = false, onChange }: Props) {
  if (isEditing)
    return (
      <Select onValueChange={onChange} value={status}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="inOperation">
            <span className="font-semibold text-green-800">I drift</span>
          </SelectItem>
          <SelectItem value="limitedOperation">
            <span className="font-semibold text-yellow-800">Begränsad drift</span>
          </SelectItem>
          <SelectItem value="notInOperation">
            <span className="font-semibold text-red-800">Ej i drift</span>
          </SelectItem>
        </SelectContent>
      </Select>
    );

  return (
    <div
      className={cn(
        "w-fit font-semibold text-white py-1 px-4 rounded-2xl",
        getBackgroundColor(status),
      )}>
      Status: {getStatusText(status)}
    </div>
  );
}

const getStatusText = (status: Status) => {
  switch (status) {
    case "inOperation":
      return "I drift";
    case "limitedOperation":
      return "Begränsad drift";
    case "outOfService":
      return "Ej i drift";
  }
};
const getBackgroundColor = (status: Status) => {
  switch (status) {
    case "inOperation":
      return "bg-green-700";
    case "limitedOperation":
      return "bg-yellow-700";
    case "outOfService":
      return "bg-red-700";
  }
};
