import type { RestAreaWithInfo } from "@/api/supabase";
import { RestArea } from "./RestArea";
import { addRestAreas, mergeRestAreas, updateRestAreas } from "../utils";

type Props = {
  existingRestAreas: RestAreaWithInfo[];
  newRestAreas: RestAreaWithInfo[];
  onCommit: ({
    added,
    updated,
    unprocessed,
  }: {
    added: RestAreaWithInfo[];
    updated: RestAreaWithInfo[];
    unprocessed: RestAreaWithInfo[];
  }) => void;
};

export function AddAction({ existingRestAreas, newRestAreas, onCommit }: Props) {
  const { added, unprocessed } = addRestAreas(existingRestAreas, newRestAreas);

  return (
    <div className="space-y-4">
      <CommitButton
        text="Bekräfta ändringar"
        onClick={() => onCommit({ added, updated: [], unprocessed })}
      />
      <h3 className="text-lg font-semibold text-green-700">Nya Rastplatser ({added.length})</h3>
      <ul>
        {added.map(area => (
          <li key={area.id}>
            <RestArea restArea={area} />
          </li>
        ))}{" "}
      </ul>
      <Unprocessed restAreas={unprocessed} />
    </div>
  );
}

export function UpdatedAction({ existingRestAreas, newRestAreas, onCommit }: Props) {
  console.log("Existing length:", existingRestAreas.length);
  console.log("New length:", newRestAreas.length);
  const { updated, unprocessed } = updateRestAreas(existingRestAreas, newRestAreas);

  const handleClick = () => {
    const updatedAreas = updated.map(({ versions }) => versions[0]);
    onCommit({ added: [], updated: updatedAreas, unprocessed });
  };

  return (
    <div className="space-y-4">
      <CommitButton text="Bekräfta ändringar" onClick={handleClick} />
      <h3 className="text-lg font-semibold text-green-700">
        Updaterade Rastplatser ({updated.length})
      </h3>
      <ul>
        {updated.map(updated => (
          <li key={updated.id}>
            {updated.versions.map((area, index) => (
              <RestArea restArea={area} key={index} />
            ))}
          </li>
        ))}
      </ul>
      <Unprocessed restAreas={unprocessed} />
    </div>
  );
}

export function MergedAction({ existingRestAreas, newRestAreas, onCommit }: Props) {
  const { merged, unprocessed } = mergeRestAreas(existingRestAreas, newRestAreas);

  const handleClick = () => {
    const updatedAreas = merged.map(({ versions }) => versions[0]);
    onCommit({ added: [], updated: updatedAreas, unprocessed });
  };

  return (
    <div className="space-y-4">
      <CommitButton text="Bekräfta ändringar" onClick={handleClick} />
      <h3 className="text-lg font-semibold text-green-700">
        Sammanfogade Rastplatser ({merged.length})
      </h3>
      <ul>
        {merged.map(merged => (
          <li key={merged.id}>
            {merged.versions.map((area, index) => (
              <RestArea restArea={area} key={index} />
            ))}
          </li>
        ))}
      </ul>
      <Unprocessed restAreas={unprocessed} />
    </div>
  );
}

const CommitButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <button
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={onClick}>
      {text}
    </button>
  );
};

const Unprocessed = ({ restAreas }: { restAreas: RestAreaWithInfo[] }) => {
  if (restAreas.length === 0)
    return <p className="text-gray-500">Inga ej bearbetade rastplatser.</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold text-yellow-700">Ej bearbetade Rastplatser</h3>
      <ul>
        {restAreas.map(area => (
          <li key={area.id}>
            <RestArea restArea={area} />
          </li>
        ))}
      </ul>
    </div>
  );
};
