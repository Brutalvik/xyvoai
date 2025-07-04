"use client";

import Signin from "@/components/Signin";

export default function SignupPage() {
  return (
    <div
      className={
        "min-h-[90%] flex flex-row justify-center py-5 transition-opacity duration-500"
      }
    >
      <div className="w-full flex items-center justify-center">
        <Signin />
      </div>
    </div>
  );
}
