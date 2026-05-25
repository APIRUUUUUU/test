import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// 達成目標データ
const goals = [
  {
    icon: 'youtube',
    title: 'チャンネル登録者数',
    target: '3万人',
    description: 'YouTubeチャンネル登録',
    useYouTubeIcon: true
  },
  {
    icon: '👥',
    title: 'メンバーシップ人数',
    target: '200人',
    description: 'メンバーシップ加入'
  },
  {
    icon: 'image',
    title: 'とにかくやりきること!!!',
    target: '全力で!',
    description: '最後まで頑張る',
    imageUrl: 'https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/8b541c9e7ce1dd26b1760c1ac02dbcd2.png'
  }
];

// 期間中に実施する活動データ
const activities = [
  {
    icon: '✨',
    title: 'Xコミュニティ【黄白カンパニー】開設',
    description: '→ついにパ員さんたちの務める会社がXに進出することになりました！',
    link: 'https://x.com/i/communities/1991193025075433882'
  },
  {
    icon: '✨',
    title: 'P専用のメンバーシップ開設',
    description: '→最終的にここがファン数の測定対象になります！',
    link: 'https://www.youtube.com/channel/UCO0UOvSRvaRe2XTBQ5pjRYQ/join'
  },
  {
    icon: '✨',
    title: '月一回の演出盛り盛りライブ歌枠開催',
    description: '→合わせてライドリ握手会も実施！',
    link: 'https://www.youtube.com/live/tOFrofFmbgU?si=YeSyI0n11tCyQ6Jb'
  },
  {
    icon: '✨',
    title: '毎月20日にP総会',
    description: '→その月に上がったステータスや活動内容の振り返り',
    link: 'https://www.youtube.com/live/IWMuro8i1Q0?si=f55XkYlhnuNd2X3q'
  },
  {
    icon: '✨',
    title: 'アイドル化プロジェクトのPV公開！',
    description: '→最高のPVが完成しました！'
  }
];

// 進捗状況データ
const progressData = {
  subscribers: {
    current: 17965,
    target: 30000,
    label: 'チャンネル登録者数'
  },
  membership: {
    current: 80,
    target: 200,
    label: 'メンバーシップ人数'
  }
};

