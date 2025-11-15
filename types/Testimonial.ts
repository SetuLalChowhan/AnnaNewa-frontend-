import { StaticImageData } from "next/image";

export interface Testimonial {

  image: string | StaticImageData; // <-- allow both
  name:string,
  review:string

}
