import { HOW_IT_WORKS } from "@/utils/Data";
import { Title14, Title18, Title20, Title36, TitleBase } from "../common/Title";

export default function HowItWorksSection() {
  return (
    <section
      aria-labelledby="how-it-works"
      className="section-padding-y section-padding-x"
    >
      <div className="max-w-6xl mx-auto px-4">
        <Title36 className="text-center">How It Works</Title36>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
          {HOW_IT_WORKS.map((step) => (
            <article
              key={step.id}
              className="
                flex flex-col items-center text-center
                gap-4 p-8 border rounded-xl
                shadow-sm bg-white 
                hover:shadow-lg hover:-translate-y-1
                transition-all duration-200
              "
            >
              {/* ICON */}
              <div className="text-6xl leading-none mb-2">{step.icon}</div>

              <Title20>{step.title}</Title20>

              <TitleBase className="text-secondaryColor">{step.description}</TitleBase>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
