import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-image.jpg";
import weddingEvent from "@/assets/wedding-event.jpg";
import birthdayEvent from "@/assets/birthday-event.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";

const Demo = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Demo under active development
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={heroImage}
                                alt="App preview 1"
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={weddingEvent}
                                alt="App preview 2"
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={birthdayEvent}
                                alt="App preview 3"
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={corporateEvent}
                                alt="App preview 4"
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demo;
