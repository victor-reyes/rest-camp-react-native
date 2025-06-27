import type { RestAreaWithInfo } from "@/api/supabase";
import { RestAreaName } from "./RestAreaName";
import { RestAreaUpdatedAt } from "./RestAreaUpdatedAt";
import { RestAreaStatus } from "./RestAreaStatus";
import { RestAreaDescription } from "./RestAreaDescription";
import { RestAreaGallery } from "./RestAreaGallery";
import { RestAreaServices } from "./RestAreaServices";

type Props = {
  restArea: RestAreaWithInfo;
  isEditing?: boolean;
  onChange?: (restArea: RestAreaWithInfo) => void;
};

export function RestArea({ restArea, isEditing = false, onChange }: Props) {
  const handleNameChange = (name: string) => console.log(name);
  const handleUpdatedAtChange = (updatedAt: string) => console.log(updatedAt);
  const handleStatusChange = (status: string) => console.log(status);
  const handleDescriptionChange = (description: string) => console.log(description);
  const handleLocalDescriptionChange = (localDescription: string) => console.log(localDescription);
  const handleServiceRemove = (service: string) => console.log(service);
  const handleServiceAdd = (service: string) => console.log(service);

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
        {restArea.deleted && (
          <span className="bg-red-500 py-2 px-4 rounded-2xl text-white">Raderad</span>
        )}
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
        services={restArea.services}
        isEditing={isEditing}
        onRemove={handleServiceRemove}
        onAdd={handleServiceAdd}
      />
    </div>
  );
}
