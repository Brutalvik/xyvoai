import { Rocket } from "lucide-react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { BackgroundLines } from "@/components/ui/BackgroundLines";

export default function HeroSection() {
  return (
    <BackgroundLines>
      <section className="min-h-screen px-6 lg:px-24 py-12 flex flex-col-reverse lg:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="text-center lg:text-left max-w-xl flex-1">
          <motion.h1
            className="text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Reinvent How You Work with{" "}
            <span className="text-primary">Xyvo AI</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-default-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            A fully AI-native project management platform that eliminates chaos
            and supercharges clarity.
          </motion.p>
          <motion.div
            className="mt-10 flex gap-4 flex-wrap justify-center lg:justify-start"
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
        </div>

        {/* Right Image */}
        <motion.div
          className="flex-1 max-w-2xl w-full mb-12 lg:mb-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Image
            src="/dashboard.png"
            alt="Xyvo Dashboard"
            width={800}
            height={600}
            priority
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </section>
    </BackgroundLines>
  );
}
