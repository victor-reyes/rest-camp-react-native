import type { RestAreaWithInfo } from "@/api/supabase";
import { useState, type ReactNode } from "react";
import { AddAction } from "./Actions";

type Props = {
  currentRestAreas: RestAreaWithInfo[];
  newRestAreas: RestAreaWithInfo[];
};

const ACTIONS = ["ADDED", "UPDATED", "MERGED", "COMMITTED"] as const;
type Action = (typeof ACTIONS)[number];

export function Updates({ currentRestAreas, newRestAreas }: Props) {
  const [action, setAction] = useState<Action>("ADDED");

  const [areas, setAreas] = useState(currentRestAreas);
  const [newAreas, setNewAreas] = useState(newRestAreas);

  const handleOnCommit = ({
    added,
    updated,
    unprocessed,
  }: {
    added: RestAreaWithInfo[];
    updated: RestAreaWithInfo[];
    unprocessed: RestAreaWithInfo[];
  }) => {
    setAreas(prev => {
      const updatedAreas = [
        ...prev.map(area => {
          const updatedArea = updated.find(u => u.id === area.id);
          return updatedArea ? updatedArea : area;
        }),
        ...added,
      ];
      return updatedAreas;
    });

    setNewAreas(prev => prev.filter(area => !unprocessed.some(u => u.id === area.id)));
    setAction(prev => {
      const nextIndex = (ACTIONS.indexOf(prev) + 1) % ACTIONS.length;
      return ACTIONS[nextIndex];
    });
  };

  let actionContent: ReactNode = null;
  switch (action) {
    case "ADDED":
      actionContent = (
        <AddAction
          existingRestAreas={areas}
          newRestAreas={newAreas}
          onCommit={handleOnCommit}
        />
      );
      break;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Uppdaterade Rastplatser</h1>

      {actionContent}
    </div>
  );
}
