import { LazyImage } from "@/components";
import type { Photo } from "../../types";

type Props = { photos: Photo[] };

export function RestAreaGallery({ photos }: Props) {
  return (
    <ul className="scrollable overflow-x-auto flex flex-row gap-2 w-full">
      {photos.length === 0 && (
        <li className="border rounded-xl p-2 text-gray-600">Inga foton tillgängliga</li>
      )}
      {photos.map(photo => (
        <li key={photo.url} className="border rounded-xl overflow-hidden w-[200px] min-h-16">
          <LazyImage src={photo.thumbnail_url} alt={photo.description || ""} />
          <p className="p-1 text-[10px] font-semibold text-center">{photo.description}</p>
        </li>
      ))}
    </ul>
  );
}
