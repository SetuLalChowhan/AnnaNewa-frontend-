import Image, { StaticImageData } from "next/image";
import Image1 from "@/assets/images/v1.jpg";
import Image2 from "@/assets/images/v2.jpg";
import Image3 from "@/assets/images/v3.jpg";
import BigButton from "../common/BigButton";

interface Slide {
  id: number;
  image: StaticImageData;
}

const slides: Slide[] = [
  { id: 1, image: Image1 },
  { id: 2, image: Image2 },
  { id: 3, image: Image3 },
];

const HeroSection = () => {
  return (
    <section className="relative w-full h-[75vh] sm:h-[80vh] overflow-hidden">
      {/* Slider Wrapper */}
      <div className="flex h-full animate-slide">
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full shrink-0 h-full relative">
            <Image
              src={slide.image}
              alt={`Slide ${slide.id}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Static Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center  section-padding-x  section-padding-y text-white">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
          Connecting Farmers & Buyers Directly
        </h1>
        <p className="text-base sm:text-lg lg:text-xl max-w-3xl mb-6 drop-shadow-lg">
          Annanewa lets farmers sell their products at fair prices and buyers
          get fresh produce directly, cutting out middlemen. Participate in our
          simple bid system and get the best deal.
        </p>
        <div className="flex gap-4">
          <BigButton text="Browse Products" href="#" />
          <BigButton
            text="Post Your Product"
            href="#"
            className="bg-white text-gray-800! "
          />
        </div>
      </div>

      {/* Dots Indicator (example) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        <span className="w-3 h-3 rounded-full animate-dot-1"></span>
        <span className="w-3 h-3 rounded-full animate-dot-2"></span>
        <span className="w-3 h-3 rounded-full animate-dot-3"></span>
      </div>
    </section>
  );
};

export default HeroSection;
