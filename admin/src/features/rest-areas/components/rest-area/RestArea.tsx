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
  restArea: RestAreaWithInfo;
  isEditing?: boolean;
  onChange?: (restArea: RestAreaWithInfo) => void;
};

export function RestArea({ restArea: defaultRestArea, isEditing = false, onChange }: Props) {
  const [restArea, setRestArea] = useState(defaultRestArea);
  useEffect(() => {
    setRestArea(defaultRestArea);
  }, [defaultRestArea]);

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
          <RestAreaName name={restArea.name} isEditing={isEditing} onChange={handleNameChange} />
          <RestAreaUpdatedAt
            updatedAt={restArea.updated_at}
            isEditing={isEditing}
            onChange={handleUpdatedAtChange}
          />

          <RestAreaStatus
            status={restArea.status}
            isEditing={isEditing}
            onChange={handleStatusChange}
          />
        </div>
        <RestAreaDeleted
          isDeleted={restArea.deleted}
          onChange={handleDeletedChange}
          isEditing={isEditing}
        />
      </div>
      <RestAreaDescription
        label="Beskrivning"
        text={restArea.description}
        isEditing={isEditing}
        onChange={handleDescriptionChange}
      />
      <RestAreaDescription
        label="Lokal information"
        text={restArea.local_description}
        isEditing={isEditing}
        onChange={handleLocalDescriptionChange}
      />
      <RestAreaGallery photos={restArea.photos} />

      <RestAreaServices
        restAreaId={restArea.id}
        services={restArea.services}
        isEditing={isEditing}
        onRemove={handleServiceRemove}
        onAdd={handleServiceAdd}
      />
    </div>
  );
}
