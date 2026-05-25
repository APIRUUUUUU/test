import { useEffect, useRef, useState } from "react";
import SectionNum from "@/components/SectionNum";

const supportItems = [
  {
    icon: "ri-user-smile-line",
    title: "キャラクターイラスト制作支援",
    description:
      "提携イラストレーターによる、あなただけのオリジナルアバターを制作します。",
  },
  {
    icon: "ri-customer-service-2-line",
    title: "専任マネージャーによる個別サポート",
    description:
      "配信の改善・スケジュール管理・数字の分析まで、専任スタッフが二人三脚で伴走します。",
  },
  {
    icon: "ri-vip-crown-line",
    title: "ランクボーナス・収益サポート",
    description:
      "IRIAMのランクに応じた報酬還元制度を導入。努力がしっかりと実績につながります。",
  },
  {
    icon: "ri-book-open-line",
    title: "配信ノウハウの提供",
    description:
      "未経験者も安心のマニュアル・勉強会を用意。配信の始め方から伸ばし方まで丁寧にサポートします。",
  },
  {
    icon: "ri-calendar-check-line",
    title: "定期面談・相談窓口",
    description:
      "月1回の個別面談で現状・悩み・目標を一緒に整理。いつでも気軽に相談できる環境があります。",
  },
  {
    icon: "ri-team-line",
    title: "ライバー同士の交流の場",
    description:
      "所属ライバー同士でつながれるコミュニティを用意。コラボ企画や情報交換もしやすい環境です。",
  },
  {
    icon: "ri-heart-3-line",
    title: "ノルマなし・自由な活動スタイル",
    description:
      "活動頻度に関する強制ノルマはありません。自分のライフスタイルに合わせて活動できます。",
  },
  {
    icon: "ri-computer-line",
    title: "機材・環境サポート（相談可）",
    description:
      "配信環境の構築についても、必要に応じてスタッフがアドバイスします。",
  },
];

export default function SupportSection() {
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
      id="support"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-white"
    >
      <SectionNum num="03" label="SUPPORT" />

      {/* Background character decoration */}
      <div className="absolute bottom-0 right-0 translate-x-1/4 w-[400px] md:w-[600px] lg:w-[800px] h-[250px] md:h-[350px] lg:h-[450px] pointer-events-none opacity-[0.06] blur-sm select-none z-0 overflow-hidden">
        <img
          src="https://storage.readdy-site.link/project_files/ac1b0492-6d54-49c0-9967-0971c4535cb1/58b6f031-4bb3-447c-a220-a34541444c62_unnamed.png?v=2d764778523484b32e94170817674abe"
          alt=""
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="section-subtitle text-gray-500">しゅりプロが提供するサポート</p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {supportItems.map((item, index) => (
              <div
                key={index}
                className={`group relative bg-[#F8F9FC] rounded-2xl p-6 md:p-7 border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-navy/5 text-navy mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                  <i className={`${item.icon} text-xl md:text-2xl`}></i>
                </div>

                {/* Title */}
                <h3 className="text-navy font-bold text-base md:text-lg leading-snug mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}