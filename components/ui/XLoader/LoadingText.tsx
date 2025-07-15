"use client";
import React, { useEffect, useState } from "react";

export default function LoadingText({ text = "Loading Projects" }: { text?: string }) {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setDots((d) => (d + 1) % 4), 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="text-lg text-gray-500 mt-4 block text-center font-medium">
      {text}
      {" "}
      <span aria-live="polite" style={{ letterSpacing: 2 }}>{".".repeat(dots)}</span>
    </span>
  );
}
