import { brand } from '@/content';

export const metadata = {
  title: `Support - ${brand.name}`,
  description: 'Få hjälp och support för Rastplatser appen.',
};

export default function SupportPage() {
  return (
    <div className="min-h-screen text-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Support</h1>

          <div className="space-y-8 text-muted-foreground">
            <p className="text-lg">
              Behöver du hjälp med Rastplatser appen? Vi är här för att hjälpa
              dig.
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Vanliga frågor
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Hur fungerar appen offline?
                  </h3>
                  <p>
                    Rastplatser sparar viktig information lokalt på din enhet så
                    att du kan komma åt den även utan internetanslutning.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Kan jag lägga till egna recensioner?
                  </h3>
                  <p>
                    Ja, du kan dela dina erfarenheter och hjälpa andra resenärer
                    genom att lämna recensioner och betyg.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Kontakta oss
              </h2>
              <p className="mb-6">
                Om du inte hittar svaret på din fråga, tveka inte att kontakta
                oss. Vi svarar så snart vi kan.
              </p>

              <div className="bg-card p-6 rounded-lg border">
                <p className="text-card-foreground">
                  <strong>E-post:</strong> support@rastplatser.se
                  <br />
                  <strong>Svarstid:</strong> Inom 24 timmar
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
