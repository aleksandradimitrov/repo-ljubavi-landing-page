import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Lightbulb, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.about.title}</h1>
              <p className="text-xl text-muted-foreground">
                {t.about.subtitle}
              </p>
            </div>

            <div className="prose prose-lg max-w-none mb-12">
              <Card className="border-none shadow-lg mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">{t.about.story.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.about.story.text}
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t.about.mission.title}</h3>
                    <p className="text-muted-foreground">
                      {t.about.mission.text}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t.about.mission.title}</h3>
                    <p className="text-muted-foreground">
                      {t.about.mission.text}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t.about.values.title}</h3>
                    <p className="text-muted-foreground">
                      {t.about.values.text}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
