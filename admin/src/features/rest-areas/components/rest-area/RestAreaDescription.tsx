import { Textarea } from "@/components";

type Props = {
  label: string;
  text: string | null;
  isEditing?: boolean;
  onChange?: (text: string) => void;
};
export function RestAreaDescription({ label, text, isEditing = false, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className=" font-semibold">{label}</label>
      <Textarea
        input={text || ""}
        onChange={onChange}
        isEditing={isEditing}
        placeholder="Ange rastplatsens beskrivning..."
        className="text-sm"
      />
    </div>
  );
}
