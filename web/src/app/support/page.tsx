import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { brand, supportItems } from '@/content';
import { ExternalLink } from 'lucide-react';

export const metadata = {
  title: `Support - ${brand.name}`,
  description: 'Få hjälp och support för Rastplatser appen.',
};

export default function SupportPage() {
  return (
    <div className="bg-white/20 text-foreground">
      <div className="container mx-auto px-4 md:px-8 py-24">
        <Card className="md:p-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl text-center">Support</CardTitle>
          </CardHeader>

          <CardContent className="space-y-8 ">
            <p className="text-lg">
              Behöver du hjälp med Rastplatser appen? Vi är här för att hjälpa
              dig få ut det mesta av din reseupplevelse.
            </p>

            {supportItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  {section.title}
                </h2>
                <Accordion
                  type="multiple"
                  className='px-1 md:px-4'
                >
                  {section.questions.map((item, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`${sectionIndex}-${itemIndex}`}
                    >
                      <AccordionTrigger className="text-lg font-medium text-foreground">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

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
                  <strong>E-post:</strong> swedish.dictionary@gmail.com
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
              <strong>Feedback:</strong> swedish.dictionary@gmail.com
              <p className="flex flex-wrap items-center gap-1">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
