"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Rocket,
  Brain,
  Users,
  CheckCircle,
  CalendarClock,
  Mic,
  BookOpenCheck,
  ToggleRight,
  DollarSign,
} from "lucide-react";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { BackgroundLines } from "@/components/ui/BackgroundLines/page";

export default function HomePage() {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <main className="w-full text-default-900 dark:text-default overflow-x-hidden">
      {/* HERO */}
      <BackgroundLines>
        <section className="min-h-screen px-6 flex flex-col items-center justify-center text-center">
          <motion.h1
            className="text-5xl font-bold max-w-4xl leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Reinvent How You Work with{" "}
            <span className="text-primary">Xyvo AI</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg max-w-2xl text-default-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A fully AI-native project management platform that eliminates chaos
            and supercharges clarity.
          </motion.p>
          <motion.div
            className="mt-10 flex gap-4 flex-wrap justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button variant="solid" size="lg">
              <Rocket className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            <Button variant="ghost" size="lg">
              Explore Features
            </Button>
          </motion.div>
        </section>
      </BackgroundLines>

      {/* FEATURES */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10 text-default-700">
          Smart Features
        </h2>
        <div className="grid gap-8 max-w-6xl mx-auto sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: "AI Task Generation",
              desc: "Instantly convert prompts into prioritized tasks using GPT-4o.",
              icon: <Brain className="mx-auto mb-3 h-6 w-6 text-primary" />,
            },
            {
              title: "Team Collaboration",
              desc: "Multilingual chat, voice-to-text, and team-wide updates in real-time.",
              icon: <Users className="mx-auto mb-3 h-6 w-6 text-primary" />,
            },
            {
              title: "AI Project Summaries",
              desc: "Auto-generate briefs, timelines, and next-step insights.",
              icon: (
                <CheckCircle className="mx-auto mb-3 h-6 w-6 text-primary" />
              ),
            },
            {
              title: "Transcribed Meetings",
              desc: "Meetings are auto-transcribed and added to minutes of meeting.",
              icon: <Mic className="mx-auto mb-3 h-6 w-6 text-primary" />,
            },
            {
              title: "Timeline Automation",
              desc: "Smart milestone tracking with AI-generated timelines.",
              icon: (
                <CalendarClock className="mx-auto mb-3 h-6 w-6 text-primary" />
              ),
            },
            {
              title: "Knowledge Base",
              desc: "Centralized memory with intelligent document tagging.",
              icon: (
                <BookOpenCheck className="mx-auto mb-3 h-6 w-6 text-primary" />
              ),
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl shadow-md border border-default-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              {f.icon}
              <h3 className="font-semibold text-lg mb-2 text-default-600">
                {f.title}
              </h3>
              <p className="text-sm text-default-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10 text-default-700">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "Speak or type your task",
            "AI generates plan instantly",
            "Team syncs in real-time",
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-background rounded-xl shadow-md border border-default-400"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <div className="text-5xl font-bold text-primary mb-4">
                {idx + 1}
              </div>
              <p className="text-lg font-medium text-default-500">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}

      {/* SDLC TIMELINE */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-12 text-default-700">
          Project Lifecycle – SDLC
        </h2>
        <div className="relative max-w-6xl mx-auto">
          <div className="border-l-4 border-primary pl-16 space-y-12">
            {[
              {
                stage: "1. Requirement Analysis",
                desc: "Gather detailed business and technical requirements, interview stakeholders, and create user stories.",
              },
              {
                stage: "2. Planning",
                desc: "Define project scope, timelines, budget, and resource allocation. Set milestones and delivery phases.",
              },
              {
                stage: "3. System Design",
                desc: "Translate requirements into architecture diagrams, UI/UX wireframes, database models, and API specs.",
              },
              {
                stage: "4. Implementation",
                desc: "Develop backend, frontend, infrastructure, and integrate AI components. Use Git-based CI/CD workflows.",
              },
              {
                stage: "5. Testing",
                desc: "Perform unit, integration, and UAT testing. Capture logs, handle errors, and iterate via QA feedback.",
              },
              {
                stage: "6. Deployment",
                desc: "Push to staging/production environments. Monitor metrics, set up alerts, and configure CDN/cache.",
              },
              {
                stage: "7. Maintenance",
                desc: "Monitor uptime, apply patches, handle feedback, scale performance, and evolve features with AI-driven insights.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="relative ml-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="absolute -left-6 top-2 w-4 h-4 rounded-full bg-primary shadow-lg" />
                <h3 className="text-xl font-semibold mb-1">{step.stage}</h3>
                <p className="text-default-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-10">Flexible Pricing</h2>
        <div className="flex justify-center mb-6">
          <Button variant="ghost" onClick={() => setIsMonthly(!isMonthly)}>
            <ToggleRight className="mr-2" />
            {isMonthly ? "Monthly" : "Yearly"}
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Starter",
              price: isMonthly ? "$12/mo" : "$120/yr",
              features: ["Basic AI tasks", "Team chat", "Limited voice notes"],
            },
            {
              title: "Pro",
              price: isMonthly ? "$25/mo" : "$250/yr",
              features: [
                "All Starter features",
                "Timeline AI",
                "Meeting transcripts",
                "Project memory",
              ],
            },
            {
              title: "Enterprise",
              price: isMonthly ? "Contact Us" : "Custom Pricing",
              features: [
                "Unlimited seats",
                "Custom workflows",
                "Priority support",
              ],
            },
          ].map((plan, i) => (
            <motion.div
              key={i}
              className="border rounded-xl p-6 text-left shadow-md bg-background border-default dark:border-default-800"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
              <p className="text-3xl font-bold text-primary mb-4">
                {plan.price}
              </p>
              <ul className="space-y-2 text-sm text-default-500">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
