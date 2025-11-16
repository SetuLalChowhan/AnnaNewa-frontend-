import { BENEFITS } from "@/utils/Data";
import { Title20, Title36, TitleBase } from "../common/Title";

export default function WhyGoDirectSection() {
  return (
    <section
      aria-labelledby="why-go-direct"
      className=" marginTop section-padding-x "
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <Title36 className="text-gray-900 mb-12">Why Go Direct With Annanewa?</Title36>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              className="
                flex flex-col items-center text-center
                p-8 rounded-3xl bg-white
                shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]
                transition-all duration-300
                group
              "
            >
              {/* Icon */}
             <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 text-4xl flex items-center justify-center text-primaryColor bg-green-100 rounded-full">
                              {<benefit.icon/>}
                            </div>
                          </div>

              {/* Title */}
              <Title20 className="font-semibold text-gray-900 mb-2">{benefit.title}</Title20>

              {/* Description */}
              <TitleBase className=" text-secondaryColor! font-normal!">{benefit.description}</TitleBase>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}