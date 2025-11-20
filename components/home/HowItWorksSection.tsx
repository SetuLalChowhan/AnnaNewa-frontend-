import { HOW_IT_WORKS } from "@/utils/Data";
import { Title20, Title36, TitleBase } from "../common/Title";

export default function HowItWorksSection() {
  return (
    <section
      aria-labelledby="how-it-works"
      className="marginTop section-padding-x "
    >
      <div className="max-w-6xl mx-auto px-4">
        <Title36 className="text-center text-gray-900 mb-12">How It Works</Title36>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
          {HOW_IT_WORKS.map((step) => (
            <article
              key={step.id}
              className="
                flex flex-col items-center text-center
                gap-4 p-8 rounded-2xl
                bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)]
                hover:-translate-y-2
                transition-all duration-300
              "
            >
              {/* ICON */}
              <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 text-4xl flex items-center justify-center text-primaryColor bg-green-100   rounded-full">
                              {<step.icon/>}
                            </div>
                          </div>

              <Title20 className="font-semibold text-gray-900">{step.title}</Title20>

              <TitleBase className="text-secondaryColor! font-normal!">{step.description}</TitleBase>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
