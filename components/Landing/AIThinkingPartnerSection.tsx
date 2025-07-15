"use client";
import React from "react";

export default function AIThinkingPartnerSection() {
  return (
    <section
      role="region"
      aria-labelledby="ai-partner-heading"
      className="py-20 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <h2
            id="ai-partner-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Your AI Thinking Partner
          </h2>
          <p className="text-gray-700 mb-8">
            Xyvo's AI integration goes beyond automation – it becomes your
            strategic thinking partner for better project outcomes.
          </p>
          <ul className="space-y-6" aria-label="AI Benefits List">
            <li className="flex items-start gap-4">
              <span
                role="img"
                aria-label="Microphone"
                className="bg-violet-100 text-violet-700 rounded-lg p-2 text-xl"
              >
                🎤
              </span>
              <div>
                <div className="font-semibold">Voice-to-Task Creation</div>
                <p className="text-gray-600 text-sm">
                  Speak your thoughts and watch them become structured backlog
                  items with effort estimates and deadlines.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span
                role="img"
                aria-label="Chart"
                className="bg-blue-100 text-blue-700 rounded-lg p-2 text-xl"
              >
                📊
              </span>
              <div>
                <div className="font-semibold">Predictive Analytics</div>
                <p className="text-gray-600 text-sm">
                  AI predicts delays, suggests priorities, and answers "What
                  should I work on next?" in natural language.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span
                role="img"
                aria-label="Robot"
                className="bg-green-100 text-green-700 rounded-lg p-2 text-xl"
              >
                🤖
              </span>
              <div>
                <div className="font-semibold">Smart Automation</div>
                <p className="text-gray-600 text-sm">
                  Auto-generate sprint plans, write acceptance criteria, and tag
                  tasks intelligently.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex-1 max-w-xl">
          <div
            className="bg-violet-50 rounded-xl p-6 shadow-md"
            aria-label="AI Assistant Message Area"
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                role="img"
                aria-label="Robot"
                className="bg-violet-600 text-white rounded-lg p-2 text-xl"
              >
                🤖
              </span>
              <span className="font-semibold text-gray-800">AI Assistant</span>
            </div>
            <div className="bg-white rounded p-3 mb-3 text-gray-700 text-sm">
              "What should I work on next?"
            </div>
            <div className="bg-violet-100 rounded p-3 mb-3 text-gray-700 text-sm">
              Based on your sprint goals and team velocity, I recommend focusing
              on the User Authentication task (5 points). It's blocking 2 other
              tasks and aligns with your current sprint priority.
            </div>
            <div className="bg-white rounded p-3 mb-3 text-gray-700 text-sm">
              "Create a task for mobile optimization"
            </div>
            <div className="bg-violet-200 rounded p-3 text-violet-800 text-sm">
              ✓ Created task "Mobile Optimization" with 8 story points, assigned
              to Frontend team, due next Friday. Added acceptance criteria and
              linked to current sprint.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
