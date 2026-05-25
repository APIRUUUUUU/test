import { useEffect } from 'react';
import { motion } from 'motion/react';

const guidelines = [
  {
    title: '呼び方',
    items: [
      '「レモちゃん」「きしろん」など、親しみやすい呼び方でOK！',
      '敬称は自由ですが、過度に馴れ馴れしい呼び方はご遠慮ください'
    ]
  },
  {
    title: 'ファンアート・二次創作',
    items: [
      'イラストや小説、実物のアートなどなんでも大歓迎！ハッシュタグ「#黄白絵も」をつけてぜひ投稿してください！',
      '公序良俗に反する内容、過度な性的表現は禁止です',
      '商用利用の場合は事前にご相談ください'
    ]
  },
  {
    title: '切抜き動画',
    items: [
      '概要欄に切抜き元配信のURLを必ず記載してください',
      'Twitterに上げる際は「#カットレモ」をつけて投稿してください',
      '誤解を生むような発言を誇張したり印象を悪くするような悪意のある切り抜きは固くお断りします'
    ]
  },
  {
    title: 'SNSでの交流',
    items: [
      'みなさまのリプは一つ一つ大切に読ませていただいております！多忙の時などいいねだけで返させていただくことがありますがご理解頂けますと幸いです',
      '個人情報の詮索はご遠慮ください',
      '他のVTuberとの比較や対立を煽る発言は禁止です'
    ]
  }
];

export default function Guideline() {
  useEffect(() => {
    // SEO設定
    document.title = 'ガイドライン | 黄白レモ';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '黄白レモの配信ガイドライン。視聴者の皆様に楽しんでいただくためのルールをご確認ください。');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', '黄白レモ,ガイドライン,配信ルール,VTuber,ぶいじだい');
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://kishiro-lemo.com/guideline');
    }

    // Schema.org JSON-LD
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://kishiro-lemo.com';
    
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "ガイドライン | 黄白レモ",
      "description": "黄白レモの配信ガイドライン。視聴者の皆様に楽しんでいただくためのルールをご確認ください。",
      "url": `${siteUrl}/guideline`,
      "mainEntity": {
        "@type": "CreativeWork",
        "name": "配信ガイドライン",
        "author": {
          "@type": "Person",
          "name": "黄白レモ"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.title = '黄白レモ  オフィシャルサイト';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'アイドル見習い、ぶいじだい所属おしゃべり最強Vtuber黄白レモの公式ホームページです');
      }
      if (metaKeywords) {
        metaKeywords.setAttribute('content', '黄白レモ,VTuber,バーチャルYouTuber,アイドル,配信,ホロライブ,にじさんじ,ミリプロ,ぶいじだい,パレプロ');
      }
      if (canonical) {
        canonical.setAttribute('href', 'https://kishiro-lemo.com/');
      }
      document.head.removeChild(script);
    };
  }, []);

  const handleBackToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    
    window.REACT_APP_NAVIGATE('/');
    setTimeout(() => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-yellow-400 border-b-4 border-yellow-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <a
            href="/"
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-yellow-600 rounded-lg font-bold hover:bg-yellow-50 transition-all border-2 border-yellow-600 shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer"
          >
            <i className="ri-arrow-left-line text-xl"></i>
            ホームに戻る
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 
              className="text-5xl md:text-6xl font-black mb-6 text-yellow-400"
              style={{ fontFamily: 'Rubik Mono One, cursive', letterSpacing: '0.05em' }}
            >
              GUIDELINE
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              みんなが楽しく過ごせるように、<br />
              以下のルールを守ってくださいね！
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guidelines Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {guidelines.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border-4 border-yellow-400 shadow-lg"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-600 flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center bg-yellow-400 text-white rounded-full text-lg">
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-gray-700 text-lg">
                    <i className="ri-checkbox-circle-fill text-yellow-500 text-xl mt-1 flex-shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* 三面図画像 - ファンアート・二次創作セクションのみ表示 */}
              {index === 1 && (
                <div className="mt-8 pt-8 border-t-2 border-yellow-200">
                  <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
                    <i className="ri-image-line"></i>
                    三面図
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-yellow-200">
                    <img
                      src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/7799deb81dc7c2dbd164ffe0a23f42ab.png"
                      alt="黄白レモ キャラクター三面図"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-yellow-400 rounded-2xl p-12 border-4 border-yellow-500 shadow-lg"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">
              ご協力ありがとうございます！
            </h2>
            <p className="text-xl text-white leading-relaxed mb-8">
              みんなで楽しい配信を作っていきましょう！<br />
              質問や不明点があれば、お気軽にお問い合わせください
            </p>
            <a
              href="/"
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-yellow-600 rounded-xl font-bold text-lg hover:bg-yellow-50 transition-all border-2 border-white shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              <i className="ri-home-4-line text-xl"></i>
              ホームに戻る
            </a>
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
