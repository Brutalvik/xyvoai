"use client";

import Signup from "@/components/Signup";

export default function SignupPage() {
  return (
    <div
      className={
        "min-h-[90%] flex flex-row justify-center py-5 transition-opacity duration-500"
      }
    >
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <Signup />
      </div>
    </div>
  );
}
