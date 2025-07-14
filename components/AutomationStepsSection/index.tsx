"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Mic,
  ClipboardList,
  Users,
  CalendarCheck,
  FileText,
} from "lucide-react";

const steps = [
  {
    icon: Mic,
    key: "input",
    role: "User",
    message: "Plan team sync for next week",
  },
  {
    icon: ClipboardList,
    key: "taskGen",
    role: "AI",
    message: "📌 Team Sync — Monday 10am\n📌 Design Review — Tuesday 2pm",
  },
  {
    icon: CalendarCheck,
    key: "calendar",
    role: "AI",
    message: "📅 Calendar slot booked: 10am Monday",
  },
  {
    icon: Users,
    key: "assign",
    role: "AI",
    message: "👤 Assigned to: Alex, Priya",
  },
  {
    icon: FileText,
    key: "summary",
    role: "AI",
    message: "📝 Summary: Weekly planning initiated with tasks and timeline.",
  },
];

export default function AutomationStepsSection() {
  const t = useTranslations("AutomationSteps");

  return (
    <section className="w-full bg-background py-28 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-default-700 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {t("title")}
        </motion.h2>

        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative w-full aspect-[3.5/1] rounded-xl bg-muted/5 border border-muted/20 overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center animate-pulse text-muted-foreground text-lg">
              [ 🎬 Simulated SaaS Automation Strip ]
            </div>
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* Replace this with canvas animation or Lottie visual later */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
