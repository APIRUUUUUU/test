import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'ABOUT' },
    { id: 'streams', label: 'MUSIC VIDEOS' },
    { id: 'works', label: 'WORKS' },
    { id: 'guideline', label: 'GUIDELINE' },
    { id: 'booth', label: 'GOODS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'streams', 'works', 'guideline', 'booth', 'contact'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'guideline') {
      window.REACT_APP_NAVIGATE('/guideline');
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleIdolProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.REACT_APP_NAVIGATE('/idol-project');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white border-b border-gray-100' : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-10">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between h-20">

            {/* Logo */}
            <div
              className="cursor-pointer flex-shrink-0"
              onClick={scrollToTop}
            >
              <img
                src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/d75da0f7a48246201469a3cf5ed31fab.png"
                alt="黄白レモ"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>

            {/* PC ナビゲーション */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-xs tracking-widest font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap pb-0.5 ${
                    activeSection === item.id
                      ? isScrolled
                        ? 'text-gray-900'
                        : 'text-yellow-300'
                      : isScrolled
                        ? 'text-gray-500 hover:text-gray-900'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px transition-all duration-300 ${
                      activeSection === item.id
                        ? 'w-full bg-yellow-400'
                        : 'w-0 bg-yellow-400'
                    }`}
                  />
                </button>
              ))}
            </nav>

            {/* 右側 */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* CTAボタン */}
              <a
                href="/idol-project"
                onClick={handleIdolProjectClick}
                className={`hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs tracking-wider font-semibold border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isScrolled
                    ? 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-gray-800'
                }`}
              >
                <i className="ri-star-line text-sm"></i>
                アイドル化プロジェクト
              </a>

              {/* モバイルメニューボタン */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden w-10 h-10 flex items-center justify-center cursor-pointer z-50 transition-colors duration-200 ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                <i className={`text-2xl ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* モバイルメニュー */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-72 bg-white z-40 lg:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-8">
          {/* アイドル化プロジェクト */}
          <a
            href="/idol-project"
            onClick={handleIdolProjectClick}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-gray-800 text-gray-800 text-xs tracking-widest font-semibold mb-8 cursor-pointer whitespace-nowrap hover:bg-gray-800 hover:text-white transition-colors duration-200"
          >
            <i className="ri-star-line"></i>
            アイドル化プロジェクト
          </a>

          {/* ナビゲーション */}
          <nav className="flex-1">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-2 py-3.5 text-xs tracking-widest font-medium border-b border-gray-100 transition-colors duration-200 cursor-pointer ${
                      activeSection === item.id
                        ? 'text-gray-900'
                        : 'text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ソーシャルリンク */}
          <div className="flex items-center gap-5 pt-6">
            <a
              href="https://www.youtube.com/@kishirolemo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-youtube-fill text-xl"></i>
            </a>
            <a
              href="https://x.com/kishiro_lemo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-twitter-x-fill text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* オーバーレイ */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden cursor-pointer"
        />
      )}
    </>
  );
}
