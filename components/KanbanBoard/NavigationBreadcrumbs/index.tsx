"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

export const NavigationBreadcrumbs = () => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumbs radius="lg" variant="solid">
      {segments.slice(1).map((seg, idx) => (
        <BreadcrumbItem key={idx}>
          {seg.charAt(0).toUpperCase() + seg.slice(1)}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default NavigationBreadcrumbs;
