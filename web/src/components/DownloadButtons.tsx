import { downloadLinks } from '@/content';
import Image from 'next/image';

export default function DownloadButtons() {
  return (
    <div className="flex flex-row gap-4 justify-center relative">
      {downloadLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          // className="inline-flex items-center justify-center gap-2 px-6 py-3 min-w-[200px] bg-primary text-primary-foreground rounded-md font-medium transition-all hover:scale-105 hover:bg-primary/90"
        >
          <Image
            src={link.badgeImage}
            alt={`Download ${link.platform} app`}
            width={link.platform === 'ios' ? 181 : 200}
            height={0}
            className="h-auto "
          />
        </a>
      ))}
    </div>
  );
}
