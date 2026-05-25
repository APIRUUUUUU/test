import { useEffect, useRef, useState } from "react";
import SectionNum from "@/components/SectionNum";

export default function ConceptSection() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="concept"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-[#F5F7FA]"
    >
      <SectionNum num="02" label="CONCEPT" />

      {/* Background character decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] md:w-[700px] lg:w-[900px] h-[300px] md:h-[400px] lg:h-[500px] pointer-events-none opacity-[0.07] blur-sm select-none z-0 overflow-hidden">
        <img
          src="https://storage.readdy-site.link/project_files/ac1b0492-6d54-49c0-9967-0971c4535cb1/233dd46a-2c20-4f8a-9f87-682023ea1504_-.png?v=f761cd36ec9cc13c5409a735b0f89a8c"
          alt=""
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="section-subtitle text-primary">事務所について</p>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm">
              <div className="text-center max-w-2xl mx-auto">
                {/* Lead text */}
                <p className="text-navy font-bold text-xl md:text-2xl leading-[1.8] mb-8">
                  ライバーの「歩み」のサポートをする事務所
                </p>

                <div className="w-12 h-0.5 bg-primary/30 mx-auto mb-8" />

                {/* Body paragraphs */}
                <div className="space-y-6 text-gray-600 text-base md:text-lg leading-[1.9]">
                  <p>
                    <span className="text-navy font-bold">「しゅりっと＝Schritt」</span>
                    はドイツ語で「歩み、一歩」という意味があります。
                  </p>

                  <p>
                    事務所名はこれからライバーとして歩み始める方、
                    <br />
                    ライバーとして一歩ずつ成長されている方のサポートしていきたい
                    <br />
                    という意味から名付けました。
                  </p>

                  <p>
                    夢に向かって歩み続ける方の味方となれる場所にしたい。
                    <br />
                    運営陣、マネージャーもライバーと一緒に歩み続ける事務所でありたい。
                  </p>

                  <p>
                    そんな想いから、
                    <br />
                    <span className="text-navy font-bold">しゅりっとプロダクション</span>
                    が生まれました。
                  </p>

                  <p className="text-navy font-bold">
                    しゅりっとプロダクションはライバーと共に歩み続け、
                    <br />
                    一緒に成長していく事務所でありたいと思っています。
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