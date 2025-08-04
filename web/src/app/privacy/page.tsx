import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { brand } from '@/content';
import { ExternalLink } from 'lucide-react';

export const metadata = {
  title: `Integritetspolicy - ${brand.name}`,
  description: 'Integritetspolicy för Rastplatser appen.',
};

const privacyLinks = [
  {
    title: 'Google Play Integritetspolicy',
    href: 'https://play.google.com/about/privacy',
  },
  { title: 'Expo Integritetspolicy', href: 'https://expo.dev/privacy' },
];
export default function PrivacyPage() {
  return (
    <div className="bg-white/20 text-foreground">
      <div className="container mx-auto px-4 md:px-8 py-24">
        <Card className="md:p-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl text-center">
              Integritetspolicy
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <p className="text-lg">{`
              Denna integritetspolicy gäller för appen Rastplatser (nedan kallad
              "Applikationen") för mobila enheter, vilken utvecklades av Víctor
              Reyes (nedan kallad "Tjänsteleverantören") som en gratistjänst.
              Denna tjänst tillhandahålls "I BEFINTLIGT SKICK".
            `}</p>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Vilken information samlar Applikationen in och hur används den?
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    Information som användaren tillhandahåller
                  </h3>
                  <p className="mb-4">
                    Applikationen inhämtar den information du tillhandahåller
                    när du laddar ner och registrerar Applikationen.
                    Registrering hos Tjänsteleverantören är inte obligatorisk.
                    Tänk dock på att du kanske inte kan använda vissa av
                    funktionerna som erbjuds av Applikationen om du inte
                    registrerar dig hos dem.
                  </p>
                  <p>
                    Tjänsteleverantören kan också använda den information du
                    tillhandahållit för att kontakta dig från tid till annan för
                    att ge dig viktig information, nödvändiga meddelanden och
                    marknadsföringskampanjer.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground mb-3">
                    Automatiskt insamlad information
                  </h3>
                  <p>
                    Dessutom kan Applikationen samla in viss information
                    automatiskt, inklusive, men inte begränsat till, typen av
                    mobil enhet du använder, din mobila enhets unika enhets-ID,
                    IP-adressen till din mobila enhet, ditt mobila
                    operativsystem, typen av mobila webbläsare du använder och
                    information om hur du använder Applikationen.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Samlar Applikationen in exakt platsinformation i realtid från
                enheten?
              </h2>
              <p>
                Denna Applikation samlar inte in exakt information om din mobila
                enhets plats.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Ser tredje parter och/eller har de tillgång till information som
                erhållits av Applikationen?
              </h2>
              <p className="mb-4">
                Endast aggregerad, anonymiserad data överförs periodiskt till
                externa tjänster för att hjälpa Tjänsteleverantören att
                förbättra Applikationen och deras tjänst. Tjänsteleverantören
                kan dela din information med tredje parter på de sätt som
                beskrivs i denna integritetspolicy.
              </p>

              <p className="mb-4">
                Observera att Applikationen använder tredjepartstjänster som har
                sina egna integritetspolicyer för hantering av data. Nedan finns
                länkar till integritetspolicyerna för de
                tredjepartstjänsteleverantörer som används av Applikationen:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4 mb-6">
                {privacyLinks.map((link) => (
                  <li key={link.href} className="flex">
                    <a
                      href={link.href}
                      target="_blank"
                      className="flex gap-1 items-center font-bold text-blue-400 hover:underline"
                    >
                      {link.title} <ExternalLink size={16} />
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mb-4">
                Tjänsteleverantören kan avslöja Användarinlämnad och Automatiskt
                Insamlad Information:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  enligt lag, såsom för att följa en stämning eller liknande
                  juridisk process;
                </li>
                <li>
                  när de i god tro anser att utlämnande är nödvändigt för att
                  skydda deras rättigheter, skydda din säkerhet eller andras
                  säkerhet, utreda bedrägeri eller svara på en
                  myndighetsbegäran;
                </li>
                <li>
                  med sina betrodda tjänsteleverantörer som arbetar för deras
                  räkning, inte har en oberoende användning av den information
                  vi lämnar ut till dem och har gått med på att följa reglerna
                  som anges i denna integritetspolicy.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Vilka är mina rättigheter att välja bort (opt-out)?
              </h2>
              <p>
                Du kan enkelt stoppa all insamling av information från
                Applikationen genom att avinstallera Applikationen. Du kan
                använda de standardmässiga avinstallationsprocesserna som kan
                finnas tillgängliga som en del av din mobila enhet eller via
                mobilapplikationsmarknaden eller nätverket.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Policy för datalagring, Hantering av din information
              </h2>
              <p>
                Tjänsteleverantören kommer att behålla Användarinlämnad data så
                länge du använder Applikationen och under en rimlig tid
                därefter. Tjänsteleverantören kommer att behålla Automatiskt
                Insamlad information i upp till 24 månader och kan därefter
                lagra den i aggregerad form. Om du vill att Tjänsteleverantören
                ska radera Användarinlämnad Data som du har tillhandahållit via
                Applikationen, vänligen kontakta dem på
                swedish.dictionary@gmail.com så svarar vi inom rimlig tid.
                Observera att viss eller all Användarinlämnad Data kan krävas
                för att Applikationen ska fungera korrekt.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Barn
              </h2>
              <p className="mb-4">
                Tjänsteleverantören använder inte Applikationen för att medvetet
                samla in data från eller marknadsföra till barn under 13 år.
              </p>
              <p>
                Applikationen riktar sig inte till någon under 13 år.
                Tjänsteleverantören samlar inte medvetet in personligt
                identifierbar information från barn under 13 år. Om
                Tjänsteleverantören upptäcker att ett barn under 13 år har
                tillhandahållit personlig information, kommer
                Tjänsteleverantören omedelbart att radera detta från sina
                servrar. Om du är förälder eller vårdnadshavare och är medveten
                om att ditt barn har gett oss personlig information, vänligen
                kontakta Tjänsteleverantören (swedish.dictionary@gmail.com) så
                att de kan vidta nödvändiga åtgärder.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Säkerhet
              </h2>
              <p>
                Tjänsteleverantören är angelägna om att skydda sekretessen för
                din information. Tjänsteleverantören tillhandahåller fysiska,
                elektroniska och processuella skyddsåtgärder för att skydda
                information vi behandlar och upprätthåller. Till exempel
                begränsar vi åtkomsten till denna information till auktoriserade
                anställda och entreprenörer som behöver känna till den
                informationen för att driva, utveckla eller förbättra sin
                Applikation. Observera att även om vi strävar efter att
                tillhandahålla rimlig säkerhet för information vi behandlar och
                upprätthåller, kan inget säkerhetssystem förhindra alla
                potentiella säkerhetsöverträdelser.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Ändringar
              </h2>
              <p>
                Denna integritetspolicy kan uppdateras från tid till annan av
                vilken anledning som helst. Tjänsteleverantören kommer att
                meddela dig om eventuella ändringar i integritetspolicyn genom
                att uppdatera denna sida med den nya integritetspolicyn. Du
                uppmanas att regelbundet konsultera denna integritetspolicy för
                eventuella ändringar, eftersom fortsatt användning anses vara
                godkännande av alla ändringar.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Ditt samtycke
              </h2>
              <p>
                {`
                Genom att använda Applikationen ger du ditt samtycke till
                Tjänsteleverantörens behandling av din information såsom anges i
                denna integritetspolicy nu och såsom den ändras av oss.
                "Behandling" innebär att använda cookies på en
                dator/handhållen enhet eller att använda eller på något sätt
                hantera information, inklusive, men inte begränsat till, att
                samla in, lagra, radera, använda, kombinera och avslöja
                information.`}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Kontakta oss
              </h2>
              <p className="mb-6">
                Om du har några frågor angående integritet när du använder
                Applikationen, eller har frågor om praxis, vänligen kontakta
                Tjänsteleverantören via e-post på swedish.dictionary@gmail.com.
              </p>

              <p className="whitespace-pre-wrap">
                <strong>Utvecklare:</strong> Víctor Reyes
                <br />
                <strong>E-post:</strong> swedish.dictionary@gmail.com
                <br />
                <strong>Gäller från:</strong> 2025-05-19
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
