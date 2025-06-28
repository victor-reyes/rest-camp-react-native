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

  const [restArea, setRestArea] = useState(versions[lastIndex]);

  useEffect(() => {
    setRestArea(versions[lastIndex]);
  }, [versions, lastIndex]);

  const handleNameChange = (name: string) => setRestArea(prev => ({ ...prev, name }));
  const handleUpdatedAtChange = (updatedAt: string) =>
    setRestArea(prev => ({ ...prev, updated_at: updatedAt }));
  const handleStatusChange = (status: Status) => setRestArea(prev => ({ ...prev, status }));
  const handleDeletedChange = (deleted: boolean) => setRestArea(prev => ({ ...prev, deleted }));
  const handleDescriptionChange = (description: string) =>
    setRestArea(prev => ({ ...prev, description }));
  const handleLocalDescriptionChange = (localDescription: string) =>
    setRestArea(prev => ({ ...prev, local_description: localDescription }));
  const handleServiceRemove = (service: Service) =>
    setRestArea(prev => ({
      ...prev,
      services: prev.services.filter(s => s.name !== service.name),
    }));
  const handleServiceAdd = (service: Service) =>
    setRestArea(prev => ({
      ...prev,
      services: [...prev.services, service],
    }));

  return (
    <div className="space-y-2 text-xs">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          {versions.map(({ name, id }, i) => (
            <RestAreaName
              key={id}
              name={name}
              isEditing={i === lastIndex && isEditing}
              onChange={handleNameChange}
            />
          ))}

          {versions.map(({ updated_at, id }, i) => (
            <RestAreaUpdatedAt
              key={id}
              updatedAt={updated_at}
              isEditing={i === lastIndex && isEditing}
              onChange={handleUpdatedAtChange}
            />
          ))}

          {versions.map(({ status, id }, i) => (
            <RestAreaStatus
              key={id}
              status={status}
              isEditing={i === lastIndex && isEditing}
              onChange={handleStatusChange}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {versions.map(({ deleted }, i) => (
            <RestAreaDeleted
              key={i}
              isDeleted={deleted}
              onChange={handleDeletedChange}
              isEditing={i === lastIndex && isEditing}
            />
          ))}
        </div>
      </div>
      {versions.map(({ description, id }, i) => (
        <RestAreaDescription
          key={id}
          label="Beskrivning"
          text={description}
          isEditing={i === lastIndex && isEditing}
          onChange={handleDescriptionChange}
        />
      ))}
      {versions.map(({ local_description, id }, i) => (
        <RestAreaDescription
          key={id}
          label="Lokal information"
          text={local_description}
          isEditing={i === lastIndex && isEditing}
          onChange={handleLocalDescriptionChange}
        />
      ))}
      <RestAreaGallery photos={restArea.photos} />

      {versions.map(({ id, services }, i) => (
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
