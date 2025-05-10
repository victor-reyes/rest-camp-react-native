import { useState } from "react";
import { FilterButton } from "./FilterButton";
import { FilterPopup } from "./FilterPopup";

export function Filters() {
  const [open, setOpen] = useState(false);

  const handlePress = () => setOpen(!open);

  return (
    <>
      {open && <FilterPopup setOpen={setOpen} />}
      <FilterButton handlePress={handlePress} />
    </>
  );
}
