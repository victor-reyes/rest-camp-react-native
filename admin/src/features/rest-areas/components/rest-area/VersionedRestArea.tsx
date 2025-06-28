import type { RestAreaWithInfo } from "@/api/supabase";
import { RestAreaName } from "./RestAreaName";
import { RestAreaUpdatedAt } from "./RestAreaUpdatedAt";
import { RestAreaStatus } from "./RestAreaStatus";
import { RestAreaDescription } from "./RestAreaDescription";
import { RestAreaGallery } from "./RestAreaGallery";
import { RestAreaServices } from "./RestAreaServices";
import type { Service, Status } from "../../types";
import { useEffect, useState } from "react";
import { RestAreaDeleted } from "./RestAreaDeleted";
import { ButtonIcon } from "@/components";
import { Plus, Undo } from "lucide-react";

type Props = {
  versions: RestAreaWithInfo[];
  isEditing?: boolean;
  onChange?: (restArea: RestAreaWithInfo) => void;
};

export function VersionedRestArea({ versions, isEditing = false, onChange }: Props) {
  if (versions.length < 2) throw new Error("RestArea component requires at least two versions");

  const lastIndex = versions.length - 1;

  const [restAreas, setRestAreas] = useState(versions);

  useEffect(() => {
    setRestAreas(versions);
  }, [versions]);

  const handleNameChange = (name: string) =>
    setRestAreas(prev => prev.map((area, i) => (i === lastIndex ? { ...area, name } : area)));
  const handleUpdatedAtChange = (updatedAt: string) =>
    setRestAreas(prev =>
      prev.map((area, i) => (i === lastIndex ? { ...area, updated_at: updatedAt } : area)),
    );
  const handleStatusChange = (status: Status) =>
    setRestAreas(prev => prev.map((area, i) => (i === lastIndex ? { ...area, status } : area)));
  const handleDeletedChange = (deleted: boolean) =>
    setRestAreas(prev => prev.map((area, i) => (i === lastIndex ? { ...area, deleted } : area)));
  const handleDescriptionChange = (description: string | null) =>
    setRestAreas(prev =>
      prev.map((area, i) => (i === lastIndex ? { ...area, description } : area)),
    );
  const handleLocalDescriptionChange = (localDescription: string | null) =>
    setRestAreas(prev =>
      prev.map((area, i) =>
        i === lastIndex ? { ...area, local_description: localDescription } : area,
      ),
    );
  const handleServiceRemove = (service: Service) =>
    setRestAreas(prev =>
      prev.map((area, i) =>
        i === lastIndex ?
          {
            ...area,
            services: area.services.filter(s => s.name !== service.name),
          }
        : area,
      ),
    );
  const handleServiceAdd = (service: Service) =>
    setRestAreas(prev =>
      prev.map((area, i) =>
        i === lastIndex ?
          {
            ...area,
            services: [...area.services, service],
          }
        : area,
      ),
    );

  return (
    <div className="space-y-2 text-xs">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          {restAreas.map(({ name, id }, i) => (
            <div key={id} className="flex flex-row items-center gap-2">
              <RestAreaName
                name={name}
                isEditing={i === lastIndex && isEditing}
                onChange={handleNameChange}
              />
              {isEditing &&
                (i === lastIndex ?
                  <UndoBtn onClick={() => handleNameChange(versions[lastIndex].name)} />
                : <PlusBtn onClick={() => handleNameChange(name)} />)}
            </div>
          ))}

          {restAreas.map(({ updated_at, id }, i) => (
            <div key={id} className="flex flex-row items-center gap-2">
              <RestAreaUpdatedAt
                key={id}
                updatedAt={updated_at}
                isEditing={i === lastIndex && isEditing}
                onChange={handleUpdatedAtChange}
              />
              {isEditing &&
                (i === lastIndex ?
                  <UndoBtn onClick={() => handleUpdatedAtChange(versions[lastIndex].updated_at)} />
                : <PlusBtn onClick={() => handleUpdatedAtChange(updated_at)} />)}
            </div>
          ))}

          {restAreas.map(({ status, id }, i) => (
            <div key={id} className="flex flex-row items-center gap-2">
              <RestAreaStatus
                status={status}
                isEditing={i === lastIndex && isEditing}
                onChange={handleStatusChange}
              />
              {isEditing &&
                (i === lastIndex ?
                  <UndoBtn onClick={() => handleStatusChange(versions[lastIndex].status)} />
                : <PlusBtn onClick={() => handleStatusChange(status)} />)}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {restAreas.map(({ deleted }, i) => (
            <div key={i} className="flex flex-row items-center gap-2">
              <RestAreaDeleted
                isDeleted={deleted}
                onChange={handleDeletedChange}
                isEditing={i === lastIndex && isEditing}
              />
              {isEditing &&
                (i === lastIndex ?
                  <UndoBtn onClick={() => handleDeletedChange(versions[lastIndex].deleted)} />
                : <PlusBtn onClick={() => handleDeletedChange(deleted)} />)}
            </div>
          ))}
        </div>
      </div>
      {restAreas.map(({ description, id }, i) => (
        <div key={id} className="flex flex-row items-center gap-2">
          <RestAreaDescription
            label="Beskrivning"
            text={description}
            isEditing={i === lastIndex && isEditing}
            onChange={handleDescriptionChange}
          />
          {isEditing &&
            (i === lastIndex ?
              <UndoBtn onClick={() => handleDescriptionChange(versions[lastIndex].description)} />
            : <PlusBtn onClick={() => handleDescriptionChange(description)} />)}
        </div>
      ))}
      {restAreas.map(({ local_description, id }, i) => (
        <div key={id} className="flex flex-row items-center gap-2">
          <RestAreaDescription
            label="Lokal information"
            text={local_description}
            isEditing={i === lastIndex && isEditing}
            onChange={handleLocalDescriptionChange}
          />
          {isEditing &&
            (i === lastIndex ?
              <UndoBtn
                onClick={() => handleLocalDescriptionChange(versions[lastIndex].local_description)}
              />
            : <PlusBtn onClick={() => handleLocalDescriptionChange(local_description)} />)}
        </div>
      ))}
      <RestAreaGallery photos={restAreas[lastIndex].photos} />

      {restAreas.map(({ id, services }, i) => (
        <RestAreaServices
          key={id}
          restAreaId={id}
          services={services}
          isEditing={i === lastIndex && isEditing}
          onRemove={handleServiceRemove}
          onAdd={handleServiceAdd}
        />
      ))}
    </div>
  );
}

const UndoBtn = ({ onClick }: { onClick: () => void }) => (
  <ButtonIcon onClick={onClick} title="Ångra ändring">
    <Undo />
  </ButtonIcon>
);
const PlusBtn = ({ onClick }: { onClick: () => void }) => (
  <ButtonIcon onClick={onClick} title="Lägg till version">
    <Plus />
  </ButtonIcon>
);
