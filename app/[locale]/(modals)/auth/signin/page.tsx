"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SigninModal from "@/components/Auth/SigninModal";
import XyvoLoader from "@/components/ui/XyvoLoader";

export default function SignInInterceptedModal() {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const handleClose = () => {
    router.back();
  };

  const handleRedirect = () => {
    setRedirecting(true);
    setTimeout(() => {
      router.push("/overview");
    }, 600);
  };

  return (
    <>
      {!redirecting && (
        <SigninModal
          isOpen
          onClose={handleClose}
          onSuccessRedirect={handleRedirect}
        />
      )}
      {redirecting && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80">
          <XyvoLoader />
        </div>
      )}
    </>
  );
}
