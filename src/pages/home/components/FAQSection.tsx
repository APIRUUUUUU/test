import { useState, useEffect, useRef } from "react";
import SectionNum from "@/components/SectionNum";

const faqItems = [
  {
    question: "配信経験がなくても応募できますか？",
    answer:
      "はい、未経験の方でも大歓迎です。活動に必要なノウハウはしっかりサポートしますのでご安心ください。",
  },
  {
    question: "応募に費用はかかりますか？",
    answer:
      "応募・選考にかかる費用は一切ございません。",
  },
  {
    question: "副業・趣味の範囲での活動は可能ですか？",
    answer:
      "はい、可能です。ノルマはありませんので、ご自身のペースに合わせてご活動いただけます。",
  },
  {
    question: "個人でIRIAMを使って活動中ですが、応募できますか？",
    answer:
      "はい、個人活動中の方もご応募いただけます。ご状況は面談の際にご相談ください。",
  },
  {
    question: "選考結果はどのように連絡されますか？",
    answer:
      "ご登録いただいたメールアドレス宛にご連絡いたします。",
  },
  {
    question: "契約に縛りやペナルティはありますか？",
    answer:
      "活動の強制や過度な縛りは設けておりません。詳細は面談にてご確認いただけます。",
  },
  {
    question: "キャラクターイラストは自分で用意する必要がありますか？",
    answer:
      "制作支援の制度がございます。詳細は面談にてご説明いたします。",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-[#F5F7FA]"
    >
      <SectionNum num="06" label="FAQ" />

      {/* Background character decoration */}
      <div className="absolute bottom-0 right-0 translate-x-1/3 w-[400px] md:w-[550px] lg:w-[700px] h-[250px] md:h-[330px] lg:h-[420px] pointer-events-none opacity-[0.06] blur-sm select-none z-0 overflow-hidden">
        <img
          src="https://storage.readdy-site.link/project_files/ac1b0492-6d54-49c0-9967-0971c4535cb1/429fb7b6-5210-4081-b615-69c2f8c8b847_-.png?v=bb8634e54637d551c1f40a21af822685"
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
            <h2 className="section-title text-navy mt-4">FAQ</h2>
            <p className="section-subtitle text-gray-500">よくあるご質問</p>
          </div>

          {/* FAQ List */}
          <div className="space-y-3 md:space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } ${
                  openIndex === index
                    ? "shadow-lg shadow-navy/5 border-primary/20"
                    : "hover:shadow-md"
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-primary font-black text-sm mt-0.5">
                      Q.
                    </span>
                    <span className="text-navy font-bold text-base md:text-lg leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <span
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                      openIndex === index
                        ? "bg-primary text-white rotate-45"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <i className="ri-add-line text-lg"></i>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                    <div className="flex items-start gap-3 border-t border-gray-100 pt-4">
                      <span className="flex-shrink-0 text-gold font-black text-sm mt-0.5">
                        A.
                      </span>
                      <p className="text-gray-600 text-sm md:text-base leading-[1.8]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}