import { siteMetadata } from '@/content';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AppScreenshots from '@/components/AppScreenshots';
import Footer from '@/components/Footer';

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-r/increasing from-indigo-500 to-teal-400 text-white">
      <Hero />
      <AppScreenshots />
      <Features />

      <section className="py-20 md:py-32 bg-indigo-500/40">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Redo att förvandla dina bilresor?
          </h2>
          <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto mb-10">
            Utforska Rastplatser idag och börja ditt äventyr med den bästa
            följeslagaren vid din sida.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
