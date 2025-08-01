import { DownloadButtons } from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { brand } from '@/content';
import { ExternalLink } from 'lucide-react';

export const metadata = {
  title: `Support - ${brand.name}`,
  description: 'Få hjälp och support för Rastplatser appen.',
};

export default function SupportPage() {
  return (
    <div className="bg-neutral-600/30 text-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Support</h1>

          <div className="space-y-8 text-muted-foreground">
            <p className="text-lg">
              Behöver du hjälp med Rastplatser appen? Vi är här för att hjälpa
              dig få ut det mesta av din reseupplevelse.
            </p>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Komma igång
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="download">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Ladda ner appen
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground">
                      <p className="mb-4">
                        Rastplatser finns tillgänglig för både iOS och Android.
                        Sök efter &quot;Rastplatser&quot; i App Store eller Google
                        Play Store, eller använd länkarna på vår hemsida.
                      </p>
                      <div className="w-fit">
                        <DownloadButtons />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="account">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Skapa ett konto
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Du kan använda appen utan konto, men genom att logga in
                      med Google eller Apple kan du spara favoriter, lämna
                      recensioner och synkronisera data mellan enheter.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="navigation">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Navigera på kartan
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Använd kartan för att hitta rastplatser längs din rutt.
                      Tryck på en markör för att se detaljer, eller använd
                      filtren för att hitta specifika tjänster.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Vanliga frågor
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="offline">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Hur fungerar appen offline?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Rastplatser sparar viktig information lokalt på din enhet
                      så att du kan komma åt rastplatsdata även utan
                      internetanslutning. Kartor och grundläggande information
                      synkroniseras automatiskt när du har nätverk.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="reviews">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Kan jag lägga till egna recensioner?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Ja, du kan dela dina erfarenheter och hjälpa andra
                      resenärer genom att lämna recensioner och betyg. Du kan
                      också ladda upp foton för att visa hur rastplatsen ser ut.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="updates">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Hur uppdateras informationen?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Vi uppdaterar rastplatsinformation regelbundet baserat på
                      officiella källor och användarrapporter. Om du märker
                      felaktig information, rapportera det gärna till oss.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="coverage">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Varför visas inte alla rastplatser?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Vi fokuserar på officiella rastplatser längs svenska
                      motorvägar och större vägar. Privata parkeringsplatser och
                      mindre rastområden inkluderas gradvis.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="international">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Kan jag använda appen utomlands?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      För närvarande fokuserar vi på svenska rastplatser, men vi
                      planerar att utöka till andra nordiska länder i framtiden.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="delete-account">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Hur raderar jag mitt konto?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Du kan radera ditt konto och all associerad data genom
                      appens inställningar eller genom att kontakta vår support.
                      All din data raderas permanent inom 30 dagar.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Teknisk support
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="app-crash">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Appen kraschar eller fungerar inte
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Prova först att starta om appen och kontrollera att du har
                      den senaste versionen. Om problemet kvarstår, kontakta oss
                      med information om din enhet och vad som hände.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="gps-issues">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    GPS-position fungerar inte
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Kontrollera att du har gett appen tillåtelse att använda
                      din plats i enhetens inställningar. Starta om appen efter
                      att ha ändrat behörigheter.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="map-loading">
                  <AccordionTrigger className="text-lg font-medium text-foreground">
                    Kartan laddas inte
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Detta kan bero på dålig internetanslutning. Appen fungerar
                      offline med tidigare nedladdad data, men nya kartdata
                      kräver internetanslutning.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Kontakta oss
              </h2>
              <p className="mb-6">
                Om du inte hittar svaret på din fråga, tveka inte att kontakta
                oss. Vi svarar så snart vi kan och hjälper dig gärna.
              </p>

              <Card className="w-fit">
                <CardHeader>
                  <CardTitle className="text-xl font-medium">
                    Allmän support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>E-post:</strong> support@rastplatser.se
                  </p>
                  <p>
                    <strong>Svarstid:</strong> Inom 24 timmar
                  </p>
                </CardContent>
              </Card>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Tips:</strong> När du kontaktar support, inkludera
                  gärna information om din enhet (iPhone/Android), appversion
                  och en beskrivning av problemet. Detta hjälper oss att hjälpa
                  dig snabbare.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Feedback och förslag
              </h2>
              <p className="mb-4">
                Vi värdesätter din feedback! Om du har förslag på förbättringar
                eller nya funktioner, hör gärna av dig. Din input hjälper oss
                att göra Rastplatser bättre för alla användare.
              </p>

              <Card className="p-6">
                <div className="space-y-2 text-card-foreground">
                  <p>
                    <strong>Feedback:</strong> feedback@rastplatser.se
                  </p>
                  <p className="flex items-center gap-1">
                    <strong>Betygsätt appen:</strong> Lämna en recension i{' '}
                    <a
                      className="flex items-center gap-1"
                      href="https://apps.apple.com/se/app/rastplatser/id6746166317"
                      target="_blank"
                    >
                      App Store <ExternalLink size={16} />
                    </a>
                    {' eller'}
                    <a
                      className="flex items-center gap-1"
                      href="https://play.google.com/store/apps/details?id=nordic.rastplatser"
                      target="_blank"
                    >
                      Google Play <ExternalLink size={16} />
                    </a>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
