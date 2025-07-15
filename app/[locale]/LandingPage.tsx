import React from "react";
import LandingHero from "@/components/Landing/LandingHero";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ViewsSection from "@/components/Landing/ViewsSection";
import AIThinkingPartnerSection from "@/components/Landing/AIThinkingPartnerSection";
import CTASection from "@/components/Landing/CTASection";

export default function LandingPage() {
  return (
    <main
      role="main"
      aria-label="Landing Page Content"
      className="min-h-screen flex flex-col"
    >
      <LandingHero />
      <FeaturesSection />
      <HowItWorksSection />
      <ViewsSection />
      <AIThinkingPartnerSection />
      <CTASection />
    </main>
  );
}
