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
  const handleDescriptionChange = (description: string) =>
    setRestAreas(prev =>
      prev.map((area, i) => (i === lastIndex ? { ...area, description } : area)),
    );
  const handleLocalDescriptionChange = (localDescription: string) =>
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
            <RestAreaName
              key={id}
              name={name}
              isEditing={i === lastIndex && isEditing}
              onChange={handleNameChange}
            />
          ))}

          {restAreas.map(({ updated_at, id }, i) => (
            <RestAreaUpdatedAt
              key={id}
              updatedAt={updated_at}
              isEditing={i === lastIndex && isEditing}
              onChange={handleUpdatedAtChange}
            />
          ))}

          {restAreas.map(({ status, id }, i) => (
            <RestAreaStatus
              key={id}
              status={status}
              isEditing={i === lastIndex && isEditing}
              onChange={handleStatusChange}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {restAreas.map(({ deleted }, i) => (
            <RestAreaDeleted
              key={i}
              isDeleted={deleted}
              onChange={handleDeletedChange}
              isEditing={i === lastIndex && isEditing}
            />
          ))}
        </div>
      </div>
      {restAreas.map(({ description, id }, i) => (
        <RestAreaDescription
          key={id}
          label="Beskrivning"
          text={description}
          isEditing={i === lastIndex && isEditing}
          onChange={handleDescriptionChange}
        />
      ))}
      {restAreas.map(({ local_description, id }, i) => (
        <RestAreaDescription
          key={id}
          label="Lokal information"
          text={local_description}
          isEditing={i === lastIndex && isEditing}
          onChange={handleLocalDescriptionChange}
        />
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
