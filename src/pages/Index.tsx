import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { TargetSection } from "@/components/TargetSection";
import { WaitlistSection } from "@/components/WaitlistSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <TargetSection />
      <WaitlistSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
