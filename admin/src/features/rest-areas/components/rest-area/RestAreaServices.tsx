import { Button, ButtonIcon } from "@/components";
import type { Service } from "../../types";
import { Trash2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState, type PropsWithChildren } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  restAreaId: string;
  services: Service[];
  isEditing?: boolean;
  onRemove: (service: Service) => void;
  onAdd: (service: Service) => void;
};
export function RestAreaServices({ restAreaId, services, isEditing, onRemove, onAdd }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="font-semibold">Tjänster:</span>
        {isEditing && (
          <ServiceDrawer restAreaId={restAreaId} services={services} onAdd={onAdd}>
            <Button variant="outline" className="text-xs">
              Lägg till tjänst
            </Button>
          </ServiceDrawer>
        )}
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

type ServiceDrawerProps = PropsWithChildren<{
  restAreaId: string;
  services: Service[];
  onAdd: (service: Service) => void;
}>;

const ServiceDrawer = ({ restAreaId, services, onAdd, children }: ServiceDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<Service>();
  const handleChange = (value: Service) => setService(value);

  const handleSave = () => {
    if (service) {
      onAdd(service);
      setService(undefined);
      setIsOpen(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="m-auto max-w-[400px]">
          <DrawerHeader>
            <DrawerTitle>Lägg till tjänst</DrawerTitle>
          </DrawerHeader>
          <ServiceSelector restAreaId={restAreaId} services={services} onChange={handleChange} />
          <DrawerFooter>
            <Button disabled={!service} onClick={handleSave}>
              Spara
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Stäng</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

type ServiceSelectorProps = {
  restAreaId: string;
  services: Service[];
  onChange: (value: Service) => void;
};
const ServiceSelector = ({ restAreaId, services, onChange }: ServiceSelectorProps) => {
  const handleChange = (value: string) => {
    const service: Service = { name: value as Service["name"], rest_area_id: restAreaId };
    onChange(service);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Välj tjänst" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(SERVICE_NAME_MAP)
          .filter(([key]) => !services.some(s => s.name === key))
          .map(([key, value]) => (
            <SelectItem key={key} value={key}>
              <span className="font-semibol">{value}</span>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

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
