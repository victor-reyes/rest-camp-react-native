import type { RestAreaWithInfo } from "@/api/supabase";
import { LazyImage } from "@/components/LazyImage";
import { cn } from "@/lib/utils";

type Props = { restArea: RestAreaWithInfo };

export function RestArea({ restArea }: Props) {
  return (
    <div className="space-y-2 text-xs">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{restArea.name}</h2>
          <p className="text-gray-500">{`Uppdaterad: ${getDateString(restArea.updated_at)}`}</p>

          <span
            className={cn(
              "font-semibold text-white py-1 px-4 m-1 rounded-2xl",
              restArea.status === "inOperation" ? "bg-green-700"
              : restArea.status === "limitedOperation" ? "bg-yellow-700"
              : "bg-red-700",
            )}>
            Status:{" "}
            {restArea.status === "inOperation" ?
              "I drift"
            : restArea.status === "limitedOperation" ?
              "Begränsad drift"
            : "Ej i drift"}
          </span>
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
          <li key={photo.url} className="rounded-xl overflow-hidden w-[200px] h-32 ">
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

const getDateString = (date: string) =>
  new Date(date).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
