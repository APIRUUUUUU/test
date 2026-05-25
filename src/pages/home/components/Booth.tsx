import { useRef } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';

export default function Booth() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="booth" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2
            className="text-7xl md:text-9xl font-bold text-yellow-400"
            style={{ fontFamily: 'Rubik Mono One, cursive', letterSpacing: '0.05em' }}
          >
            GOODS
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* らいどりリンク画像 */}
          <motion.a
            href="https://raidori.com/@kishiro_lemo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:scale-105 transition-transform cursor-pointer"
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/b428909493e8f83a0fad422ab3f03ed0.png"
              alt="らいどり"
              className="w-auto h-32 md:h-48 object-contain"
            />
          </motion.a>

          {/* 新しい画像 */}
          <motion.a
            href="https://vjidai.booth.pm/items"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:scale-105 transition-transform cursor-pointer"
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/85f63ec85c568ab3b7ad7a687fb74bd7.png"
              alt="らいどり"
              className="w-auto h-32 md:h-48 object-contain"
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
