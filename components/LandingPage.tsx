import React from "react";
import LandingHeroSection from "./LandingHeroSection";
import HowItWorksSection from "./HowItWorksSection";
import Footer from "./Footer";

// --- Section 2: Features/Benefits ---
function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Built for Speed & Intelligence
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Xyvo combines the elegance of Motion with the power of Azure Boards,
          <br />
          enhanced by deep AI integration
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-violet-50 rounded-xl p-6 shadow-sm">
            <div className="bg-violet-600 w-10 h-10 flex items-center justify-center rounded-lg mb-4">
              <span className="text-white text-2xl">🎤</span>
            </div>
            <h3 className="font-bold text-lg mb-1">AI-Native Experience</h3>
            <p className="text-gray-700 text-sm mb-3">
              GPT-4o and UX Pilot AI generate sprint plans, write acceptance
              criteria, and predict delays in natural language.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✔ Voice input with Whisper</li>
              <li>✔ Auto-generated summaries</li>
              <li>✔ Smart task prioritization</li>
            </ul>
          </div>
          {/* Card 2 */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="bg-green-600 w-10 h-10 flex items-center justify-center rounded-lg mb-4">
              <span className="text-white text-2xl">🗂️</span>
            </div>
            <h3 className="font-bold text-lg mb-1">
              Complete Project Management
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              Manage Projects, Sprints, Tasks, and Teams with velocity tracking
              and burn-down charts.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✔ Drag-and-drop Kanban boards</li>
              <li>✔ Story points & risk assessment</li>
              <li>✔ Timeline visualization</li>
            </ul>
          </div>
          {/* Card 3 */}
          <div className="bg-orange-50 rounded-xl p-6 shadow-sm">
            <div className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-lg mb-4">
              <span className="text-white text-2xl">🔌</span>
            </div>
            <h3 className="font-bold text-lg mb-1">Seamless Integrations</h3>
            <p className="text-gray-700 text-sm mb-3">
              Sync tasks from Slack, Discord, GitHub, or voice input with
              customizable workflows.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✔ Multi-platform sync</li>
              <li>✔ Custom workflows</li>
              <li>✔ Team permissions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Section 3: Multiple Views ---
function ViewsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Multiple Views, One Platform
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Switch between Kanban, Table, Calendar, and Timeline views seamlessly
        </p>
        {/* Kanban Demo */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
          <div className="flex gap-4 mb-6">
            <button className="bg-violet-600 text-white px-4 py-2 rounded-lg font-semibold">
              Kanban
            </button>
            <button className="text-gray-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Table
            </button>
            <button className="text-gray-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Calendar
            </button>
            <button className="text-gray-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Timeline
            </button>
          </div>
          <div className="w-full flex gap-6">
            {/* To Do */}
            <div className="bg-gray-50 rounded-xl p-4 flex-1 min-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-gray-400 rounded-full inline-block"></span>
                <span className="font-semibold text-gray-700">To Do (3)</span>
              </div>
              <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                <div className="font-medium">User Authentication</div>
                <span className="text-xs bg-violet-100 text-violet-700 rounded px-2 py-1">
                  5 points
                </span>
                <span className="float-right">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="avatar"
                    className="w-6 h-6 rounded-full inline-block ml-2"
                  />
                </span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium">API Integration</div>
                <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-1">
                  3 points
                </span>
                <span className="float-right">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="avatar"
                    className="w-6 h-6 rounded-full inline-block ml-2"
                  />
                </span>
              </div>
            </div>
            {/* In Progress */}
            <div className="bg-yellow-50 rounded-xl p-4 flex-1 min-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-yellow-400 rounded-full inline-block"></span>
                <span className="font-semibold text-gray-700">
                  In Progress (2)
                </span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium">Dashboard UI</div>
                <span className="text-xs bg-green-100 text-green-700 rounded px-2 py-1">
                  8 points
                </span>
                <span className="float-right">
                  <img
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="avatar"
                    className="w-6 h-6 rounded-full inline-block ml-2"
                  />
                </span>
              </div>
            </div>
            {/* Review */}
            <div className="bg-blue-50 rounded-xl p-4 flex-1 min-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-blue-400 rounded-full inline-block"></span>
                <span className="font-semibold text-gray-700">Review (1)</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium">Mobile Responsive</div>
                <span className="text-xs bg-orange-100 text-orange-700 rounded px-2 py-1">
                  5 points
                </span>
                <span className="float-right">
                  <img
                    src="https://randomuser.me/api/portraits/men/46.jpg"
                    alt="avatar"
                    className="w-6 h-6 rounded-full inline-block ml-2"
                  />
                </span>
              </div>
            </div>
            {/* Done */}
            <div className="bg-green-50 rounded-xl p-4 flex-1 min-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-green-400 rounded-full inline-block"></span>
                <span className="font-semibold text-gray-700">Done (4)</span>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="font-medium">Project Setup</div>
                <span className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-1">
                  2 points
                </span>
                <span className="float-right">
                  <img
                    src="https://randomuser.me/api/portraits/women/47.jpg"
                    alt="avatar"
                    className="w-6 h-6 rounded-full inline-block ml-2"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Section 4: AI Thinking Partner ---
function AIThinkingPartnerSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your AI Thinking Partner
          </h2>
          <p className="text-gray-700 mb-8">
            Xyvo's AI integration goes beyond automation – it becomes your
            strategic thinking partner for better project outcomes.
          </p>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <span className="bg-violet-100 text-violet-700 rounded-lg p-2 text-xl">
                🎤
              </span>
              <div>
                <div className="font-semibold">Voice-to-Task Creation</div>
                <div className="text-gray-600 text-sm">
                  Speak your thoughts and watch them become structured backlog
                  items with effort estimates and deadlines.
                </div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-blue-100 text-blue-700 rounded-lg p-2 text-xl">
                📊
              </span>
              <div>
                <div className="font-semibold">Predictive Analytics</div>
                <div className="text-gray-600 text-sm">
                  AI predicts delays, suggests priorities, and answers "What
                  should I work on next?" in natural language.
                </div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="bg-green-100 text-green-700 rounded-lg p-2 text-xl">
                🤖
              </span>
              <div>
                <div className="font-semibold">Smart Automation</div>
                <div className="text-gray-600 text-sm">
                  Auto-generate sprint plans, write acceptance criteria, and tag
                  tasks intelligently.
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/* AI Assistant Card */}
        <div className="flex-1 max-w-xl">
          <div className="bg-violet-50 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-violet-600 text-white rounded-lg p-2 text-xl">
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

// --- Section 5: Call to Action + Footer ---
function CTASection() {
  return (
    <section className="bg-gradient-to-br from-[#7c3aed] via-[#6366f1] to-[#a5b4fc] py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to Transform Your Project Management?
      </h2>
      <p className="text-lg text-white mb-8">
        Join thousands of teams using Xyvo to move faster with less stress.
        Start your free trial today.
      </p>
      <div className="flex justify-center gap-4 mb-4">
        <button className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
          Start Free Trial
        </button>
        <button className="bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white hover:bg-white/30 transition">
          Book a Demo
        </button>
      </div>
      <div className="text-xs text-white/80">
        No credit card required • 14-day free trial • Setup in 2 minutes
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeroSection />
    </div>
  );
}
