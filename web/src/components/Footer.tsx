import Link from 'next/link';
import { brand, navigation } from '@/content';
import DownloadButtons from './DownloadButtons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/70 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {brand.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {brand.tagline}
              </p>
              <p className="text-sm text-muted-foreground">
                {brand.description}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Länkar</h4>
            <nav className="space-y-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Ladda ner appen
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Tillgänglig för iOS och Android
            </p>
            <DownloadButtons />
          </div>
        </div>

        <div className="border-t border-border/50 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} {brand.name}. Alla rättigheter förbehållna.
          </div>

          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Integritetspolicy
            </Link>
            <Link
              href="/support"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Support
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            Rastplatser hjälper dig att upptäcka de bästa rastplatserna längs
            svenska motorvägar. Planera din resa, läs recensioner och hitta
            perfekta platser för dina pauser.
          </p>
        </div>
      </div>
    </footer>
  );
}
