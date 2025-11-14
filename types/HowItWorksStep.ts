import { StaticImageData } from "next/image";

export type HowItWorksStep = {
  id: number;
  icon?: string;          // allow icon
  title: string;
  description: string;
};
