"use client";
import React from "react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      role="region"
      aria-labelledby="features-heading"
      className="py-20 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="features-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-2"
        >
          Built for Speed & Intelligence
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Xyvo combines the elegance of Motion with the power of Azure Boards,
          <br />
          enhanced by deep AI integration
        </p>
        <div className="grid md:grid-cols-3 gap-8" role="list">
          <article
            className="bg-violet-50 rounded-xl p-6 shadow-sm"
            role="listitem"
          >
            <div
              className="bg-violet-600 w-10 h-10 flex items-center justify-center rounded-lg mb-4"
              aria-hidden="true"
            >
              <span className="text-white text-2xl">🎤</span>
            </div>
            <h3 className="font-bold text-lg mb-1">AI-Native Experience</h3>
            <p className="text-gray-700 text-sm mb-3">
              GPT-4o and UX Pilot AI generate sprint plans, write acceptance
              criteria, and predict delays in natural language.
            </p>
            <ul
              className="text-sm text-gray-600 space-y-1"
              aria-label="AI Features"
            >
              <li>✔ Voice input with Whisper</li>
              <li>✔ Auto-generated summaries</li>
              <li>✔ Smart task prioritization</li>
            </ul>
          </article>

          <article
            className="bg-green-50 rounded-xl p-6 shadow-sm"
            role="listitem"
          >
            <div
              className="bg-green-600 w-10 h-10 flex items-center justify-center rounded-lg mb-4"
              aria-hidden="true"
            >
              <span className="text-white text-2xl">🗂️</span>
            </div>
            <h3 className="font-bold text-lg mb-1">
              Complete Project Management
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              Manage Projects, Sprints, Tasks, and Teams with velocity tracking
              and burn-down charts.
            </p>
            <ul
              className="text-sm text-gray-600 space-y-1"
              aria-label="PM Features"
            >
              <li>✔ Drag-and-drop Kanban boards</li>
              <li>✔ Story points & risk assessment</li>
              <li>✔ Timeline visualization</li>
            </ul>
          </article>

          <article
            className="bg-orange-50 rounded-xl p-6 shadow-sm"
            role="listitem"
          >
            <div
              className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-lg mb-4"
              aria-hidden="true"
            >
              <span className="text-white text-2xl">🔌</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Seamless Integrations</h3>
            <p className="text-gray-700 text-sm mb-3">
              Sync tasks from Slack, Discord, GitHub, or voice input with
              customizable workflows.
            </p>
            <ul
              className="text-sm text-gray-600 space-y-1"
              aria-label="Integration Features"
            >
              <li>✔ Multi-platform sync</li>
              <li>✔ Custom workflows</li>
              <li>✔ Team permissions</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
