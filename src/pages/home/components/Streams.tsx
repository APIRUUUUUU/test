import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { streams } from '../../../mocks/streams';
import { getYouTubeThumbnail } from '../../../utils/youtube';

export default function Streams() {
  const [visibleCount, setVisibleCount] = useState(4);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const allStreams = streams.utaita;
  const visibleStreams = allStreams.slice(0, visibleCount);
  const hasMore = visibleCount < allStreams.length;

  const handleShowMore = () => {
    setVisibleCount(allStreams.length);
  };

  return (
    <section
      id="streams"
      className="relative py-32 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-6xl md:text-8xl font-bold mb-16 text-yellow-400"
            style={{
              fontFamily: 'Rubik Mono One, cursive',
              letterSpacing: '0.05em',
            }}
          >
            MUSIC VIDEOS
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {visibleStreams.map((stream, index) => (
              <motion.a
                key={stream.id}
                href={stream.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="relative aspect-[2/1] overflow-hidden">
                    <img
                      src={getYouTubeThumbnail(stream.url)}
                      alt={stream.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes('maxresdefault')) {
                          target.src = target.src.replace('maxresdefault', 'hqdefault');
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base text-gray-900 line-clamp-2">
                      {stream.title}
                    </h3>
                  </div>
                </div>
              </motion.a>
            ))}
        </div>

        {/* もっと見るボタン */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleShowMore}
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-all active:scale-95 cursor-pointer"
            >
              もっと見る
            </button>
          </div>
        )}
      </div>
    </section>
  );
}