import type { RestAreaWithInfo } from "@/api/supabase";
import { LazyImage } from "@/components/LazyImage";

type Props = { restArea: RestAreaWithInfo };

export function RestArea({ restArea }: Props) {
  return (
    <div className="p-4 border rounded shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{restArea.name}</h2>
          <p className="text-gray-500 text-xs">
            Updaterad:{" "}
            {new Date(restArea.updated_at).toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {restArea.deleted && (
          <span className="bg-red-500 text-sm py-2 px-4 rounded-2xl text-white">Raderad</span>
        )}
      </div>
      <p className="text-gray-700">{restArea.description}</p>
      {/* <ul className="scrollable overflow-x-auto flex flex-row gap-2 w-full">
        {restArea.photos.length === 0 && (
          <li className="border rounded-xl p-2 text-gray-600">Inga foton tillgängliga</li>
        )}
        {restArea.photos.map(photo => (
          <li key={photo.url} className="rounded-xl overflow-hidden min-w-[300px] h-46 ">
            <LazyImage src={photo.url} alt={photo.description || ""} />
          </li>
        ))}
      </ul> */}
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
