import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadingComplete();
      }, 600);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* ロゴ画像 */}
        <img
          src="https://storage.readdy-site.link/project_files/7ff91c0f-3f45-467e-ba02-adf1cf9750c3/b178f61a-dee8-459d-a1ec-1b0cae6ebefc_unnamed.png?v=9b4e8df9b2878c0bee98836153c61152"
          alt="黄白レモ"
          className="h-32 md:h-48 w-auto object-contain"
        />
        
        {/* ローディングテキスト */}
        <p className="text-sm font-medium text-gray-500 animate-pulse tracking-widest">
          LOADING
        </p>
      </div>
    </div>
  );
}