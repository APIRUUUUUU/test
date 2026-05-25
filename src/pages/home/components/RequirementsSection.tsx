import { useEffect, useRef, useState } from "react";
import SectionNum from "@/components/SectionNum";

const requirements = [
  "日本国内在住",
  "18歳以上の方",
  "月1時間以上配信可能な方",
  "これまでIRIAMで配信活動を行ったことがない方",
];

const transferNote = [
  "※ 詳細についてはオンライン面談にてお伝えします。",
  "移籍も受付しております",
  "※ 事務所に既に所属しており、所属事務所様より移籍の許可をいただいている方",
];

export default function RequirementsSection() {
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
      id="requirements"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-navy"
    >
      <SectionNum num="04" label="REQUIREMENTS" isDark={true} />

      {/* Background character decoration */}
      <div className="absolute bottom-0 left-0 -translate-x-1/4 w-[400px] md:w-[600px] lg:w-[800px] h-[250px] md:h-[350px] lg:h-[450px] pointer-events-none opacity-[0.08] blur-sm select-none z-0 overflow-hidden">
        <img
          src="https://storage.readdy-site.link/project_files/ac1b0492-6d54-49c0-9967-0971c4535cb1/59e6126a-68c3-4a09-af17-5c71f90578da_-.png?v=df1de9588d89b49edb0983b80fcad5a0"
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
            <p className="section-subtitle text-white/60">応募条件</p>
          </div>

          {/* Requirements Card */}
          <div
            className={`bg-navy-light/50 rounded-3xl p-8 md:p-12 border border-white/10 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <ul className="space-y-5">
              {requirements.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/20 text-primary mt-0.5">
                    <i className="ri-check-line text-sm"></i>
                  </span>
                  <span className="text-white/90 text-base md:text-lg leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              {transferNote.map((item, index) => (
                <p key={index} className="text-white/50 text-sm md:text-base">
                  {index === 0 ? (
                    <>{item}</>
                  ) : (
                    <span className="flex items-start gap-2">
                      <span className="text-primary mt-1">・</span>
                      <span>{index === 1 ? <span className="text-white/90">{item}</span> : item}</span>
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div
            className={`mt-8 md:mt-10 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-white/40 text-xs md:text-sm leading-relaxed text-center">
              ※ 応募・選考にかかる費用は一切ございません。
              <br />
              ※ ご応募いただいた個人情報は選考目的のみに使用し、関連法令に従い厳重に管理いたします。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}