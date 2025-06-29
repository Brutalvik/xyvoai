"use client";

import Register from "@/components/Register";

export default function RegisterPage() {
  return (
    <div
      className={
        "min-h-[90%] flex flex-row justify-center py-5 transition-opacity duration-500"
      }
    >
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <Register />
      </div>
    </div>
  );
}
