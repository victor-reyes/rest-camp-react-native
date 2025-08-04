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

export const supportItems = [
  {
    title: 'Komma igång',
    questions: [
      {
        question: 'Ladda ner appen',
        answer:
          'Rastplatser finns tillgänglig för både iOS och Android. Sök efter "Rastplatser" i App Store eller Google Play Store, eller använd länkarna på vår hemsida.',
      },
      {
        question: 'Skapa ett konto',
        answer:
          'Du kan använda appen utan konto, men genom att logga in med Google eller Apple kan du spara favoriter, lämna recensioner och synkronisera data mellan enheter.',
      },
      {
        question: 'Navigera på kartan',
        answer:
          'Använd kartan för att hitta rastplatser längs din rutt. Tryck på en markör för att se detaljer, eller använd filtren för att hitta specifika tjänster.',
      },
    ],
  },
  {
    title: 'Vanliga frågor',
    questions: [
      {
        question: 'Hur fungerar appen offline?',
        answer:
          'Rastplatser sparar viktig information lokalt på din enhet så att du kan komma åt rastplatsdata även utan internetanslutning. Kartor och grundläggande information synkroniseras automatiskt när du har nätverk.',
      },
      {
        question: 'Kan jag lägga till egna recensioner?',
        answer:
          'Ja, du kan dela dina erfarenheter och hjälpa andra resenärer genom att lämna recensioner och betyg. Du kan också ladda upp foton för att visa hur rastplatsen ser ut.',
      },
      {
        question: 'Hur uppdateras informationen?',
        answer:
          'Vi uppdaterar rastplatsinformation regelbundet baserat på officiella källor och användarrapporter. Om du märker felaktig information, rapportera det gärna till oss.',
      },
      {
        question: 'Varför visas inte alla rastplatser?',
        answer:
          'Vi fokuserar på officiella rastplatser längs svenska motorvägar och större vägar. Privata parkeringsplatser och mindre rastområden inkluderas gradvis.',
      },
      {
        question: 'Kan jag använda appen utomlands?',
        answer:
          'För närvarande fokuserar vi på svenska rastplatser, men vi planerar att utöka till andra nordiska länder i framtiden.',
      },
      {
        question: 'Hur raderar jag mitt konto?',
        answer:
          'Du kan radera ditt konto och all associerad data genom appens inställningar eller genom att kontakta vår support. All din data raderas permanent inom 30 dagar.',
      },
    ],
  },
  {
    title: 'Teknisk support',
    questions: [
      {
        question: 'Appen kraschar eller fungerar inte',
        answer:
          'Prova först att starta om appen och kontrollera att du har den senaste versionen. Om problemet kvarstår, kontakta oss med information om din enhet och vad som hände.',
      },
      {
        question: 'GPS-position fungerar inte',
        answer:
          'Kontrollera att du har gett appen tillåtelse att använda din plats i enhetens inställningar. Starta om appen efter att ha ändrat behörigheter.',
      },
      {
        question: 'Kartan laddas inte',
        answer:
          'Detta kan bero på dålig internetanslutning. Appen fungerar offline med tidigare nedladdad data, men nya kartdata kräver internetanslutning.',
      },
    ],
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