export default function IdolProjectPage() {
  useEffect(() => {
    // SEO設定
    document.title = 'アイドル化プロジェクト | 黄白レモ';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '黄白レモのアイドル化プロジェクト。2025年11月20日から2026年3月25日まで、チャンネル登録者数3万人とメンバーシップ200人を目指す特別企画。達成で3D化が実現します！');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', '黄白レモ,アイドル化プロジェクト,VTuber,3D化,チャンネル登録,メンバーシップ,YouTube,ぶいじだい');
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `${import.meta.env.VITE_SITE_URL || 'https://kishiro-lemo.com'}/idol-project`);
    }

    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'アイドル化プロジェクト | 黄白レモ');

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', '黄白レモのアイドル化プロジェクト。2025年11月20日から2026年3月25日まで、チャンネル登録者数3万人とメンバーシップ200人を目指す特別企画。達成で3D化が実現します！');

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', 'https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/6f30ab885501be6dab2f5e0319f152a9.png');

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', `${import.meta.env.VITE_SITE_URL || 'https://kishiro-lemo.com'}/idol-project`);

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    // Twitter Card tags
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', 'アイドル化プロジェクト | 黄白レモ');

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', '黄白レモのアイドル化プロジェクト。2025年11月20日から2026年3月25日まで、チャンネル登録者数3万人とメンバーシップ200人を目指す特別企画。達成で3D化が実現します！');

    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', 'https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/6f30ab885501be6dab2f5e0319f152a9.png');

    // Schema.org JSON-LD - Event Schema
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://kishiro-lemo.com';
    
    const eventSchema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "黄白レモ アイドル化プロジェクト",
      "description": "視聴者の皆様の応援によって、黄白レモの3D化を目指す特別企画。チャンネル登録者数3万人とメンバーシップ200人の達成を目指します。",
      "image": "https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/6f30ab885501be6dab2f5e0319f152a9.png",
      "startDate": "2025-11-20",
      "endDate": "2026-03-25",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
      "location": {
        "@type": "VirtualLocation",
        "url": `${siteUrl}/idol-project`
      },
      "organizer": {
        "@type": "Person",
        "name": "黄白レモ",
        "url": `${siteUrl}/`
      },
      "performer": {
        "@type": "Person",
        "name": "黄白レモ"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://www.youtube.com/channel/UCO0UOvSRvaRe2XTBQ5pjRYQ/join",
        "price": "0",
        "priceCurrency": "JPY",
        "availability": "https://schema.org/InStock",
        "validFrom": "2025-11-20"
      }
    };

    const eventScript = document.createElement('script');
    eventScript.type = 'application/ld+json';
    eventScript.text = JSON.stringify(eventSchema);
    eventScript.setAttribute('data-schema', 'event');
    document.head.appendChild(eventScript);

    return () => {
      // Cleanup meta tags and schema on unmount
      if (ogTitle && ogTitle.parentNode) document.head.removeChild(ogTitle);
      if (ogDescription && ogDescription.parentNode) document.head.removeChild(ogDescription);
      if (ogImage && ogImage.parentNode) document.head.removeChild(ogImage);
      if (ogUrl && ogUrl.parentNode) document.head.removeChild(ogUrl);
      if (ogType && ogType.parentNode) document.head.removeChild(ogType);
      if (twitterCard && twitterCard.parentNode) document.head.removeChild(twitterCard);
      if (twitterTitle && twitterTitle.parentNode) document.head.removeChild(twitterTitle);
      if (twitterDescription && twitterDescription.parentNode) document.head.removeChild(twitterDescription);
      if (twitterImage && twitterImage.parentNode) document.head.removeChild(twitterImage);
      document.head.removeChild(eventScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 border-b-4 border-yellow-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => {
              if (window.REACT_APP_NAVIGATE) {
                window.REACT_APP_NAVIGATE('/');
                setTimeout(() => {
                  const heroElement = document.getElementById('hero');
                  if (heroElement) {
                    heroElement.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }, 100);
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-yellow-600 rounded-lg font-bold hover:bg-yellow-50 transition-all border-2 border-yellow-600 shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer"
          >
            <i className="ri-arrow-left-line text-xl"></i>
            ホームに戻る
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 px-0">
        <div className="w-full">
          <img
            src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/6f30ab885501be6dab2f5e0319f152a9.png"
            alt="アイドル化プロジェクト"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* P貢 Explanation Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-yellow-50 rounded-2xl p-6 md:p-10 border-4 border-yellow-400 shadow-lg">
              <img 
                src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/cbaccb752555e1f17bbf0ecbf1bb5062.png" 
                alt="P貢の説明" 
                className="w-full mx-auto rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Project */}
      <section className="py-20 px-6 bg-yellow-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-center mb-12 text-yellow-600">
              &nbsp;プロジェクト概要
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-12 border-4 border-yellow-400 shadow-lg">
              <div className="space-y-6 text-gray-800 text-lg leading-relaxed">
                <p>
                  <span className="font-bold text-yellow-600">「アイドル化プロジェクト」</span>とは、視聴者の皆様の応援によって、
                  黄白レモのアイドル化を目指す企画です。
                </p>
                <p>
                  視聴者と一緒に様々な挑戦を達成することで、黄白レモがアイドルとして成長していきます。
                </p>
                <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-400">
                  <p className="font-bold text-yellow-600 text-xl mb-2">🎯 実施期間</p>
                  <p className="text-2xl font-bold text-gray-900">2025年11月20日～2026年○○月○○日まで！</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-center mb-4 text-yellow-600">
              &nbsp;期間中に実施すること
            </h2>
            <p className="text-center text-gray-700 mb-12 text-lg">
              プロジェクト期間中に様々な活動を実施します！
            </p>

            <div className="space-y-6">
              {activities.map((activity, index) => {
                const ActivityWrapper = activity.link ? 'a' : 'div';
                const wrapperProps = activity.link
                  ? {
                      href: activity.link,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'block bg-yellow-50 rounded-2xl p-6 md:p-8 border-4 border-yellow-400 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02]'
                    }
                  : {
                      className: 'bg-yellow-50 rounded-2xl p-6 md:p-8 border-4 border-yellow-400 shadow-lg'
                    };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ActivityWrapper {...wrapperProps}>
                      <div className="flex items-start gap-4">
                        <div className="text-3xl flex-shrink-0">{activity.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-yellow-600 mb-3 leading-tight">
                            {activity.title}
                          </h3>
                          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                            {activity.description}
                          </p>
                        </div>
                        {activity.link && (
                          <div className="flex-shrink-0">
                            <i className="ri-external-link-line text-2xl text-yellow-600"></i>
                          </div>
                        )}
                      </div>
                    </ActivityWrapper>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 px-6 bg-yellow-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-center mb-4 text-yellow-600">
              &nbsp;達成目標
            </h2>
            <p className="text-center text-gray-700 mb-12 text-lg">
              黄白レモがアイドルに成るための達成目標
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-8 border-4 border-yellow-400 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  {goal.useYouTubeIcon ? (
                    <div className="mb-6 flex items-center justify-center w-16 h-16 mx-auto">
                      <div className="w-16 h-16 flex items-center justify-center bg-red-600 text-white rounded-full">
                        <i className="ri-youtube-fill text-3xl"></i>
                      </div>
                    </div>
                  ) : goal.imageUrl ? (
                    <div className="mb-6 flex items-center justify-center w-16 h-16 mx-auto">
                      <img
                        src={goal.imageUrl}
                        alt={goal.title}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="mb-6 text-center flex items-center justify-center w-16 h-16 mx-auto">
                      <span className="text-6xl">{goal.icon}</span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-center mb-4 text-yellow-600">
                    {goal.title}
                  </h3>
                  <div className="text-center">
                    <p className="text-4xl font-black text-gray-900 mb-2">{goal.target}</p>
                    <p className="text-gray-600">{goal.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Training Stats */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black text-center mb-4 text-yellow-600">
              &nbsp;育成項目
            </h2>
            <p className="text-center text-gray-700 mb-3 text-lg">
              5つのパラメーターを成長させよう！
            </p>
            <div className="text-center mb-12">
              <img 
                src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/3c3305197af8819f842dc5eea05db5a3.png" 
                alt="配信フレームが付きます" 
                className="inline-block max-w-full h-auto rounded-xl"
              />
            </div>

            <div className="flex justify-center">
              <img 
                src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/8da35b1875a755c659ea143cb05bb097.png" 
                alt="育成項目内容" 
                className="max-w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-black mb-8 text-white">
              &nbsp;応援よろしくお願いします！
            </h2>
            <p className="text-xl text-white mb-12 leading-relaxed">
              YouTubeのチャンネル登録・メンバーシップ加入、<br />
              Xでのフォロー＆拡散で夢を一緒に応援しよう！
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://www.youtube.com/@kishirolemo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-yellow-600 rounded-xl font-bold text-lg hover:bg-yellow-50 transition-all border-2 border-white shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                <i className="ri-youtube-fill text-2xl"></i>
                YouTubeで応援
              </a>
              <a
                href="https://x.com/kishiro_lemo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-yellow-600 rounded-xl font-bold text-lg hover:bg-yellow-50 transition-all border-2 border-white shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                <i className="ri-twitter-x-fill text-2xl"></i>
                Xで応援
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-yellow-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            © 2026 kishiro lemo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}