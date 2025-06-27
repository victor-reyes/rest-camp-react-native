import type { RestAreaWithInfo } from "@/api/supabase";
import { LazyImage } from "@/components/LazyImage";
import { cn } from "@/lib/utils";
import { RestAreaName } from "./RestAreaName";
import { RestAreaUpdatedAt } from "./RestAreaUpdatedAt";
import { RestAreaStatus } from "./RestAreaStatus";

type Props = {
  restArea: RestAreaWithInfo;
  isEditing?: boolean;
  onChange?: (restArea: RestAreaWithInfo) => void;
};

export function RestArea({ restArea, isEditing = false, onChange }: Props) {
  const handleNameChange = (name: string) => console.log(name);
  const handleUpdatedAtChange = (updatedAt: string) => console.log(updatedAt);
  const handleStatusChange = (status: string) => console.log(status);
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
      {restArea.description && <p className="text-gray-700">Beskrivning: {restArea.description}</p>}
      {restArea.local_description && (
        <p className="text-gray-700">Lokal beskrivning: {restArea.local_description}</p>
      )}
      <ul className="scrollable overflow-x-auto flex flex-row gap-2 w-full">
        {restArea.photos.length === 0 && (
          <li className="border rounded-xl p-2 text-gray-600">Inga foton tillgängliga</li>
        )}
        {restArea.photos.map(photo => (
          <li key={photo.url} className="rounded-xl overflow-hidden w-[100px] min-h-16">
            <LazyImage src={photo.url} alt={photo.description || ""} />
          </li>
        ))}
      </ul>
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
