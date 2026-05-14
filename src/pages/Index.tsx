import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Education } from "@/components/site/Education";
import { Experience } from "@/components/site/Experience";
import { Books } from "@/components/site/Books";
import { Volunteering } from "@/components/site/Volunteering";
import { Skills } from "@/components/site/Skills";
import { Journal } from "@/components/site/Journal";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/SEO";

const Index = () => (
  <div className="min-h-screen bg-cream overflow-x-hidden w-full">
    <SEO 
      title="Prachi Shankar — Author, Analyst & MBA Student" 
      description="Personal site of Prachi Shankar — author, MBA at SIBM Pune, Analyst at Accenture, IIIT Allahabad alumna. Essays, books, and insights." 
    />
    <Nav />
    <main className="overflow-x-hidden w-full">
      <Hero />
      <About />
      <Education />
      <Experience />
      <Books />
      <Volunteering />
      <Skills />
      <Journal />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
