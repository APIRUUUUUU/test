import { useEffect, useRef, useState } from "react";
import SectionNum from "@/components/SectionNum";

const flowSteps = [
  {
    number: "01",
    title: "応募",
    description:
      "応募条件をお読みの上、下記フォームよりご応募ください。",
  },
  {
    number: "02",
    title: "一次審査",
    description:
      "応募内容をもとに審査を行います。通過者のみ一週間以内を目安に担当者よりご連絡いたします。",
  },
  {
    number: "03",
    title: "二次審査",
    description:
      "オンライン面談（顔出し不要）にて審査を行います。主に人柄を拝見させていただくので、お気軽にご参加ください。合格者の方は事務所への所属となります。",
  },
  {
    number: "04",
    title: "事務所所属",
    description:
      "契約を結んだ上で正式に所属ライバーとなり、デビューに向けて各種準備を進めていきます。ここでイラスト準備や、デビュー準備のミーティングなどを行います。専属マネージャーとのミーティングを通して戦略やスケジュールをしっかりと組んでいきます。",
  },
];

export default function FlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="flow"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-white"
    >
      <SectionNum num="05" label="SELECTION FLOW" />

      {/* Background character decoration */}
      <div className="absolute top-1/4 right-0 translate-x-1/3 w-[400px] md:w-[550px] lg:w-[700px] h-[250px] md:h-[330px] lg:h-[420px] pointer-events-none opacity-[0.06] blur-sm select-none z-0 overflow-hidden">
        <img
          src="https://storage.readdy-site.link/project_files/ac1b0492-6d54-49c0-9967-0971c4535cb1/cac0d0fb-3761-4772-899f-69a2e59cc3fe_-.png?v=ae2c56f9b096806762a4c4cc91e0a651"
          alt=""
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="section-subtitle text-gray-500">
              デビューまでの流れ
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-primary/20" />

            <div className="space-y-8 md:space-y-10">
              {flowSteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-4 md:gap-6 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  {/* Step badge */}
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gold text-navy font-black text-sm md:text-base shadow-lg shadow-gold/30">
                    {step.number}
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-[#F8F9FC] rounded-2xl p-5 md:p-6 border border-gray-100">
                    <h3 className="text-navy font-bold text-base md:text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Goal step */}
              <div
                className={`relative flex items-start gap-4 md:gap-6 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${flowSteps.length * 120}ms` }}
              >
                {/* Goal badge */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-navy text-gold font-black text-xs md:text-sm shadow-lg shadow-navy/30">
                  GOAL
                </div>

                {/* Content card */}
                <div className="flex-1 bg-navy rounded-2xl p-5 md:p-6">
                  <h3 className="text-gold font-bold text-base md:text-lg mb-2">
                    デビュー
                  </h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    所属ライバーとしてデビューとなります。魅力を存分に発揮し、配信に来たリスナーさんと楽しい時間を共有していきましょう！
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}