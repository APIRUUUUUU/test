import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { works } from '../../../mocks/works';

export default function Works() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [openYears, setOpenYears] = useState<string[]>([]);

  const toggleYear = (year: string) => {
    setOpenYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  return (
    <section id="works" className="relative py-32 overflow-hidden" ref={ref}>
      {/* 斜め背景アクセント — ABOUTと逆方向でリズム感を出す */}
      <div 
        className="absolute inset-0 bg-yellow-50 -z-10"
        style={{ 
          clipPath: 'polygon(0 0, 100% 5%, 100% 100%, 0 95%)',
        }}
      />
      {/* 斜めストライプ装飾 */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(250, 204, 21, 0.04) 80px, rgba(250, 204, 21, 0.04) 160px)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-6xl md:text-8xl font-bold mb-16 text-yellow-400"
            style={{ fontFamily: 'Rubik Mono One, cursive', letterSpacing: '0.05em' }}
          >
            WORKS
          </h2>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {works.map((yearGroup, yearIndex) => {
            const isOpen = openYears.includes(yearGroup.year);
            
            return (
              <motion.div
                key={yearGroup.year}
                initial={{ opacity: 0, x: yearIndex % 2 === 0 ? -80 : 80 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + yearIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="border-2 border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleYear(yearGroup.year)}
                  className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-yellow-50 to-white hover:from-yellow-100 hover:to-yellow-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></div>
                    <h3 className="text-3xl font-bold text-gray-900">{yearGroup.year}</h3>
                    <span className="ml-4 text-sm text-gray-500 font-medium">
                      ({yearGroup.items.length}件)
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <i className="ri-arrow-down-s-line text-2xl text-gray-600"></i>
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="grid md:grid-cols-2 gap-6 p-6 bg-white">
                        {yearGroup.items.map((item, itemIndex) => (
                          <motion.div
                            key={item.id}
                            className="group relative bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-yellow-400"
                            initial={{ opacity: 0, x: itemIndex % 2 === 0 ? -40 : 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.04 * itemIndex, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {item.client && (
                              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full mb-3">
                                {item.client}
                              </span>
                            )}
                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-yellow-600 transition-colors">
                              {item.title}
                            </h4>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
