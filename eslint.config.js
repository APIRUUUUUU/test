import { useEffect, useRef, useState } from "react";
import { fanArtItems } from "./fan-art";
import { siteConfig } from "./site.config";

function MovieThumb({
  src,
  title,
  index
}: {
  src: string;
  title: string;
  index: number;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`movieThumb ${hasError ? "is-placeholder" : "has-image"}`} aria-label={`${title} サムネイル`}>
      {!hasError && <img src={src} alt="" onError={() => setHasError(true)} />}
      {hasError && <span className="movieThumb__placeholder">MOVIE {String(index + 1).padStart(2, "0")}</span>}
      <span className="movieThumb__play" aria-hidden="true" />
    </div>
  );
}

function SectionTitle({
  label,
  ja,
  centered = false
}: {
  label: string;
  ja?: string;
  centered?: boolean;
}) {
  return (
    <div className={`sectionTitle ${centered ? "sectionTitle--centered" : ""}`}>
      {!centered && <span>LEMO'S OFFICIAL</span>}
      <h2>{label}</h2>
      {ja && <p>{ja}</p>}
    </div>
  );
}

function scrollToPageSection(
  href: string,
  behavior: ScrollBehavior = "smooth",
  updateHistory = true
) {
  const hashIndex = href.indexOf("#");
  if (hashIndex < 0) return false;

  const sectionId = href.slice(hashIndex + 1);
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const headerOffset =
    window.innerWidth <= 640 ? 106 : window.innerWidth <= 900 ? 120 : 178;
  const top = Math.max(
    0,
    window.scrollY + target.getBoundingClientRect().top - headerOffset
  );

  if (updateHistory && window.location.hash !== `#${sectionId}`) {
    window.history.pushState(null, "", `#${sectionId}`);
  }
  window.scrollTo({ top, behavior });
  return true;
}

function updateMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
}

function HeaderLogo() {
  const [hasError, setHasError] = useState(false);

  return (
    <a className="headerLogo" href="/" aria-label="黄白レモ オフィシャルサイト トップページへ">
      {!hasError && (
        <img
          src={siteConfig.assets.headerLogo.src}
          alt={siteConfig.assets.headerLogo.alt}
          onError={() => setHasError(true)}
        />
      )}
      {hasError && (
        <span className="headerLogo__fallback">
          <strong>{siteConfig.nameJa}</strong>
          <small>{siteConfig.nameEn} OFFICIAL SITE</small>
        </span>
      )}
    </a>
  );
}

function HeroVisual() {
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [characterReady, setCharacterReady] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [finalReady, setFinalReady] = useState(false);
  const [finalComplete, setFinalComplete] = useState(false);

  useEffect(() => {
    if (!finalReady) return;

    const timer = window.setTimeout(() => setFinalComplete(true), 1600);
    return () => window.clearTimeout(timer);
  }, [finalReady]);

  return (
    <div
      className={`heroVisual ${backgroundReady && characterReady ? "is-ready" : ""}`}
      aria-label="黄白レモ アイドル化プロジェクト キービジュアル"
    >
      {!finalComplete && (
        <>
          <img
            className={`heroVisual__background ${backgroundReady ? "is-loaded" : ""}`}
            src={siteConfig.assets.keyVisualBackground.src}
            alt=""
            onLoad={() => setBackgroundReady(true)}
          />
          <img
            className={`heroVisual__character ${backgroundReady && characterReady ? "is-loaded" : ""}`}
            src={siteConfig.assets.keyVisualCharacter.src}
            alt={siteConfig.assets.keyVisualCharacter.alt}
            onLoad={() => setCharacterReady(true)}
            onAnimationEnd={() => setShowFinal(true)}
          />
        </>
      )}
      {showFinal && (
        <img
          className={`heroVisual__final ${finalReady ? "is-loaded" : ""}`}
          src={siteConfig.assets.keyVisualFinal.src}
          alt={siteConfig.assets.keyVisualFinal.alt}
          onLoad={() => setFinalReady(true)}
        />
      )}
    </div>
  );
}

