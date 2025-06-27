import { Button, ButtonIcon } from "@/components";
import type { Service } from "../../types";
import { Trash2 } from "lucide-react";

type Props = {
  services: Service[];
  isEditing?: boolean;
  onRemove: (service: Service) => void;
  onAdd: (service: Service) => void;
};
export function RestAreaServices({ services, isEditing, onRemove, onAdd }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="font-semibold">Tjänster:</span>
        <Button size="sm" className="text-xs">
          Lägg till tjänst
        </Button>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {services.map(service => (
          <div key={service.name} className="text-gray-600 flex flex-row items-center gap-0.5">
            {SERVICE_NAME_MAP[service.name] || service.name}
            {isEditing && (
              <ButtonIcon
                onClick={() => onRemove(service)}
                className="bg-rose-500 hover:bg-red-600 size-5 cursor-pointer text-white">
                <Trash2 style={{ height: 12, width: 12 }} />
              </ButtonIcon>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const SERVICE_NAME_MAP: Record<Service["name"], string> = {
  refuseBin: "Sophantering",
  toilet: "Toalett",
  restaurant: "Restaurang",
  dumpingStation: "Latrintömning",
  picnicFacilities: "Rastplatsmöbler",
  touristInformation: "Turistinformation",
  playground: "Lekplats",
  petrolStation: "Drivmedel",
};
