import { screenshots } from '@/content';
import Image from 'next/image';

export default function AppScreenshots() {
  return (
    <section className="py-4 md:py-8 bg-muted/30">
      <div className="container mx-auto px-4 h-full flex flex-col items-center">
        <div className="text-center mb-8 flex-none">
          <h2 className="text-3xl md:text-2xl font-bold mb-4">
            Se appen i aktion
          </h2>
          <p className="text-lg md:text-lg font-medium max-w-2xl mx-auto">
            Upptäck hur Rastplatser gör dina resor enklare med intuitiv design
            och kraftfulla funktioner.
          </p>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-12 w-9/12 place-items-center">
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className="transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-1/2 w-fit">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-fit place-self-center bg-muted/70 rounded-xl outline-4 outline-white/90 shadow-sm shadow-neutral-700 transition-shadow duration-300 hover:shadow-lg"
                />
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-semibold text-center pb-2">
                  {screenshot.title}
                </h3>
                <p className=" text-center text-sm">{screenshot.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 flex-none text-xl">
          <p className="mb-6">
            Upplev alla funktioner själv - ladda ner appen idag!
          </p>
        </div>
      </div>
    </section>
  );
}
