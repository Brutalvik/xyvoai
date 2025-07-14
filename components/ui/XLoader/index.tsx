"use client";

import React from "react";
import "./index.css";

export default function XLoader() {
  return (
    <div className="relative-loader">
      {/* Invisible gradient defs */}
      <svg className="absolute" height="0" viewBox="0 0 100 100" width="0">
        <defs xmlns="http://www.w3.org/2000/svg">
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
        </defs>
      </svg>

      {/* Animated X */}
      <svg
        fill="none"
        height="100"
        viewBox="0 0 100 100"
        width="100"
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
    </div>
  );
}
