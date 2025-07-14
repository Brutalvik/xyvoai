// components/ui/PageTransitionLoader.tsx
"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    setLoading(true);
    timeout = setTimeout(() => setLoading(false), 500); // Adjust for realism

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          animate={{ width: "100%" }}
          className="fixed top-0 left-0 w-full h-1 bg-indigo-500 z-[9999]"
          exit={{ opacity: 0 }}
          initial={{ width: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
}
