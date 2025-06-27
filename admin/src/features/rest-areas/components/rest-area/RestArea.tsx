import type { RestAreaWithInfo } from "@/api/supabase";
import { RestAreaName } from "./RestAreaName";
import { RestAreaUpdatedAt } from "./RestAreaUpdatedAt";
import { RestAreaStatus } from "./RestAreaStatus";
import { RestAreaDescription } from "./RestAreaDescription";
import { RestAreaGallery } from "./RestAreaGallery";

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
      <div>
        <span className="font-semibold">Tjänster:</span>
        <div className="flex flex-row flex-wrap gap-2">
          {restArea.services.map(service => (
            <div key={service.name} className="text-gray-600">
              {SERVICE_NAME_MAP[service.name] || service.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const SERVICE_NAME_MAP: Record<string, string> = {
  refuseBin: "Sophantering",
  toilet: "Toalett",
  restaurant: "Restaurang",
  dumpingStation: "Latrintömning",
  picnicFacilities: "Rastplatsmöbler",
  touristInformation: "Turistinformation",
  playground: "Lekplats",
  petrolStation: "Drivmedel",
};
