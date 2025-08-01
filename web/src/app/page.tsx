import { siteMetadata } from '@/content';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AppScreenshots from '@/components/AppScreenshots';

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AppScreenshots />
      <Features />
    </div>
  );
}
