"use client";

import Link from "next/link";

export default function LangSwitcher() {
  return (
    <div className="flex space-x-4 text-sm text-gray-500">
      <Link href="/" locale="en">
        EN
      </Link>
      <Link href="/" locale="fr">
        FR
      </Link>
    </div>
  );
}
