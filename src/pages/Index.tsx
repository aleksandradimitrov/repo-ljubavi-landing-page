import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Camera, Users, Share2, Heart, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import weddingEvent from "@/assets/wedding-event.jpg";
import birthdayEvent from "@/assets/birthday-event.jpg";
import corporateEvent from "@/assets/corporate-event.jpg";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img 
            src={heroImage} 
            alt="People celebrating and sharing memories at an event" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Share Every Moment Together
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Capture and share magical memories at your events. Perfect for weddings, birthdays, and special celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EventSnap?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The easiest way to collect and share photos from your special events
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
                <p className="text-muted-foreground">
                  Guests can instantly share photos from their phones during the event
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Shared Albums</h3>
                <p className="text-muted-foreground">
                  Create collaborative albums where everyone can contribute their favorite shots
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Sharing</h3>
                <p className="text-muted-foreground">
                  Share memories with all guests immediately after the event
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cherish Forever</h3>
                <p className="text-muted-foreground">
                  Keep all your precious memories in one beautiful, organized place
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Showcase Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See EventSnap in Action</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, EventSnap makes every moment shareable
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src={weddingEvent} 
                alt="Wedding guests capturing and sharing photos at a beautiful reception" 
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                <h3 className="text-xl font-semibold text-foreground">Weddings</h3>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src={birthdayEvent} 
                alt="Birthday party with friends sharing memories and taking photos together" 
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                <h3 className="text-xl font-semibold text-foreground">Birthdays</h3>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src={corporateEvent} 
                alt="Corporate event with attendees networking and sharing professional photos" 
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                <h3 className="text-xl font-semibold text-foreground">Corporate Events</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real stories from event hosts who made their celebrations unforgettable
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "EventSnap made our wedding unforgettable! All our guests could instantly share their photos, and we got to see the day from everyone's perspective. Absolutely amazing!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Wedding - June 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Perfect for our company retreat! Everyone could contribute photos, and we created an incredible shared album that captured the entire experience."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">MC</span>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Corporate Event - August 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "My daughter's 21st birthday was captured beautifully! We have memories from all her friends and family in one place. Such a wonderful keepsake!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">EP</span>
                  </div>
                  <div>
                    <p className="font-semibold">Emily Parker</p>
                    <p className="text-sm text-muted-foreground">Birthday - September 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Unforgettable Memories?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of happy event hosts who trust EventSnap to capture their special moments
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Start Your Event</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default Index;
