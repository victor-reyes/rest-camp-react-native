import { useEffect, useState } from "react";

const SORTS = ["name", "updated_at", "deleted"] as const;
type Sort = (typeof SORTS)[number];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DIRECTIONS = ["desc", "asc"] as const;
type Direction = (typeof DIRECTIONS)[number];

export type OrderBy = { sort: Sort; direction: Direction };

type Props = { defaultOrder?: OrderBy; onOrderChange: (order: OrderBy) => void };

export function SortMenu({
  defaultOrder = { sort: "name", direction: "asc" },
  onOrderChange,
}: Props) {
  const [currentOrder, setCurrentOrder] = useState<OrderBy>(defaultOrder);

  const handleOrderChange = (sort: Sort) => {
    setCurrentOrder(prev => {
      const newDirection: Direction =
        prev.sort === sort && prev.direction === "asc" ? "desc" : "asc";
      return { sort: sort, direction: newDirection };
    });
  };

  useEffect(() => {
    onOrderChange(currentOrder);
  }, [currentOrder, onOrderChange]);

  return (
    <div className="flex flex-row gap-2 p-2">
      {SORTS.map(type => (
        <button
          key={type}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            currentOrder.sort === type ? "font-bold" : ""
          }`}
          onClick={() => handleOrderChange(type)}>
          {getName(type)}
          {currentOrder.sort === type && (
            <span className="ml-2">{currentOrder.direction === "asc" ? "↓" : "↑"}</span>
          )}
        </button>
      ))}
    </div>
  );
}

const getName = (type: Sort): string => {
  switch (type) {
    case "name":
      return "Namn";
    case "updated_at":
      return "Uppdaterad";
    case "deleted":
      return "Raderad";
    default:
      return type;
  }
};
