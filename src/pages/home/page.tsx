import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ConceptSection from "./components/ConceptSection";
import SupportSection from "./components/SupportSection";
import RequirementsSection from "./components/RequirementsSection";
import FlowSection from "./components/FlowSection";
import FAQSection from "./components/FAQSection";
import ClosingSection from "./components/ClosingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ConceptSection />
        <SupportSection />
        <RequirementsSection />
        <FlowSection />
        <FAQSection />
        <ClosingSection />
      </main>
    </div>
  );
}