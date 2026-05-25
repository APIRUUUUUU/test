import { motion } from 'motion/react';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-6 mb-6">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <img 
              src="https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/f807e7683975a13fa1083bff921e7260.png" 
              alt="黄白レモ" 
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center md:justify-start">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:flex md:gap-x-4 md:gap-y-0">
              <li>
                <a href="#about" className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">
                  ABOUT
                </a>
              </li>
              <li>
                <a href="#streams" className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">
                  MUSIC VIDEOS
                </a>
              </li>
              <li>
                <a href="#works" className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">
                  WORKS
                </a>
              </li>
              <li>
                <a href="#booth" className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">
                  GOODS
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end">
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/@kishirolemo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition-all hover:scale-110 cursor-pointer text-base"
              >
                <i className="ri-youtube-fill"></i>
              </a>
              <a
                href="https://x.com/kishiro_lemo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full hover:bg-gray-800 transition-all hover:scale-110 cursor-pointer text-base"
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-400 text-xs text-center md:text-left">
              © 2026 黄白レモ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
