import { Session } from "next-auth";

export interface IProductsList {
  title?: string;
  className?: string;
  currency?: number;
  locale?: string;
  session?: Session | null;
}
