"use client";

import React from "react";
import "./index.css";

type Theme = "google" | "standard";

interface XyvoLoaderProps {
  colorTheme?: Theme;
  size?: number; // New: dynamic size
}

export default function XyvoLoader({
  colorTheme = "standard",
  size = 100,
}: XyvoLoaderProps) {
  const isGoogle = colorTheme === "google";

  return (
    <div className="loader text-default-500">
      <svg className="absolute" height="0" viewBox="0 0 100 100" width="0">
        <defs xmlns="http://www.w3.org/2000/svg">
          {isGoogle ? (
            <>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="x-gradient"
                x1="0"
                x2="0"
                y1="62"
                y2="2"
              >
                <stop stopColor="#EA4335" />
                <stop offset="1.5" stopColor="#EA4335" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="y-gradient"
                x1="0"
                x2="0"
                y1="62"
                y2="2"
              >
                <stop stopColor="#4285F4" />
                <stop offset="1.5" stopColor="#4285F4" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="v-gradient"
                x1="0"
                x2="0"
                y1="62"
                y2="2"
              >
                <stop stopColor="#FBBC05" />
                <stop offset="1.5" stopColor="#FBBC05" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="o-gradient"
                x1="0"
                x2="0"
                y1="62"
                y2="2"
              >
                <stop stopColor="#34A853" />
                <stop offset="1.5" stopColor="#34A853" />
              </linearGradient>
            </>
          ) : (
            <>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="x-gradient"
                x1="0"
                x2="0"
                y1="62"
                y2="2"
              >
                <stop stopColor="#1780cc" />
                <stop offset="1.5" stopColor="#1780cc" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="default-gradient"
                x1="0"
                x2="0"
                y1="62"
                y2="2"
              >
                <stop stopColor="currentColor" />
                <stop offset="1.5" stopColor="currentColor" />
              </linearGradient>
            </>
          )}
        </defs>
      </svg>

      {/* X */}
      <svg
        className="inline-block"
        fill="none"
        height={size}
        viewBox="0 0 100 100"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="dash"
          d="M 20,20 L 80,80 M 80,20 L 20,80"
          pathLength="360"
          stroke="url(#x-gradient)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        />
      </svg>

      {/* Y */}
      <svg
        className="inline-block"
        fill="none"
        height={size}
        viewBox="0 0 100 100"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="dash"
          d="M 20,20 L 50,50 M 80,20 L 50,50 L 50,80"
          pathLength="360"
          stroke={isGoogle ? "url(#y-gradient)" : "url(#default-gradient)"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        />
      </svg>

      {/* V */}
      <svg
        className="inline-block"
        fill="none"
        height={size}
        viewBox="0 0 100 100"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="dash"
          d="M 20,20 L 50,80 L 80,20"
          pathLength="360"
          stroke={isGoogle ? "url(#v-gradient)" : "url(#default-gradient)"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        />
      </svg>

      {/* O */}
      <svg
        className="inline-block"
        fill="none"
        height={size}
        viewBox="0 0 100 100"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="spin"
          d="M 50,15  
            A 35,35 0 0 1 85,50  
            A 35,35 0 0 1 50,85  
            A 35,35 0 0 1 15,50  
            A 35,35 0 0 1 50,15 Z"
          pathLength="360"
          stroke={isGoogle ? "url(#o-gradient)" : "url(#default-gradient)"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="11"
        />
      </svg>
    </div>
  );
}
