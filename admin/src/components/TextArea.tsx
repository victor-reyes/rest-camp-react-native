import { useState, useEffect } from "react";
import { Check, X, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea as TxtAr } from "./ui/textarea";
import { ButtonIcon } from "./Buttons";

type Props = {
  input: string;
  placeholder?: string;
  isEditing?: boolean;
  onChange?: (input: string) => void;
  className?: string;
};

export function Textarea({ input, placeholder, isEditing, onChange, className }: Props) {
  const [internalValue, setInternalValue] = useState(input);
  const [isInternalEditing, setIsInternalEditing] = useState(false);

  const editingState = isEditing && isInternalEditing;

  useEffect(() => {
    setInternalValue(input);
  }, [input]);

  const handleStartEdit = () => setIsInternalEditing(true);

  const handleSave = () => {
    const trimmedValue = internalValue.trim();
    if (trimmedValue && trimmedValue !== input) {
      onChange?.(trimmedValue);
    }
    setIsInternalEditing(false);
  };

  const handleCancel = () => {
    setInternalValue(input);
    setIsInternalEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInternalValue(e.target.value);
  };

  if (editingState) {
    return (
      <div className="flex items-center gap-2">
        <TxtAr
          value={internalValue}
          onChange={handleInputChange}
          onBlur={handleSave}
          className={cn("w-fit min-h-0", className)}
          autoFocus
          placeholder={placeholder || "..."}
        />
        <div className="flex items-center gap-1">
          <ButtonIcon onClick={handleSave} title="Spara">
            <Check />
          </ButtonIcon>
          <ButtonIcon onClick={handleCancel} title="Avbryt">
            <X />
          </ButtonIcon>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-2 px-3 py-2">
      <h2 className={cn("whitespace-pre-line", className)}>
        {internalValue || <span className="text-gray-300">Ingen text...</span>}
      </h2>
      {isEditing && (
        <ButtonIcon onClick={handleStartEdit} title="Ändra">
          <Edit2 />
        </ButtonIcon>
      )}
    </div>
  );
}
