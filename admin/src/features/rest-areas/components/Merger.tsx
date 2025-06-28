import type { RestAreaWithInfo } from "@/api/supabase";
import { useState } from "react";
import { merger, type Action, type AreasUpdate, type MergeState } from "../utils";
import { RestArea } from "./rest-area";
import { Card } from "@/components";
import { VersionedRestArea } from "./rest-area/VersionedRestArea";

type Props = {
  defaultCurrent: RestAreaWithInfo[];
  defaultNew: RestAreaWithInfo[];
};

export function Merger({ defaultCurrent, defaultNew }: Props) {
  const [mergeState, setMergeState] = useState<MergeState>({
    action: "ready",
    current: [...defaultCurrent],
    unprocessed: [...defaultNew],
    updated: [],
  });

  const handleMerge = () => {
    if (mergeState.action === "done") {
      alert("All areas processed");
      return;
    }

    const mergedState = merger.updateState(mergeState);
    const nextBatch = merger.getNextBatch(mergedState);
    if (nextBatch.error) {
      alert(`Error: ${nextBatch.error.message}`);
      return;
    }
    setMergeState(nextBatch.result);
  };

  return (
    <div>
      <button
        onClick={handleMerge}
        disabled={mergeState.action === "done"}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
        {getActionText(mergeState)}
      </button>

      <p className="text-gray-500 mt-2">
        {mergeState.unprocessed.length > 0 ?
          <span>{mergeState.unprocessed.length} områden kvar att bearbeta.</span>
        : <span>Inga fler områden kvar att bearbeta.</span>}
      </p>

      <ul className="mt-4 space-y-4">
        {mergeState.updated.map(update => (
          <li key={update.original.id}>
            <Card>
              <RestAreaUpdate action={mergeState.action} update={update} />
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

const getActionText = (mergeState: MergeState): string => {
  const { action, updated } = mergeState;
  const numOfUpdated = updated.length;

  switch (action) {
    case "ready":
      return `Starta uppdateringen`;
    case "add":
      return `Lägger till ${numOfUpdated} nya områden`;
    case "update":
      return `Uppdaterar ${numOfUpdated} befintliga områden`;
    case "merge":
      return `Slår samman ${numOfUpdated} överlappande områden`;
    case "done":
      return "Alla områden har bearbetats";
    case "skip":
      return `Tar bort och hoppar över ${numOfUpdated} updaterade områden`;
  }
};

type RestAreaUpdateProps = {
  action: Action;
  update: AreasUpdate;
};
const RestAreaUpdate = ({ action, update }: RestAreaUpdateProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Uppdatering för {update.original.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800">
            {isEditing ? "Spara" : "Ändra"}
          </button>
        </div>
      </div>

      {action === "add" ?
        <RestArea restArea={update.latest} isEditing={isEditing} />
      : <VersionedRestArea versions={[update.original, update.latest]} isEditing={isEditing} />}
    </>
  );
};
