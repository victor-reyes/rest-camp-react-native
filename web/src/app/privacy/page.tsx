import { brand } from '@/content';

export const metadata = {
  title: `Integritetspolicy - ${brand.name}`,
  description: 'Integritetspolicy för Rastplatser appen.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Integritetspolicy
          </h1>

          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg">
              Denna integritetspolicy beskriver hur Rastplatser samlar in,
              använder och skyddar din personliga information.
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                Information vi samlar in
              </h2>
              <p>
                Vi samlar endast in den information som är nödvändig för att
                tillhandahålla våra tjänster.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                Hur vi använder din information
              </h2>
              <p>
                Din information används för att förbättra din upplevelse av
                appen och tillhandahålla relevanta tjänster.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                Kontakta oss
              </h2>
              <p>
                Om du har frågor om denna integritetspolicy, vänligen kontakta
                oss via vår supportkanal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
