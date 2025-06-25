"use client";

import { useState } from "react";
import HeroSection from "@/components/Hero";

export default function HomePage() {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <main className="w-full text-default-900 dark:text-default">
      {/* HERO */}
      <HeroSection />
    </main>
  );
}
