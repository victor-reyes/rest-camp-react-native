/**
 * Content Management for Rastplatser Marketing Website
 * Single source of truth for all content, constants, and data structures
 */

// Type definitions
export interface AppFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AppScreenshot {
  id: string;
  src: string;
  alt: string;
  title: string;
}

export interface DownloadLink {
  platform: 'ios' | 'android';
  url: string;
  badgeImage: string;
}

// Brand information
export const brand = {
  name: 'Rastplatser',
  tagline: 'Din Ultimata Vägkompis',
  description:
    'Upptäck de bästa rastplatserna, planera din resa och res smartare.',
} as const;

// App Store download links
export const downloadLinks: DownloadLink[] = [
  {
    platform: 'ios',
    url: 'https://apps.apple.com/se/app/rastplatser/id6746166317',
    badgeImage: '/images/app-store-badge-black.svg',
  },
  {
    platform: 'android',
    url: 'https://play.google.com/store/apps/details?id=nordic.rastplatser',
    badgeImage: '/images/google-play-badge-black.png',
  },
];

// Navigation links
export const navigation = [
  { name: 'Hem', href: '/' },
  { name: 'Integritetspolicy', href: '/privacy/' },
  { name: 'Support', href: '/support/' },
] as const;

// App features from current website analysis
export const features: AppFeature[] = [
  {
    id: 'comprehensive-info',
    title: 'Omfattande info om rastplatser',
    description:
      'Detaljerad information om faciliteter, betyg och foton för otaliga rastplatser.',
    icon: 'MapPin',
  },
  {
    id: 'smart-routing',
    title: 'Smart ruttplanering',
    description:
      'Integrera enkelt de bästa rastplatserna i dina resvägar för en smidig resa.',
    icon: 'GitFork',
  },
  {
    id: 'user-reviews',
    title: 'Användarrecensioner & Gemenskap',
    description:
      'Dela dina erfarenheter, läs recensioner och få tips från andra resenärer.',
    icon: 'Users',
  },
  {
    id: 'offline-access',
    title: 'Offline-åtkomst',
    description:
      'Få tillgång till viktig information om rastplatser även när du är offline.',
    icon: 'WifiOff',
  },
];

export const screenshots: AppScreenshot[] = [
  {
    id: 'map-view',
    src: '/images/screenshots/map-view.png',
    alt: 'Rastplatser app som visar interaktiv karta med rastplatsers lägen',
    title: 'Interaktiv karta',
  },
  {
    id: 'rest-area-details',
    src: '/images/screenshots/rest-area-details.png',
    alt: 'Detaljerad vy av en rastplats med tjänster, foton och recensioner',
    title: 'Detaljerad information',
  },
  {
    id: 'filter-options',
    src: '/images/screenshots/filter-options.png',
    alt: 'Filteralternativ för att söka rastplatser efter tjänster och bekvämligheter',
    title: 'Filteralternativ',
  },
];

// Site metadata
export const siteMetadata = {
  title: 'Rastplatser - Upptäck Sveriges bästa rastplatser',
  description:
    'Hitta och utforska rastplatser längs svenska motorvägar. Läs recensioner, se foton och navigera enkelt till din nästa paus.',
  keywords: 'rastplatser, sverige, motorväg, resa, navigation, recensioner',
  url: 'https://rastplatser.se',
  ogImage: '/images/og-image.jpg',
} as const;
