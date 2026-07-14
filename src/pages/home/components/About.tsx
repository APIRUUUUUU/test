import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showCostume, setShowCostume] = useState(false);
  const [showThreeView, setShowThreeView] = useState(false);

  const images = [
    'https://public.readdy.ai/ai/img_res/a1050763-a546-43a0-8952-e360a82d8099.png',
    'https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/ae568e054b5412895439340cb49bd5ac.png',
    'https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/cda583f66158337f473b9218153ddb0d.png',
    'https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/9f55f5f2c1e94112e0a090382c469640.png',
    'https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/24fab2b8df5affff16bda060bd94867f.png',
    'https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/013beedd8e62936559bd28de32a28a86.png',
  ];

  // 自動再生機能
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // 3秒ごとに切り替え

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const handlePrevImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleIndicatorClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentImageIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      {/* 斜め背景アクセント */}
      <div 
        className="absolute inset-0 bg-yellow-50"
        style={{ 
          clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)',
        }}
      />
      {/* 斜めストライプ装飾 */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(-45deg, transparent, transparent 80px, rgba(250, 204, 21, 0.04) 80px, rgba(250, 204, 21, 0.04) 160px)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-7xl md:text-9xl font-bold mb-16 text-yellow-400"
            style={{ fontFamily: 'Rubik Mono One, cursive', letterSpacing: '0.05em' }}
          >
            ABOUT
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="w-full h-[500px] rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 relative group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt="黄白レモ"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              
              {/* 左矢印ボタン */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer z-10"
                aria-label="前の画像"
              >
                <i className="ri-arrow-left-s-line text-2xl"></i>
              </button>

              {/* 右矢印ボタン */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer z-10"
                aria-label="次の画像"
              >
                <i className="ri-arrow-right-s-line text-2xl"></i>
              </button>

              {/* 自動再生ボタン */}
              <button
                onClick={toggleAutoPlay}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer z-10"
                aria-label={isAutoPlaying ? '自動再生を停止' : '自動再生を開始'}
              >
                {isAutoPlaying ? (
                  <i className="ri-pause-fill text-xl"></i>
                ) : (
                  <i className="ri-play-fill text-xl"></i>
                )}
              </button>

              {/* インジケーター */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleIndicatorClick(index)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      index === currentImageIndex
                        ? 'bg-yellow-400 w-6'
                        : 'bg-white/60 hover:bg-white/80 w-2'
                    }`}
                    aria-label={`画像${index + 1}に移動`}
                  />
                ))}
              </div>
            </div>

            {/* ボタンエリア */}
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setShowThreeView(true)}
                className="px-8 py-4 bg-yellow-400 text-gray-800 font-bold rounded-full hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg cursor-pointer whitespace-nowrap flex items-center gap-3"
              >
                <i className="ri-image-line text-xl"></i>
                <span>三面図はこちら</span>
              </button>
              <button
                onClick={() => setShowCostume(true)}
                className="px-8 py-4 bg-white text-gray-800 font-bold rounded-full hover:bg-yellow-50 transition-all hover:scale-105 shadow-lg cursor-pointer whitespace-nowrap flex items-center gap-3 border-2 border-yellow-400"
              >
                <i className="ri-shirt-line text-xl"></i>
                <span>衣装一覧はこちら</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6">
              <img 
                src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/62531e3cdcb4f6757166ce064ffa4b96.png" 
                alt="黄白レモ" 
                className="h-24 md:h-32 w-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* 所属事務所ロゴ */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-base text-gray-600 font-medium">所属:</span>
              <a
                href="https://vjidai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform cursor-pointer"
              >
                <img 
                  src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/1e632cfe45b9dedf5f3c5c6818fec39c.png" 
                  alt="ぶいじだい" 
                  className="h-12 w-auto object-contain"
                  loading="lazy"
                />
              </a>
            </div>
            
            <div className="space-y-4 mb-8 text-gray-700 leading-relaxed">
              <p>
                フレッシュでエネルギッシュなVTuberアイドル。明るく元気な配信で、視聴者の皆さんに笑顔と元気をお届けします！
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { label: '身長', value: '157cm' },
                { label: '誕生日', value: '11月12日' },
                { label: '好きな食べ物', value: 'パイナップル、/nポップコーン' },
                { label: '好きなこと', value: 'おしゃべり、演技、演出、ゲーム' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="bg-yellow-50 p-6 rounded-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                  <p className={`font-bold text-yellow-600 ${item.value.length > 6 ? 'text-lg' : 'text-2xl'}`}>{item.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex flex-wrap gap-4 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="https://www.youtube.com/@kishirolemo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition-all hover:scale-110 shadow-lg cursor-pointer"
              >
                <i className="ri-youtube-fill text-xl"></i>
              </a>
              <a
                href="https://x.com/kishiro_lemo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all hover:scale-110 shadow-lg cursor-pointer"
              >
                <i className="ri-twitter-x-fill text-xl"></i>
              </a>
              <a
                href="https://plicy.net/GamePlay/217070"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-yellow-400 text-gray-800 font-bold rounded-full hover:bg-yellow-500 transition-all hover:scale-105 shadow-lg cursor-pointer whitespace-nowrap flex items-center gap-2"
              >
                <i className="ri-gamepad-fill text-lg"></i>
                <span>オリジナルゲームはコチラ</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 三面図モーダル */}
      <AnimatePresence>
        {showThreeView && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowThreeView(false)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-auto rounded-2xl shadow-2xl bg-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowThreeView(false)}
                className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
                aria-label="閉じる"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
              <img
                src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/967e372227f2b78527c773f25655b6b2.png"
                alt="黄白レモ 三面図 - Kishiro Lemo Three View"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 衣装一覧モーダル */}
      <AnimatePresence>
        {showCostume && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowCostume(false)}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-[90vh] overflow-auto rounded-2xl shadow-2xl bg-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowCostume(false)}
                className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all hover:scale-110 cursor-pointer"
                aria-label="閉じる"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
              <img
                src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/fa1c8979c70dbcfe8b0184484d63e644.png"
                alt="黄白レモ 衣装一覧 - Kishiro's Costume List"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
