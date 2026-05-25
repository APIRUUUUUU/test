export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://storage.readdy-site.link/project_files/ac1b0492-6d54-49c0-9967-0971c4535cb1/a2c23718-84aa-413d-9ff7-7f900f1de695_image.webp?v=6058d5cae647ab6423996541af698dae"
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
        <span className="text-white/40 text-xs tracking-widest">SCROLL</span>
        <i className="ri-arrow-down-line text-white/40 text-xl"></i>
      </div>
    </section>
  );
}