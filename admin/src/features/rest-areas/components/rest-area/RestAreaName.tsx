import { Input } from "@/components";

type Props = { name: string; isEditing?: boolean; onChange?: (name: string) => void };
export function RestAreaName({ name, isEditing = false, onChange }: Props) {
  return (
    <h2 className="text-xl font-semibold">
      <Input
        input={name}
        placeholder="Ange rastplatsens namn..."
        isEditing={isEditing}
        onChange={onChange}
      />
    </h2>
  );
}
