import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About EventSnap</h1>
              <p className="text-xl text-muted-foreground">
                We're passionate about helping people capture and share their most precious moments
              </p>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <Card className="border-none shadow-lg mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    EventSnap was born from a simple idea: events are more fun when everyone can share their unique perspectives. 
                    We noticed that at weddings, birthdays, and celebrations, guests capture amazing moments from their own viewpoints, 
                    but these photos often get scattered across different devices and platforms.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    We created EventSnap to solve this problem, making it incredibly easy for event hosts and guests to collect, 
                    share, and cherish all the memories from their special occasions in one beautiful place.
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To make memory sharing effortless and joyful for every celebration
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      A world where no special moment goes uncaptured or unshared
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                    <p className="text-muted-foreground">
                      Simplicity, connection, and preserving the joy of shared experiences
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border-none shadow-lg bg-muted/50">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Why We Built This</h2>
                <p className="text-muted-foreground text-center leading-relaxed">
                  We believe that the best memories are the ones we share together. EventSnap empowers hosts to create 
                  seamless photo-sharing experiences, while giving guests an easy way to contribute and relive the celebration. 
                  Whether it's a wedding, birthday party, or any special gathering, we're here to help you capture every angle, 
                  every smile, and every unforgettable moment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 EventSnap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
