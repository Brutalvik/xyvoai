// app/[locale]/auth/signin/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import SigninPage from "@/components/Auth/SigninPage";

export default function Signin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom") || "/";

  return (
    <SigninPage
      onSuccessRedirect={() => {
        router.push(redirectedFrom);
      }}
    />
  );
}
