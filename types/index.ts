import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface User {
  id: string;
  sub: string;
  email: string;
  name: string;
  phone?: string;
  countryCode?: string;
  token: string;
  refreshToken?: string;
  role?: string;
  organizationId?: string | null;
  image?: string;
  accountType?: "personal" | "organization";
  attributes?: Record<string, string>;
}
