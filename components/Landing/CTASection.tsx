"use client";
import React from "react";

export default function CTASection() {
  return (
    <section
      role="region"
      aria-labelledby="cta-heading"
      className="bg-gradient-to-br from-[#7c3aed] via-[#6366f1] to-[#a5b4fc] py-20 text-center"
    >
      <h2
        id="cta-heading"
        className="text-3xl md:text-4xl font-bold text-white mb-4"
      >
        Ready to Transform Your Project Management?
      </h2>
      <p className="text-lg text-white mb-8" aria-label="CTA Subheading">
        Join thousands of teams using Xyvo to move faster with less stress.
        Start your free trial today.
      </p>
      <div
        className="flex justify-center gap-4 mb-4"
        role="group"
        aria-label="Call to Action Buttons"
      >
        <button
          type="button"
          className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          aria-label="Start Free Trial"
        >
          Start Free Trial
        </button>
        <button
          type="button"
          className="bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white hover:bg-white/30 transition"
          aria-label="Book a Demo"
        >
          Book a Demo
        </button>
      </div>
      <div className="text-xs text-white/80" aria-label="Trial Details">
        No credit card required • 14-day free trial • Setup in 2 minutes
      </div>
    </section>
  );
}
