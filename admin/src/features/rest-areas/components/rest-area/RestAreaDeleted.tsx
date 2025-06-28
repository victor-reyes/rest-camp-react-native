import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Props = { isDeleted: boolean; onChange: (isDeleted: boolean) => void; isEditing?: boolean };

export function RestAreaDeleted({ isDeleted, onChange, isEditing = false }: Props) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="deleted"
        className={cn("text-xs text-center font-semibold px-2 py-1 rounded w-full", {
          "bg-red-700 text-white": isDeleted,
          "bg-gray-200 text-gray-800": !isDeleted,
        })}>
        {isDeleted ? "Raderad" : "Aktiv"}
      </label>
      {isEditing && (
        <Switch
          id="deleted"
          checked={isDeleted}
          onCheckedChange={onChange}
          className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
        />
      )}
    </div>
  );
}
