import { Input } from "@/components";

type Props = { updatedAt: string; isEditing?: boolean; onChange?: (updatedAt: string) => void };

export function RestAreaUpdatedAt({ updatedAt, isEditing = false, onChange }: Props) {
  return (
    <div className="text-gray-500 flex items-center gap-2">
      Uppdaterad:
      <Input
        className="text-xs"
        input={updatedAt ? getDateString(updatedAt) : ""}
        placeholder="Ange rastplatsens namn..."
        isEditing={isEditing}
        onChange={onChange}
      />
    </div>
  );
}
const getDateString = (date: string) =>
  new Date(date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
