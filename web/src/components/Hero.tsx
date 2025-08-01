import { brand } from '@/content';
import Image from 'next/image';
import DownloadButtons from './DownloadButtons';

export default function Hero() {
  return (
    <section className={`py-12 md:py-24 bg-white/20 md:h-screen`}>
      <div className="container flex flex-col mx-auto px-6 text-center h-full align-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mx-auto">
          {brand.name}
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto font-semibold">
          {brand.tagline}. {brand.description}
        </p>
        <div className="mt-8">
          <DownloadButtons />
        </div>

        <div className="mt-8 md:mt-12 max-w-4xl mx-auto flex-1 md:min-h-[200px] flex items-center">
          <div className="h-full flex border-2 shadow-2xl rounded-4xl overflow-hidden mx-auto">
            <Image
              src="/images/solig-rastplats-vid-sjo.png"
              alt="Solig rastplats vid sjö - Rastplatser app"
              width={0}
              height={0}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
