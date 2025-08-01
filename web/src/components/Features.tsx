import { features } from '@/content';
import { MapPin, GitFork, Users, WifiOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const icons = {
  MapPin,
  GitFork,
  Users,
  WifiOff,
};

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-background/10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          Allt du behöver för en bättre resa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = icons[feature.icon as keyof typeof icons] || MapPin;

            return (
              <Card
                key={feature.id}
                className="bg-card/70 px-4 py-8 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <CardHeader>
                  <div className="h-12 w-12 text-accent mb-4 mx-auto flex items-center justify-center">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-center text-amber-300 text-lg font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white font-medium">
                  {feature.description}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
