import type { RestAreaWithInfo } from "@/api/supabase";
import { useState, type ReactNode } from "react";
import { AddAction, MergedAction, UpdatedAction } from "./Actions";

type Props = {
  defaultCurrent: RestAreaWithInfo[];
  defaultNew: RestAreaWithInfo[];
};

const ACTIONS = ["ADDED", "UPDATED", "MERGED", "COMMITTED"] as const;
type Action = (typeof ACTIONS)[number];

export function Updates({ defaultCurrent, defaultNew }: Props) {
  const [action, setAction] = useState<Action>("ADDED");

  const [areas, setAreas] = useState(defaultCurrent);
  const [newAreas, setNewAreas] = useState(defaultNew);

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
      console.log(`prev: ${prev.length}, updated: ${updated.length}, added: ${added.length}`);
      return updatedAreas;
    });

    console.log("# of unprocessed areas:", unprocessed.length);
    setNewAreas(prev => prev.filter(area => unprocessed.some(u => u.id === area.id)));
    setAction(prev => {
      const nextIndex = (ACTIONS.indexOf(prev) + 1) % ACTIONS.length;
      return ACTIONS[nextIndex];
    });
  };

  let actionContent: ReactNode = null;
  switch (action) {
    case "ADDED":
      actionContent = (
        <AddAction existingRestAreas={areas} newRestAreas={newAreas} onCommit={handleOnCommit} />
      );
      break;
    case "UPDATED":
      actionContent = (
        <UpdatedAction
          existingRestAreas={areas}
          newRestAreas={newAreas}
          onCommit={handleOnCommit}
        />
      );
      break;
    case "MERGED":
      actionContent = (
        <MergedAction existingRestAreas={areas} newRestAreas={newAreas} onCommit={handleOnCommit} />
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
