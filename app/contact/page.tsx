import { Navigation, Footer, Button } from "@/components/ui";
import { EditorialCard } from "@/components/EditorialCard";
import { ContactForm } from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <main className="min-h-screen bg-surface">
      <Navigation />
      
      <section className="pt-40 pb-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="font-display text-5xl md:text-7xl mb-8">Connect with The Atelier</h1>
          <p className="font-body text-xl text-on-surface-variant leading-relaxed mb-12">
            For membership applications, personal training consultations, or media inquiries, our concierge is at your disposal.
          </p>
          
          <div className="space-y-12">
            <div>
              <h3 className="font-display text-3xl text-primary mb-4">The Private House</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                12 Bruton Place<br />
                Mayfair, London<br />
                W1J 6LU
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-2xl text-primary mb-4">Concierge Hours</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Monday — Friday: 06:00 – 22:00<br />
                Saturday — Sunday: 08:00 – 20:00
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-2xl text-primary mb-4">Press Inquiries</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                For all media and editorial requests, please contact:<br />
                <a href="mailto:press@londonatelier.com" className="hover:text-primary transition-colors underline decoration-outline-variant underline-offset-4">press@londonatelier.com</a>
              </p>
            </div>
          </div>
        </div>

        <div>
          <EditorialCard className="bg-surface-container-highest">
            <h3 className="font-display text-3xl mb-8">Direct Inquiry</h3>
            <ContactForm />
          </EditorialCard>
        </div>
      </section>

      <Footer />
    </main>
  );
}
