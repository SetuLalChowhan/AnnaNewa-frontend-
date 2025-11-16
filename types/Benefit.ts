import { ComponentType, SVGProps } from "react";

export type Benefit = {
  id: number;
 icon: ComponentType<SVGProps<SVGSVGElement>>;  
  title: string;
  description: string;
}