function GuidelinePage() {
  return (
    <>
      <section className="guidelinePageIntro" id="top">
        <div className="guidelinePageIntro__inner">
          <nav className="guidelineBreadcrumb" aria-label="パンくずリスト">
            <a href="/">HOME</a>
            <span aria-hidden="true">/</span>
            <span>GUIDELINE</span>
          </nav>
          <SectionTitle label="GUIDELINE" centered />
        </div>
      </section>
      <section className="guidelineDocument">
        <div className="guidelineDocument__heading">
          <h2>二次創作ガイドライン</h2>
          <p>{siteConfig.guidelineLead}</p>
        </div>
        <div className="guidelineChapters">
          {siteConfig.guidelines.map((item, index) => (
            <section className="guidelineChapter" key={item.title}>
              <span className="guidelineChapter__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>
                  {index + 1}. {item.title}
                </h3>
                <p>{item.text}</p>
              </div>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}

const profileLabelJa: Record<string, string> = {
  Affiliation: "所属",
  Birthday: "誕生日",
  Height: "身長",
  "Favorite food": "好きな食べ物",
  Likes: "好きなこと",
  Hashtag: "総合タグ"
};

function ProfileGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const gallery = siteConfig.gallery;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isPaused || reducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % gallery.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [gallery.length, isPaused]);

  useEffect(() => {
    const nextImage = new Image();
    nextImage.src = gallery[(activeIndex + 1) % gallery.length].src;
  }, [activeIndex, gallery]);

  return (
    <section className="profileGallery" aria-labelledby="profile-gallery-title">
      <div className="profileSectionHeading profileSectionHeading--profile">
        <h2 className="profileSectionLabel" id="profile-gallery-title">GALLERY</h2>
      </div>
      <p className="profileGallery__subtitle">衣装一覧</p>
      <div className="profileGallery__stage">
        <img
          key={gallery[activeIndex].src}
          className={`profileGallery__image ${activeIndex === 0 ? "profileGallery__image--closeup" : ""}`}
          src={gallery[activeIndex].src}
          alt={gallery[activeIndex].alt}
        />
        <button
          className={`profileGallery__toggle ${isPaused ? "is-paused" : ""}`}
          type="button"
          aria-label={isPaused ? "ギャラリーの自動再生を開始" : "ギャラリーの自動再生を停止"}
          title={isPaused ? "再生" : "一時停止"}
          onClick={() => setIsPaused((current) => !current)}
        >
          <span aria-hidden="true" />
        </button>
        <div className="profileGallery__dots" aria-label="ギャラリー画像を選択">
          {gallery.map((item, index) => (
            <button
              key={item.src}
              className={index === activeIndex ? "is-active" : ""}
              type="button"
              aria-label={`${index + 1}枚目を表示`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="profileGallery__costumeBoard">
        <img
          src="/images/gallery/costume-list.webp"
          alt="黄白レモの衣装一覧"
        />
      </div>
      <section className="profileTurnaround" aria-labelledby="profile-turnaround-title">
        <h3 className="profileTurnaround__title" id="profile-turnaround-title">三面図</h3>
        <div className="profileTurnaround__images">
          <img
            src="/images/gallery/turnaround-character.webp"
            alt="黄白レモの衣装三面図"
          />
          <img
            className="profileTurnaround__mascot"
            src="/images/gallery/turnaround-mascot.webp"
            alt="マスコットの三面図"
          />
        </div>
      </section>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="profilePage" id="top">
      <div className="profilePage__layout">
        <aside className="profileVisual" aria-label="黄白レモ プロフィールビジュアル">
          <div className="profileVisual__sticky">
            <img
              className="profileVisual__character"
              src={siteConfig.assets.keyVisualCharacter.src}
              alt={siteConfig.assets.keyVisualCharacter.alt}
            />
            <div className="profileVisual__dots" aria-hidden="true" />
          </div>
        </aside>

        <div className="profileContent">
          <nav className="profileBreadcrumb" aria-label="パンくずリスト">
            <a href="/">HOME</a>
            <span aria-hidden="true">/</span>
            <span>PROFILE</span>
          </nav>

          <header className="profileIdentity">
            <img
              className="profileIdentity__logo"
              src={siteConfig.assets.logo.src}
              alt={siteConfig.assets.logo.alt}
            />
            <img
              className="profileIdentity__affiliation"
              src={siteConfig.assets.affiliationLogo.src}
              alt={siteConfig.assets.affiliationLogo.alt}
            />
            <div className="profileIdentity__name">
              <h1>{siteConfig.nameJa}</h1>
              <span>{siteConfig.nameEn}</span>
            </div>
            <div className="profileIdentity__socials" aria-label="黄白レモ 公式SNS">
              <a href={siteConfig.links[0].href} target="_blank" rel="noreferrer">
                <img src="/icons/youtube.svg" alt="" />
                <span>YouTube</span>
              </a>
              <a href={siteConfig.links[1].href} target="_blank" rel="noreferrer">
                <img src="/icons/x.svg" alt="" />
                <span>Official X</span>
              </a>
            </div>
          </header>

          <section className="profileIntroduction" aria-labelledby="profile-message-title">
            <div className="profileIntroduction__box">
              <h2 id="profile-message-title">「君の存在が私の頑張る理由」</h2>
              <p className="profileIntroduction__lines">
                <span>アイドルを夢見る16歳の見習い学生。</span>
                <span>黄城高校２年アイドル科。</span>
              </p>
              <p>
                <strong>
                  明るく元気な配信で、視聴者の皆さんに笑顔と元気をお届けします！
                </strong>
              </p>
            </div>
          </section>

          <section className="profileDetails" aria-labelledby="profile-details-title">
            <div className="profileSectionHeading profileSectionHeading--profile">
              <h2 className="profileSectionLabel" id="profile-details-title">PROFILE</h2>
            </div>
            <dl>
              {siteConfig.profile.map((item) => (
                <div key={item.label}>
                  <dt>
                    <span>{profileLabelJa[item.label] ?? item.label}</span>
                  </dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="profileTags" aria-labelledby="profile-tags-title">
            <div className="profileSectionHeading profileSectionHeading--profile">
              <h2 className="profileSectionLabel" id="profile-tags-title">TAGS</h2>
            </div>
            <dl>
              {siteConfig.tags.map((tag) => (
                <div key={tag.value}>
                  <dt>{tag.label}</dt>
                  <dd>
                    <a href={tag.href} target="_blank" rel="noreferrer">
                      {tag.value}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <ProfileGallery />
        </div>
      </div>
    </section>
  );
}

type LoaderPhase = "loading" | "leaving" | "done";

function SiteLoader({ phase }: { phase: LoaderPhase }) {
  if (phase === "done") return null;

  return (
    <div
      className={`siteLoader ${phase === "leaving" ? "is-leaving" : ""}`}
      role="progressbar"
      aria-label="サイトを読み込んでいます"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={phase === "leaving" ? "読み込み完了" : "読み込み中"}
    >
      <div className="siteLoader__inner">
        <img
          className="siteLoader__logo"
          src="/images/header-logo.webp"
          alt="Kishiro"
        />
        <div className="siteLoader__meter" aria-hidden="true">
          <span className="siteLoader__fill" />
        </div>
        <p className="siteLoader__label">
          LOADING
          <span aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </p>
      </div>
    </div>
  );
}

function FanArtGallery() {
  const [isExpanded, setIsExpanded] = useState(false);
  const placeholders = Math.max(0, 6 - fanArtItems.length);

  return (
    <div className="fanArtGallery">
      <div
        className={`fanArtGallery__frames ${isExpanded ? "is-expanded" : ""}`}
        id="fan-art-frames"
        aria-label="黄白レモのファンアート"
      >
        {fanArtItems.map((item) => {
          const content = (
            <>
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              {item.artist && <span>{item.artist}</span>}
            </>
          );

          return item.postUrl ? (
            <a
              className="fanArtGallery__item"
              href={item.postUrl}
              target="_blank"
              rel="noreferrer"
              key={item.id}
            >
              {content}
            </a>
          ) : (
            <figure className="fanArtGallery__item" key={item.id}>
              {content}
            </figure>
          );
        })}
        {Array.from({ length: placeholders }, (_, index) => (
          <span
            className="fanArtGallery__frame"
            aria-hidden="true"
            key={`fan-art-frame-${fanArtItems.length + index + 1}`}
          />
        ))}
      </div>
      {fanArtItems.length > 6 && (
        <button
          className="fanArtGallery__more"
          type="button"
          aria-controls="fan-art-frames"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? "閉じる" : "もっと見る"}
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [loaderPhase, setLoaderPhase] = useState<LoaderPhase>("loading");
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const musicCarouselRef = useRef<HTMLDivElement | null>(null);
  const currentPath = window.location.pathname.replace(/\/+$/, "");
  const isGuidelinePage = currentPath === "/guideline";
  const isProfilePage = currentPath === "/profile";
  const currentSeo = isGuidelinePage
    ? siteConfig.seo.guideline
    : isProfilePage
      ? siteConfig.seo.profile
      : siteConfig.seo.home;

  const scrollMusic = (direction: -1 | 1) => {
    const carousel = musicCarouselRef.current;
    if (!carousel) return;

    carousel.scrollBy({
      left: carousel.clientWidth * direction,
      behavior: "smooth"
    });
  };

  const musicPages = Array.from(
    { length: Math.ceil(siteConfig.movies.length / 4) },
    (_, pageIndex) => siteConfig.movies.slice(pageIndex * 4, pageIndex * 4 + 4)
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = reducedMotion ? 250 : 2200;
    const exitDuration = reducedMotion ? 120 : 650;
    const startedAt = window.performance.now();
    let startExitTimer = 0;
    let finishTimer = 0;
    let hasStartedExit = false;

    document.body.classList.add("is-site-loading");

    const startExit = () => {
      if (hasStartedExit) return;
      hasStartedExit = true;

      const elapsed = window.performance.now() - startedAt;
      startExitTimer = window.setTimeout(() => {
        setLoaderPhase("leaving");
        finishTimer = window.setTimeout(() => {
          setLoaderPhase("done");
          document.body.classList.remove("is-site-loading");
        }, exitDuration);
      }, Math.max(0, minimumDuration - elapsed));
    };

    if (document.readyState === "complete") {
      startExit();
    } else {
      window.addEventListener("load", startExit, { once: true });
    }

    return () => {
      window.removeEventListener("load", startExit);
      window.clearTimeout(startExitTimer);
      window.clearTimeout(finishTimer);
      document.body.classList.remove("is-site-loading");
    };
  }, []);

  useEffect(() => {
    document.title = currentSeo.title;
    updateMetaContent('meta[name="description"]', currentSeo.description);
    updateMetaContent('meta[property="og:title"]', currentSeo.title);
    updateMetaContent('meta[property="og:description"]', currentSeo.description);
    updateMetaContent('meta[name="twitter:title"]', currentSeo.title);
    updateMetaContent('meta[name="twitter:description"]', currentSeo.description);
  }, [currentSeo.description, currentSeo.title]);

  useEffect(() => {
    const updateHeader = () => setIsHeaderScrolled(window.scrollY > 24);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (isGuidelinePage || isProfilePage) return;

    const section = aboutSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsAboutVisible(true);
        observer.disconnect();
      },
      { threshold: 0.16 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isGuidelinePage, isProfilePage]);

  useEffect(() => {
    if (isGuidelinePage || isProfilePage || !window.location.hash) return;

    const correctInitialHashPosition = () => {
      window.setTimeout(() => {
        scrollToPageSection(window.location.hash, "auto", false);
      }, 0);
    };

    if (document.readyState === "complete") {
      correctInitialHashPosition();
      return;
    }

    window.addEventListener("load", correctInitialHashPosition, { once: true });
    return () => window.removeEventListener("load", correctInitialHashPosition);
  }, [isGuidelinePage, isProfilePage]);

  return (
    <>
      <SiteLoader phase={loaderPhase} />
      <main aria-busy={loaderPhase !== "done"}>
      <header
        className={`siteHeader ${isHeaderScrolled ? "is-scrolled" : ""}`}
        aria-label="サイトナビゲーション"
      >
        <HeaderLogo />
        <div className="headerRail">
          <nav className="desktopNav" aria-label="ページ内セクション">
            {siteConfig.nav
              .filter((item) => item.label !== "CONTACT")
              .map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  if (scrollToPageSection(item.href)) event.preventDefault();
                }}
              >
                <strong>{item.label}</strong>
              </a>
              ))}
          </nav>
          <div className="headerSocials" aria-label="公式SNS">
            <a href={siteConfig.links[0].href} target="_blank" rel="noreferrer" aria-label="YouTube">
              <svg className="headerSocials__youtube" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8Z" />
                <path className="headerSocials__play" d="m10 15.2 5.2-3.2L10 8.8v6.4Z" />
              </svg>
            </a>
            <a href={siteConfig.links[1].href} target="_blank" rel="noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.2 2.3h3.3l-7.2 8.2 8.5 11.2h-6.6L11 14.9l-6 6.8H1.7l7.7-8.8L1.3 2.3h6.8l4.7 6.2 5.4-6.2Zm-1.1 17.4h1.8L7.1 4.1H5.2l11.9 15.6Z" />
              </svg>
            </a>
          </div>
        </div>
        <details className="mobileMenu">
          <summary aria-label="メニューを開く">
            <span />
            <span />
          </summary>
          <div>
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  if (scrollToPageSection(item.href)) event.preventDefault();
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
              >
                <strong>{item.label}</strong>
              </a>
            ))}
          </div>
        </details>
        <a
          className="contactOrb"
          href="/#contact"
          aria-label="黄白レモへのお問い合わせ"
          onClick={(event) => {
            if (scrollToPageSection("/#contact")) event.preventDefault();
          }}
        >
          <img className="contactOrb__mascot" src="/images/contact-mascot.webp" alt="" />
          <strong>CONTACT</strong>
          <span aria-hidden="true" />
        </a>
      </header>

      {isGuidelinePage ? (
        <GuidelinePage />
      ) : isProfilePage ? (
        <ProfilePage />
      ) : (
        <>
          <section className="hero" id="top" aria-label="キービジュアル">
            <HeroVisual />
          </section>

          <section
            className="contentSection aboutSection"
            id="about"
            ref={aboutSectionRef}
          >
            <div className="sectionShell">
              <SectionTitle label="ABOUT" centered />
              <div className="aboutStage">
                <div className="aboutStage__visual">
                  <img
                    className={`aboutStage__character ${isAboutVisible ? "is-visible" : ""}`}
                    src={siteConfig.assets.keyVisualCharacter.src}
                    alt={siteConfig.assets.keyVisualCharacter.alt}
                  />
                  <div
                    className={`aboutStage__message ${isAboutVisible ? "is-visible" : ""}`}
                    aria-label="あなたと楽しいを共有したい。君の存在が私の頑張る理由"
                  >
                    <p>あなたと「楽しい」を共有したい</p>
                    <p>君の存在が私の頑張る理由</p>
                  </div>
                </div>

                <div className="aboutStage__profile">
                  <img className="aboutStage__logo" src={siteConfig.assets.logo.src} alt="" />
                  <p className="aboutStage__affiliation">
                    <img
                      className="aboutStage__affiliationLogo"
                      src={siteConfig.assets.affiliationLogo.src}
                      alt={siteConfig.assets.affiliationLogo.alt}
                    />
                  </p>
                  <div className="aboutStage__name">
                    <h3>{siteConfig.nameJa}</h3>
                    <span>{siteConfig.nameEn}</span>
                  </div>
                  <div className="aboutStage__socials" aria-label="公式SNS">
                    <a href={siteConfig.links[0].href} target="_blank" rel="noreferrer" aria-label="YouTube">
                      <img src="/icons/youtube.svg" alt="" />
                    </a>
                    <a href={siteConfig.links[1].href} target="_blank" rel="noreferrer" aria-label="X">
                      <img src="/icons/x.svg" alt="" />
                    </a>
                  </div>

                  <a className="aboutStage__profileLink" href="/profile/">
                    プロフィールを見る
                    <span aria-hidden="true">+</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="contentSection musicSection" id="music">
            <div className="sectionShell">
              <SectionTitle label="MUSIC" centered />
              <div className="musicCarousel">
                <div className="movieGrid" ref={musicCarouselRef}>
                  {musicPages.map((page, pageIndex) => (
                    <div className="musicPage" key={`music-page-${pageIndex + 1}`}>
                      {page.map((movie, itemIndex) => (
                        <a className="movieCard" href={movie.href} target="_blank" rel="noreferrer" key={movie.title}>
                          <MovieThumb
                            src={movie.image}
                            title={movie.title}
                            index={pageIndex * 4 + itemIndex}
                          />
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="musicCarousel__controls" aria-label="MUSICスライド操作">
                  <button
                    className="musicCarousel__button musicCarousel__button--prev"
                    type="button"
                    aria-label="前のMUSICへ"
                    onClick={() => scrollMusic(-1)}
                  />
                  <button
                    className="musicCarousel__button musicCarousel__button--next"
                    type="button"
                    aria-label="次のMUSICへ"
                    onClick={() => scrollMusic(1)}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="contentSection worksSection" id="works">
            <div className="sectionShell">
              <SectionTitle label="WORKS" centered />
              <div className="worksArchive">
                {siteConfig.works.map((group, index) => (
                  <details className="worksYear" key={group.year} open={index === 0}>
                    <summary>
                      <span>{group.year}</span>
                      <small>{group.items.length} WORKS</small>
                    </summary>
                    <div className="worksList">
                      {group.items.map((item) => (
                        <article className="workItem" key={`${group.year}-${item.title}`}>
                          {item.client && <span>{item.client}</span>}
                          <h3>{item.title}</h3>
                        </article>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="contentSection goodsSection" id="goods">
            <div className="sectionShell">
              <SectionTitle label="GOODS" centered />
              <div className="goodsGrid">
                {siteConfig.shopItems.map((item) => (
                  <a
                    className="goodsBanner"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    key={item.label}
                    aria-label={item.label}
                  >
                    <img src={item.image} alt={item.alt} />
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="contentSection fanArtSection" id="fan-art">
            <div className="sectionShell">
              <SectionTitle label="FAN ART GALLERY" centered />
              <FanArtGallery />
            </div>
          </section>

          <section className="contentSection contactSection" id="contact">
            <div className="sectionShell">
              <SectionTitle label="CONTACT" centered />
              <div className="contactLayout">
                <img src="/images/contact-mascot.webp" alt="" />
                <div>
                  <p>
                    スポンサーや案件など、お気軽にお問い合わせください。
                  </p>
                  <a className="contactButton" href={siteConfig.contactUrl} target="_blank" rel="noreferrer">
                    お問い合わせフォームへ
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="siteFooter">
        <a
          className="siteFooter__artLink"
          href="#top"
          aria-label="ページ上部へ戻る"
          onClick={(event) => {
            if (scrollToPageSection("#top")) event.preventDefault();
          }}
        >
          <img className="siteFooter__art" src="/images/header-contact-icon.webp" alt="" />
        </a>
        <nav aria-label="フッターナビゲーション">
          {siteConfig.nav.map((item) => (
            <a
              href={item.href}
              key={item.href}
              onClick={(event) => {
                if (scrollToPageSection(item.href)) event.preventDefault();
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <small>© 2026 All Rights Reserved.</small>
      </footer>
      </main>
    </>
  );
}
