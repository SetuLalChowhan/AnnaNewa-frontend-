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
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center section-padding-x section-padding-y text-white">
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
            text=" Post Your Product"
            href="#"
            className="bg-white text-gray-800! hover:bg-gray-200!"
          />
        </div>
      </div>

      {/* Dots Indicator */}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slide {
          0%,
          25% {
            transform: translateX(0%);
          }
          33.33%,
          58.33% {
            transform: translateX(-100%);
          }
          66.66%,
          91.66% {
            transform: translateX(-200%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-slide {
          animation: slide 15s infinite ease-in-out;
        }

        /* Dot animations */
        @keyframes dot1 {
          0%,
          33.33% {
            background-color: #22c55e;
          }
          33.34%,
          100% {
            background-color: rgba(255, 255, 255, 0.6);
          }
        }

        @keyframes dot2 {
          0%,
          33.33% {
            background-color: rgba(255, 255, 255, 0.6);
          }
          33.34%,
          66.66% {
            background-color: #22c55e;
          }
          66.67%,
          100% {
            background-color: rgba(255, 255, 255, 0.6);
          }
        }

        @keyframes dot3 {
          0%,
          66.66% {
            background-color: rgba(255, 255, 255, 0.6);
          }
          66.67%,
          100% {
            background-color: #22c55e;
          }
        }

        .animate-dot-1 {
          animation: dot1 15s infinite;
        }

        .animate-dot-2 {
          animation: dot2 15s infinite;
        }

        .animate-dot-3 {
          animation: dot3 15s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
