import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center"
          >
            <img
              src="https://storage.readdy-site.link/project_files/ac1b0492-6d54-49c0-9967-0971c4535cb1/043ddd41-005e-4d43-8967-b9f0d06ead92_unnamed.png?v=72311d87d751f027ed1bc4a8eb818538"
              alt="しゅりプロ"
              className={`h-8 md:h-10 w-auto transition-all duration-300 ${
                isScrolled ? "brightness-100" : "brightness-0 invert"
              }`}
            />
          </a>

          {/* CTA Button - Desktop */}
          <a
            href="#apply"
            onClick={(e) => handleNavClick(e, "#apply")}
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full whitespace-nowrap transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30 active:scale-95"
          >
            今すぐ応募する
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              isScrolled ? "text-navy" : "text-white"
            }`}
            aria-label="メニュー"
          >
            <i className={`ri-${isMobileMenuOpen ? "close" : "menu"}-line text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-lg shadow-lg border-t border-gray-100 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col py-4 px-4">
          <a
            href="#apply"
            onClick={(e) => handleNavClick(e, "#apply")}
            className="mx-4 mt-3 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-full whitespace-nowrap"
          >
            今すぐ応募する
          </a>
        </nav>
      </div>
    </header>
  );
}