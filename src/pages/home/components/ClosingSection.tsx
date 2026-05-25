import { useEffect, useRef, useState } from "react";
import SectionNum from "@/components/SectionNum";

export default function ClosingSection() {
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
      id="apply"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-white overflow-hidden"
    >
      <SectionNum num="07" label="ENTRY" />

      {/* Background character decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[450px] md:w-[600px] lg:w-[800px] h-[280px] md:h-[380px] lg:h-[500px] pointer-events-none opacity-[0.05] blur-sm select-none z-0 overflow-hidden">
        <img
          src="https://storage.readdy-site.link/project_files/ac1b0492-6d54-49c0-9967-0971c4535cb1/233dd46a-2c20-4f8a-9f87-682023ea1504_-.png?v=f761cd36ec9cc13c5409a735b0f89a8c"
          alt=""
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 w-[400px] md:w-[550px] lg:w-[700px] h-[250px] md:h-[330px] lg:h-[420px] pointer-events-none opacity-[0.05] blur-sm select-none z-0 overflow-hidden">
        <img
          src="https://storage.readdy-site.link/project_files/ac1b0492-6d54-49c0-9967-0971c4535cb1/58b6f031-4bb3-447c-a220-a34541444c62_unnamed.png?v=2d764778523484b32e94170817674abe"
          alt=""
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#F5F7FA] to-transparent" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Audition message */}
          <div
            className={`text-center max-w-2xl mx-auto mb-10 md:mb-14 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-navy/80 text-base md:text-lg leading-[1.9] mb-3">
              話すこと、人を楽しませることが好き
            </p>
            <p className="text-navy/80 text-base md:text-lg leading-[1.9] mb-3">
              誰かの元気となる存在になりたい、声を褒められたことがあるなど
            </p>
            <p className="text-navy/80 text-base md:text-lg leading-[1.9] mb-3">
              Vライバーになりたい動機はなんでも大歓迎です。
            </p>
            <p className="text-navy font-bold text-lg md:text-xl leading-[1.9]">
              少しでも興味があればVライバーとして歩み始めてみませんか？
            </p>
          </div>

          {/* CTA Card */}
          <div
            className={`relative bg-navy rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center">
              {/* Main title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
                あなたを
                <br className="md:hidden" />
                待っています。
              </h2>

              {/* Body text */}
              <div className="max-w-xl mx-auto mb-10">
                <p className="text-white/70 text-base md:text-lg leading-[1.9] mb-4">
                  迷っているなら、まず話を聞いてみてください。
                </p>
                <p className="text-white/70 text-base md:text-lg leading-[1.9] mb-4">
                  費用も義務も一切ありません。
                </p>
                <p className="text-white/70 text-base md:text-lg leading-[1.9]">
                  しゅりプロは、あなたの
                  <span className="text-gold font-bold">「やってみたい」</span>
                  を全力で応援します。
                </p>
              </div>

              {/* CTA Button */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfgFOGWoc9tTKK-CFKUsJAW_XmNrPI4KvOJzNpyp0ccokEK_w/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-4 md:px-14 md:py-5 bg-primary text-white text-lg md:text-xl font-bold rounded-full whitespace-nowrap transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95"
              >
                <span>今すぐ応募する</span>
                <i className="ri-external-link-line text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}