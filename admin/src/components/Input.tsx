import { useState, useEffect, type KeyboardEvent } from "react";
import { Check, X, Edit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input as UiInput } from "@/components/ui/input";
import { ButtonIcon } from "./Buttons";

type Props = {
  input: string;
  placeholder?: string;
  isEditing?: boolean;
  onChange?: (input: string) => void;
  className?: string;
};

export function Input({ input, placeholder, isEditing, onChange, className }: Props) {
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
  };

  if (editingState) {
    return (
      <div className="flex items-center gap-2">
        <UiInput
          type="text"
          value={internalValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={cn(
            "text-xl font-semibold bg-transparent border-b-2 border-blue-500 outline-none focus:border-blue-600 transition-colors",
            "min-w-0 flex-1",
            className,
          )}
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
    <div className="group flex items-center gap-2">
      <h2 className={cn("text-xl font-semibold", className)}>{input}</h2>
      {isEditing && (
        <ButtonIcon onClick={handleStartEdit} title="Ändra">
          <Edit2 />
        </ButtonIcon>
      )}
    </div>
  );
}
