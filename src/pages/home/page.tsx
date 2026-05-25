import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Streams from './components/Streams';
import Works from './components/Works';
import Booth from './components/Booth';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  useEffect(() => {
    // SEO設定
    document.title = '黄白レモ  オフィシャルサイト';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'アイドル見習い、ぶいじだい所属おしゃべり最強Vtuber黄白レモの公式ホームページです');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', '黄白レモ,VTuber,バーチャルYouTuber,アイドル,配信,ホロライブ,にじさんじ,ミリプロ,ぶいじだい,パレプロ');
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://kishiro-lemo.com/');
    }

    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', '黄白レモ  オフィシャルサイト');

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', 'アイドル見習い、ぶいじだい所属おしゃべり最強Vtuber黄白レモの公式ホームページです');

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', 'https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/a8a72769654fae757fef6af693b6a85a.jpeg');

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', 'https://kishiro-lemo.com/');

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    // Twitter Card tags
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      twitterCard = document.createElement('meta');
      twitterCard.setAttribute('name', 'twitter:card');
      document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');

    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', '黄白レモ  オフィシャルサイト');

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', 'アイドル見習い、ぶいじだい所属おしゃべり最強Vtuber黄白レモの公式ホームページです');

    let twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', 'https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/a8a72769654fae757fef6af693b6a85a.jpeg');

    // Schema.org JSON-LD
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://kishiro-lemo.com';
    
    // Person Schema
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "黄白レモ",
      "jobTitle": "VTuber・アイドル見習い",
      "description": "アイドル見習い、ぶいじだい所属おしゃべり最強Vtuber黄白レモの公式ホームページです",
      "url": `${siteUrl}/`,
      "image": "https://static.readdy.ai/image/b65de5633db5ffa0e36810477d021701/a8a72769654fae757fef6af693b6a85a.jpeg",
      "sameAs": [
        "https://www.youtube.com/@kishirolemo",
        "https://x.com/kishiro_lemo"
      ],
      "affiliation": {
        "@type": "Organization",
        "name": "ぶいじだい"
      }
    };

    // WebSite Schema with SearchAction
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "黄白レモ オフィシャルサイト",
      "url": `${siteUrl}/`,
      "description": "アイドル見習い、ぶいじだい所属おしゃべり最強Vtuber黄白レモの公式ホームページです",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteUrl}/?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Person",
        "name": "黄白レモ"
      }
    };

    const personScript = document.createElement('script');
    personScript.type = 'application/ld+json';
    personScript.text = JSON.stringify(personSchema);
    personScript.setAttribute('data-schema', 'person');
    document.head.appendChild(personScript);

    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.text = JSON.stringify(websiteSchema);
    websiteScript.setAttribute('data-schema', 'website');
    document.head.appendChild(websiteScript);

    return () => {
      document.head.removeChild(personScript);
      document.head.removeChild(websiteScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50">
      <Navbar />
      <Hero />
      <div className="relative overflow-hidden">
        {/* Fixed background image - visible throughout all sections */}
        <div className="fixed inset-0 z-0">
          <img
            src="https://storage.readdy-site.link/project_files/7ff91c0f-3f45-467e-ba02-adf1cf9750c3/8c9d3944-5461-413e-aac5-fe071f5538c2__.jpg?v=a677c0ffb8242d0afae6b03ec43f4836"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Subtle dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10">
          <About />
          <Streams />
          <Works />
          <Booth />
          <Contact />
        </div>
      </div>
      <Footer />
    </div>
  );
}