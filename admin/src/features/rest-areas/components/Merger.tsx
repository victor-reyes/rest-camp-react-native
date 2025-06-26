import type { RestAreaWithInfo } from "@/api/supabase";
import { useState } from "react";
import { merger, type MergeState } from "../utils/merger";
import { RestArea } from "./RestArea";

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
    const mergedState = merger.merge(mergeState);
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

      <ul>
        {mergeState.updated.map(update => (
          <li key={update.original.id}>
            <strong>Original:</strong> <RestArea restArea={update.original} />
            {update.versions.length > 0 && (
              <>
                <strong>Versioner:</strong>
                <ul>
                  {update.versions.map(version => (
                    <li key={version.id}>
                      <RestArea restArea={version} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const getActionText = (mergeState: MergeState) => {
  const { action, unprocessed } = mergeState;
  const numOfUnprocessed = unprocessed.length;
  const numOfUpdated = mergeState.updated.length;

  switch (action) {
    case "ready":
      return `Redo att bearbeta  ${numOfUnprocessed} områden`;
    case "add":
      return `Lägger till ${numOfUpdated} nya områden`;
    case "update":
      return `Uppdaterar ${numOfUpdated} befintliga områden`;
    case "merge":
      return `Slår samman ${numOfUpdated} överlappande områden`;
    case "done":
      return "Alla områden har bearbetats";
  }
};
