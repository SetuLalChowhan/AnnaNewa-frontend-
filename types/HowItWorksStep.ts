import { StaticImageData } from "next/image";
import { ComponentType, SVGProps } from "react";

export type HowItWorksStep = {
  id: number;
 icon: ComponentType<SVGProps<SVGSVGElement>>;         // allow icon
  title: string;
  description: string;
};
