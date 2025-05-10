import { FilterButton } from "./FilterButton";
import { FilterPopup } from "./FilterPopup";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function Filters() {
  return (
    <FilterPopup>
      <FontAwesome name="filter" size={24} color="#aaa" />
    </FilterPopup>
  );
}
