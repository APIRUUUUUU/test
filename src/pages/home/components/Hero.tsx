import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black">
        {/* Desktop */}
        <iframe
          className="hidden md:block"
          src="https://www.youtube.com/embed/C82f6nKjGSY?autoplay=1&mute=1&loop=1&playlist=C82f6nKjGSY&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&cc_load_policy=0&start=0&end=0&enablejsapi=1&hd=1&vq=hd1080"
          allow="autoplay; encrypted-media"
          title="Background Video"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'max(100vw, 177.78vh)',
            height: 'max(56.25vw, 100vh)',
            minWidth: '100vw',
            minHeight: '100vh',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            border: 'none'
          }}
        />
        {/* Mobile */}
        <img
          className="md:hidden absolute inset-0 w-full h-full"
          src="https://storage.readdy-site.link/project_files/7ff91c0f-3f45-467e-ba02-adf1cf9750c3/9c9d0b36-0f8f-408f-83ab-5d6f7d68a5dd_unnamed.png?v=418"
          alt="Mobile Background"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            pointerEvents: 'none',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30 hidden md:block" />
      </div>
    </section>
  );
}