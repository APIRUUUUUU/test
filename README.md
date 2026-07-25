:root {
  --yellow: #ffd84d;
  --yellow-deep: #d89d0f;
  --yellow-pale: #fff6c8;
  --white: #ffffff;
  --ink: #2b2923;
  --ink-soft: #6d6758;
  --line: rgba(43, 41, 35, 0.22);
  --rounded: "Arial Black", "Hiragino Kaku Gothic ProN", "Yu Gothic", "YuGothic", "Meiryo", sans-serif;
  --sans: "Hiragino Kaku Gothic ProN", "Yu Gothic", "YuGothic", "Meiryo", system-ui, sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--ink);
  background: var(--white);
  font-family: var(--sans);
}

body.is-site-loading {
  overflow: hidden;
}

body::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: radial-gradient(rgba(216, 157, 15, 0.18) 1px, transparent 1px);
  background-size: 22px 22px;
  content: "";
  pointer-events: none;
}

a {
  color: inherit;
  text-decoration: none;
}

main {
  overflow: clip;
}

.siteLoader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  overflow: hidden;
  place-items: center;
  padding: 24px;
  background: var(--white);
  opacity: 1;
  visibility: visible;
  transition:
    opacity 0.65s ease,
    visibility 0.65s ease;
}

.siteLoader::before,
.siteLoader::after {
  position: absolute;
  right: -8vw;
  left: -8vw;
  height: clamp(44px, 8vw, 96px);
  background: repeating-linear-gradient(
    135deg,
    var(--yellow) 0 28px,
    var(--white) 28px 56px
  );
  content: "";
  opacity: 0.48;
}

.siteLoader::before {
  top: 0;
}

.siteLoader::after {
  bottom: 0;
}

.siteLoader.is-leaving {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

.siteLoader__inner {
  display: grid;
  width: min(78vw, 880px);
  justify-items: center;
  gap: clamp(24px, 4vw, 42px);
}

.siteLoader__logo {
  display: block;
  width: min(56vw, 520px);
  max-height: 180px;
  object-fit: contain;
}

.siteLoader__meter {
  width: 100%;
  height: clamp(28px, 3.4vw, 38px);
  overflow: hidden;
  padding: 4px;
  border: 3px solid var(--yellow-deep);
  border-radius: 999px;
  background: var(--white);
  box-shadow: 0 8px 0 rgba(216, 157, 15, 0.18);
}

.siteLoader__fill {
  display: block;
  width: 0;
  height: 100%;
  border-radius: inherit;
  background: repeating-linear-gradient(
    135deg,
    var(--yellow) 0 20px,
    var(--white) 20px 40px
  );
  background-size: 56px 56px;
  animation:
    siteLoaderProgress 2.2s cubic-bezier(0.2, 0.78, 0.24, 1) forwards,
    siteLoaderStripes 0.7s linear infinite;
}

.siteLoader__label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: -18px 0 0;
  color: var(--yellow-deep);
  font-family: var(--rounded);
  font-size: 13px;
  letter-spacing: 0;
}

.siteLoader__label span {
  display: flex;
  gap: 5px;
}

.siteLoader__label i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--yellow);
  animation: siteLoaderDot 0.9s ease-in-out infinite;
}

.siteLoader__label i:nth-child(2) {
  animation-delay: 0.15s;
}

.siteLoader__label i:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes siteLoaderProgress {
  0% {
    width: 4%;
  }

  72% {
    width: 82%;
  }

  100% {
    width: 100%;
  }
}

@keyframes siteLoaderStripes {
  to {
    background-position: 56px 0;
  }
}

@keyframes siteLoaderDot {
  0%,
  100% {
    opacity: 0.32;
    transform: translateY(0);
  }

  50% {
    opacity: 1;
    transform: translateY(-4px);
  }
}

.siteHeader {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  display: grid;
  width: 100%;
  grid-template-columns: minmax(190px, 260px) minmax(0, 1fr) 138px;
  min-height: 116px;
  align-items: center;
  gap: clamp(20px, 3vw, 46px);
  padding: 0 clamp(16px, 2.6vw, 38px) 0 clamp(22px, 4vw, 64px);
  background: transparent;
  transition:
    background-color 0.25s ease,
    box-shadow 0.25s ease,
    min-height 0.25s ease;
}

.siteHeader.is-scrolled {
  min-height: 158px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 10px 28px rgba(43, 41, 35, 0.08);
}

.headerLogo {
  display: flex;
  width: fit-content;
  max-width: 245px;
  min-height: 68px;
  align-items: center;
}

.headerLogo img {
  display: block;
  width: auto;
  max-width: 100%;
  height: 104px;
  object-fit: contain;
  object-position: left center;
}

.headerLogo__fallback strong,
.headerLogo__fallback small {
  display: block;
}

.headerLogo__fallback strong {
  color: var(--yellow-deep);
  font-family: var(--rounded);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 900;
  line-height: 0.95;
}

.headerLogo__fallback small {
  margin-top: 8px;
  color: var(--ink-soft);
  font-family: var(--rounded);
  font-size: 0.5rem;
  font-weight: 900;
}

.headerRail {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(18px, 2.5vw, 38px);
}

.desktopNav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(15px, 2vw, 31px);
  padding: 17px clamp(22px, 2.4vw, 34px) 15px;
  border: 1px solid var(--yellow-pale);
  border-radius: 999px;
  background: var(--white);
  box-shadow: 7px 8px 0 var(--yellow);
}

.desktopNav a {
  position: relative;
  display: flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  margin: -8px -3px;
  padding: 12px 10px;
  color: var(--yellow-deep);
  font-family: var(--rounded);
  text-align: center;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.desktopNav a::after {
  position: absolute;
  right: 0;
  bottom: 1px;
  left: 0;
  height: 3px;
  border-radius: 999px;
  background: var(--yellow);
  content: "";
  opacity: 0;
  transform: scaleX(0.2);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.desktopNav a strong {
  font-size: 0.69rem;
  font-weight: 900;
  line-height: 1;
}

.desktopNav a:hover,
.desktopNav a:focus-visible,
.desktopNav a:active {
  color: var(--yellow-deep);
  transform: translateY(-2px);
}

.desktopNav a:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.headerSocials {
  display: flex;
  flex: 0 0 auto;
  gap: 9px;
}

.headerSocials a {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 2px solid var(--yellow);
  border-radius: 50%;
  background: var(--white);
  color: var(--yellow-deep);
  font-family: var(--rounded);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.headerSocials svg {
  display: block;
  width: 17px;
  height: 17px;
  fill: currentColor;
}

.headerSocials .headerSocials__youtube {
  width: 22px;
  height: 22px;
}

.headerSocials__play {
  fill: var(--white);
}

.headerSocials a:hover {
  background: var(--yellow);
  color: var(--ink);
  transform: translateY(-3px);
}

.contactOrb {
  position: relative;
  z-index: 1;
  display: grid;
  width: 138px;
  height: 138px;
  place-content: center;
  justify-items: center;
  align-self: start;
  gap: 4px;
  border-radius: 50%;
  background: var(--yellow);
  box-shadow: 0 5px 8px rgba(43, 41, 35, 0.14);
  font-family: var(--rounded);
  text-align: center;
  transform: translateY(8px);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.contactOrb__mascot {
  display: block;
  width: 54px;
  height: 54px;
  margin-bottom: 1px;
  object-fit: contain;
}

.contactOrb strong {
  font-size: 0.98rem;
  font-weight: 900;
}

.contactOrb > span {
  width: 0;
  height: 0;
  border-top: 8px solid var(--white);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}

.contactOrb:hover {
  box-shadow: 0 7px 11px rgba(43, 41, 35, 0.17);
  transform: translateY(12px);
}

.mobileMenu {
  display: none;
  position: relative;
}

.mobileMenu summary {
  display: grid;
  width: 48px;
  height: 48px;
  cursor: pointer;
  list-style: none;
  place-content: center;
  gap: 6px;
  border: 2px solid var(--yellow);
  border-radius: 50%;
  background: var(--white);
}

.mobileMenu summary::-webkit-details-marker {
  display: none;
}

.mobileMenu summary span {
  width: 20px;
  height: 2px;
  border-radius: 99px;
  background: var(--yellow-deep);
}

.mobileMenu div {
  position: absolute;
  top: calc(100% + 13px);
  right: 0;
  display: grid;
  min-width: 210px;
  gap: 4px;
  padding: 12px 18px;
  border-top: 3px solid var(--yellow);
  border-bottom: 3px solid var(--yellow);
  background: var(--white);
  box-shadow: 0 12px 24px rgba(43, 41, 35, 0.1);
}

.mobileMenu a {
  display: grid;
  align-items: center;
  padding: 13px 2px;
  border-bottom: 1px solid var(--yellow-pale);
  font-family: var(--rounded);
  font-weight: 800;
}

.mobileMenu a strong {
  color: var(--yellow-deep);
  font-size: 0.74rem;
}

.mobileMenu a:hover strong {
  color: var(--yellow-deep);
}

.hero {
  width: 100%;
  padding: 0;
  background: var(--white);
}

.heroVisual {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 0;
  aspect-ratio: 4005 / 2759;
  overflow: hidden;
  background: var(--yellow-pale);
}

.heroVisual img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.heroVisual__background {
  opacity: 0;
  filter: blur(10px) brightness(1.08);
  transform: scale(1.055);
}

.heroVisual__background.is-loaded {
  opacity: 1;
  filter: none;
  transform: scale(1);
}

.heroVisual__character {
  z-index: 1;
  opacity: 0;
  filter: blur(7px);
  transform: translate3d(0, -160px, 0) scale(1.045);
  transform-origin: center top;
}

.heroVisual__character.is-loaded {
  animation: heroCharacterDrop 4s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both;
}

.heroVisual__final {
  z-index: 2;
  opacity: 0;
  transform: scale(1.012);
  transition:
    opacity 1.4s ease,
    transform 1.4s ease;
}

.heroVisual__final.is-loaded {
  opacity: 1;
  transform: scale(1);
}

.section {
  position: relative;
  width: min(1080px, calc(100% - 48px));
  margin: 0 auto;
  padding: clamp(88px, 11vw, 136px) 0;
}

.sectionTitle {
  display: grid;
  grid-template-columns: 76px 1fr;
  align-items: center;
  gap: 22px;
  scroll-margin-top: 108px;
}

.sectionTitle::after {
  grid-column: 1 / -1;
  height: 5px;
  margin-top: 20px;
  border-radius: 99px;
  background: var(--yellow);
  box-shadow: 0 2px 0 var(--ink);
  content: "";
}

.sectionTitle__number {
  display: grid;
  width: 76px;
  height: 76px;
  place-items: center;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: var(--yellow);
  box-shadow: 4px 4px 0 var(--yellow-pale);
  font-family: var(--rounded);
  font-size: 1.3rem;
  font-weight: 900;
}

.sectionTitle p,
.sectionTitle h2 {
  margin: 0;
}

.sectionTitle p {
  font-family: var(--rounded);
  font-size: clamp(3.2rem, 8vw, 5.8rem);
  font-weight: 900;
  line-height: 0.82;
}

.sectionTitle h2 {
  margin-top: 13px;
  color: var(--ink-soft);
  font-family: var(--rounded);
  font-size: 0.95rem;
  font-weight: 700;
}

.newsList {
  display: grid;
  gap: 12px;
  margin-top: 38px;
}

.newsItem {
  display: grid;
  grid-template-columns: 116px 112px 1fr 44px;
  align-items: center;
  gap: 18px;
  min-height: 78px;
  padding: 13px 15px 13px 20px;
  border: 2px solid var(--ink);
  border-radius: 22px;
  background: var(--white);
  box-shadow: 4px 5px 0 var(--yellow-pale);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.newsItem:hover {
  box-shadow: 2px 3px 0 var(--yellow);
  transform: translate(2px, 2px);
}

.newsItem__meta {
  font-family: var(--rounded);
  font-size: 0.72rem;
  font-weight: 700;
}

.newsItem__category {
  padding: 7px 9px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--yellow-pale);
  font-family: var(--rounded);
  font-size: 0.56rem;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
}

.newsItem strong {
  font-family: var(--rounded);
  font-size: 0.92rem;
  line-height: 1.6;
}

.arrow {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: var(--yellow);
  font-size: 1.1rem;
}

.aboutGrid,
.shopSection {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 390px);
  align-items: center;
  gap: clamp(44px, 7vw, 84px);
}

.aboutText {
  max-width: 40rem;
  margin: 32px 0 0;
  font-family: var(--rounded);
  font-size: clamp(0.97rem, 1.7vw, 1.08rem);
  font-weight: 700;
  line-height: 2;
}

.profileList {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 30px;
}

.profileItem {
  min-height: 92px;
  padding: 17px 19px;
  border: 2px solid var(--ink);
  border-radius: 18px;
  background: var(--white);
}

.profileItem:nth-child(2n) {
  background: var(--yellow-pale);
}

.profileItem span {
  display: block;
  color: var(--yellow-deep);
  font-family: var(--rounded);
  font-size: 0.6rem;
  font-weight: 900;
  text-transform: uppercase;
}

.profileItem strong {
  display: block;
  margin-top: 10px;
  font-family: var(--rounded);
  font-size: 1.06rem;
}

.movieBand {
  width: calc(100% - 24px);
  margin: 0 auto;
  border: 2px solid var(--ink);
  border-radius: 36px;
  background-color: var(--yellow);
  background-image: radial-gradient(rgba(43, 41, 35, 0.16) 1.3px, transparent 1.3px);
  background-size: 20px 20px;
}

.movieSection .sectionTitle::after {
  background: var(--white);
}

.movieSection .sectionTitle__number {
  background: var(--white);
}

.movieSection .sectionTitle h2 {
  color: var(--ink);
}

.movieGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 38px;
}

.movieCard {
  overflow: hidden;
  border: 2px solid var(--ink);
  border-radius: 24px;
  background: var(--white);
  color: var(--ink);
  transition: transform 0.2s ease;
}

.movieCard:hover {
  transform: translate(2px, 3px);
}

.movieThumb {
  position: relative;
  min-height: 260px;
  overflow: hidden;
  background-color: var(--yellow-pale);
  background-image:
    radial-gradient(var(--yellow) 22%, transparent 23%),
    radial-gradient(var(--yellow) 22%, transparent 23%);
  background-position: 0 0, 20px 20px;
  background-size: 40px 40px;
}

.movieThumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.movieThumb__placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 9px 15px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--white);
  font-family: var(--rounded);
  font-size: 1.1rem;
  font-weight: 900;
  white-space: nowrap;
  transform: translate(-50%, -50%);
}

.movieThumb__play {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: var(--yellow);
}

.movieThumb__play::after {
  width: 0;
  height: 0;
  margin-left: 4px;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 11px solid var(--ink);
  content: "";
}

.shopList {
  display: grid;
  gap: 9px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.shopList li {
  border: 2px solid var(--line);
  border-radius: 999px;
  background: var(--white);
  overflow: hidden;
}

.shopList li a {
  display: grid;
  grid-template-columns: 32px 1fr auto;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  font-family: var(--rounded);
  font-size: 0.92rem;
  font-weight: 800;
}

.shopList li a > span {
  display: grid;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: var(--yellow);
  color: var(--ink);
  font-size: 0.65rem;
}

.shopList li small {
  color: var(--ink-soft);
  font-size: 0.6rem;
}

.shopList li:hover {
  border-color: var(--ink);
  background: var(--yellow-pale);
}

.guidelinePageIntro {
  position: relative;
  padding: 172px 0 72px;
  overflow: hidden;
  background: var(--white);
}

.guidelinePageIntro__inner {
  width: min(1120px, calc(100% - 56px));
  margin: 0 auto;
}

.guidelineBreadcrumb {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 34px;
  color: var(--ink-soft);
  font-family: var(--rounded);
  font-size: 0.67rem;
  font-weight: 900;
}

.guidelineBreadcrumb a {
  color: var(--yellow-deep);
}

.guidelineBreadcrumb a:hover,
.guidelineBreadcrumb a:focus-visible {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.guidelinePageIntro .sectionTitle--centered {
  width: 100%;
}

.guidelineDocument {
  width: min(100% - 48px, 880px);
  margin: 0 auto;
  padding: 100px 0 140px;
}

.guidelineDocument__heading {
  padding: 0 0 68px;
  text-align: center;
}

.guidelineDocument__heading h2 {
  margin: 0;
  font-family: var(--rounded);
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  line-height: 1.45;
}

.guidelineDocument__heading p {
  max-width: 42rem;
  margin: 26px auto 0;
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 2.1;
}

.guidelineChapters {
  border-top: 2px solid var(--yellow);
}

.guidelineChapter {
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  gap: 30px;
  padding: 50px 14px 54px;
  border-bottom: 1px solid var(--line);
}

.guidelineChapter__number {
  color: var(--yellow-deep);
  font-family: var(--rounded);
  font-size: 2.4rem;
  font-weight: 900;
  line-height: 1;
}

.guidelineChapter h3 {
  margin: 0;
  font-family: var(--rounded);
  font-size: 1.22rem;
  line-height: 1.6;
}

.guidelineChapter p {
  margin: 18px 0 0;
  color: var(--ink-soft);
  font-size: 0.94rem;
  font-weight: 700;
  line-height: 2.1;
}

.siteFooter {
  display: grid;
  width: calc(100% - 24px);
  margin: 0 auto 12px;
  place-items: center;
  gap: 8px;
  padding: 62px 20px;
  border: 2px solid var(--ink);
  border-radius: 36px;
  background: var(--yellow);
  text-align: center;
}

.siteFooter__artLink {
  display: block;
  line-height: 0;
}

.siteFooter__art {
  display: block;
  width: min(78vw, 280px);
  height: auto;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.siteFooter__artLink:hover .siteFooter__art {
  transform: translateY(-4px);
}

.siteFooter__artLink:focus-visible {
  border-radius: 8px;
  outline: 3px solid var(--ink);
  outline-offset: 6px;
}

.siteFooter p {
  margin: 7px 0 0;
  font-family: var(--rounded);
  font-size: clamp(1.25rem, 3vw, 1.8rem);
  font-weight: 900;
}

.siteFooter small {
  font-family: var(--rounded);
  font-size: 0.6rem;
  font-weight: 700;
}

.assetFrame {
  position: relative;
  display: grid;
  min-height: 320px;
  place-items: center;
  overflow: hidden;
  border: 2px solid var(--ink);
  border-radius: 26px;
  background-color: var(--yellow-pale);
  background-image:
    radial-gradient(var(--yellow) 20%, transparent 21%),
    radial-gradient(var(--yellow) 20%, transparent 21%);
  background-position: 0 0, 18px 18px;
  background-size: 36px 36px;
  box-shadow: 6px 7px 0 var(--yellow);
}

.assetFrame img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.assetFrame__content {
  display: grid;
  width: min(80%, 310px);
  justify-items: center;
  gap: 9px;
  padding: 24px 26px;
  border: 2px solid var(--ink);
  border-radius: 22px;
  background: var(--white);
  text-align: center;
}

.assetFrame__content small,
.assetFrame__content em {
  font-family: var(--rounded);
  font-size: 0.6rem;
  font-style: normal;
  font-weight: 700;
}

.assetFrame__content span {
  font-family: var(--rounded);
  font-size: clamp(1.7rem, 4vw, 2.7rem);
  font-weight: 900;
}

.assetFrame--hero {
  width: 100%;
  height: min(62.5vw, calc(100svh - 150px));
  min-height: 500px;
  border-radius: 34px;
  box-shadow: none;
}

.assetFrame--hero img {
  object-position: center;
}

.assetFrame--panel img {
  object-fit: contain;
}

@keyframes heroCharacterDrop {
  0% {
    opacity: 0;
    filter: blur(7px);
    transform: translate3d(0, -160px, 0) scale(1.045);
  }

  68% {
    opacity: 1;
    filter: blur(0);
    transform: translate3d(0, 13px, 0) scale(0.994);
  }

  84% {
    opacity: 1;
    filter: blur(0);
    transform: translate3d(0, -5px, 0) scale(1.003);
  }

  100% {
    opacity: 1;
    filter: blur(0);
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@media (max-width: 900px) {
  .siteHeader {
    grid-template-columns: minmax(0, 1fr) 48px 80px;
    min-height: 92px;
    gap: 12px;
    padding: 0 12px 0 22px;
  }

  .siteHeader.is-scrolled {
    min-height: 100px;
  }

  .headerRail {
    display: none;
  }

  .desktopNav {
    display: none;
  }

  .mobileMenu {
    display: block;
  }

  .headerLogo {
    min-width: 0;
  }

  .headerLogo img {
    height: 76px;
  }

  .contactOrb {
    width: 80px;
    height: 80px;
    gap: 2px;
    transform: translateY(6px);
  }

  .contactOrb__mascot {
    width: 29px;
    height: 29px;
    margin-bottom: 0;
  }

  .contactOrb strong {
    font-size: 0.68rem;
  }

  .contactOrb > span {
    border-top-width: 6px;
    border-right-width: 4px;
    border-left-width: 4px;
  }

  .aboutGrid,
  .shopSection,
  .movieGrid {
    grid-template-columns: 1fr;
  }

  .aboutGrid .assetFrame,
  .shopSection .assetFrame {
    width: min(100%, 520px);
    margin: 0 auto;
  }

}

@media (max-width: 640px) {
  .siteLoader {
    padding: 18px;
  }

  .siteLoader::before,
  .siteLoader::after {
    height: 48px;
    background-size: 44px 44px;
  }

  .siteLoader__inner {
    width: min(88vw, 440px);
    gap: 24px;
  }

  .siteLoader__logo {
    width: min(82vw, 390px);
  }

  .siteLoader__meter {
    height: 28px;
    padding: 3px;
    border-width: 2px;
    box-shadow: 0 5px 0 rgba(216, 157, 15, 0.18);
  }

  .siteLoader__label {
    margin-top: -12px;
    font-size: 11px;
  }

  .siteHeader {
    grid-template-columns: minmax(0, 1fr) 44px 68px;
    min-height: 80px;
    gap: 8px;
    padding: 0 8px 0 14px;
  }

  .siteHeader.is-scrolled {
    min-height: 88px;
  }

  .headerLogo {
    min-height: 52px;
  }

  .headerLogo img {
    height: 68px;
  }

  .headerLogo__fallback strong {
    font-size: 1.65rem;
  }

  .headerLogo__fallback small {
    margin-top: 5px;
    font-size: 0.4rem;
  }

  .mobileMenu summary {
    width: 42px;
    height: 42px;
  }

  .mobileMenu div {
    position: fixed;
    top: 80px;
    right: 0;
    left: 0;
  }

  .contactOrb {
    width: 68px;
    height: 68px;
  }

  .contactOrb__mascot {
    width: 25px;
    height: 25px;
  }

  .contactOrb strong {
    font-size: 0.58rem;
  }

  .hero {
    padding: 0;
  }

  .heroVisual {
    height: clamp(270px, 78vw, 310px);
    min-height: 0;
    aspect-ratio: auto;
  }

  .heroVisual img {
    object-fit: cover;
    object-position: 58% center;
  }

  .assetFrame--hero {
    height: 68svh;
    min-height: 480px;
    border-radius: 26px;
  }

  .ticker {
    width: calc(100% - 20px);
    margin-top: 10px;
  }

  .section {
    width: min(100% - 28px, 1080px);
    padding-block: 78px;
  }

  .sectionTitle {
    grid-template-columns: 58px 1fr;
    gap: 14px;
  }

  .sectionTitle__number {
    width: 58px;
    height: 58px;
    font-size: 1rem;
  }

  .sectionTitle p {
    font-size: clamp(2.5rem, 15vw, 4rem);
  }

  .sectionTitle h2 {
    margin-top: 10px;
    font-size: 0.82rem;
  }

  .newsItem {
    grid-template-columns: 88px 1fr 38px;
    gap: 9px;
    padding: 15px 12px;
    border-radius: 18px;
  }

  .newsItem__category,
  .newsItem strong {
    grid-column: 2;
  }

  .newsItem strong {
    font-size: 0.84rem;
  }

  .newsItem .arrow {
    grid-row: 1 / span 3;
    grid-column: 3;
    width: 34px;
    height: 34px;
  }

  .profileList {
    grid-template-columns: 1fr;
  }

  .movieBand,
  .siteFooter {
    width: calc(100% - 12px);
    border-radius: 28px;
  }

  .movieThumb {
    min-height: 210px;
  }

  .assetFrame__content {
    width: calc(100% - 36px);
    padding-inline: 18px;
  }

  .guidelinePageIntro {
    padding: 126px 0 54px;
  }

  .guidelinePageIntro__inner {
    width: min(100% - 30px, 1080px);
  }

  .guidelineBreadcrumb {
    margin-bottom: 26px;
  }

  .guidelineDocument {
    width: min(100% - 36px, 880px);
    padding: 70px 0 100px;
  }

  .guidelineDocument__heading {
    padding-bottom: 52px;
  }

  .guidelineDocument__heading h2 {
    font-size: 1.65rem;
  }

  .guidelineChapter {
    grid-template-columns: 54px minmax(0, 1fr);
    gap: 16px;
    padding: 38px 4px 42px;
  }

  .guidelineChapter__number {
    font-size: 1.7rem;
  }

  .guidelineChapter h3 {
    font-size: 1.04rem;
  }

  .guidelineChapter p {
    font-size: 0.88rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .siteLoader,
  .siteLoader__fill,
  .siteLoader__label i {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.12s;
  }
}

.contentSection {
  scroll-margin-top: 178px;
  padding: clamp(96px, 11vw, 148px) 0;
}

.sectionShell {
  width: min(1120px, calc(100% - 56px));
  margin: 0 auto;
}

.sectionTitle {
  display: block;
  position: relative;
  padding: 0 0 24px 24px;
  scroll-margin-top: 0;
}

.sectionTitle::before {
  position: absolute;
  top: 4px;
  bottom: 25px;
  left: 0;
  width: 7px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--yellow);
  content: "";
}

.sectionTitle::after {
  display: block;
  width: min(100%, 420px);
  height: 2px;
  margin-top: 22px;
  border: 0;
  border-radius: 0;
  background: var(--yellow);
  box-shadow: none;
  content: "";
}

.sectionTitle > span {
  display: block;
  margin-bottom: 9px;
  color: var(--yellow-deep);
  font-family: var(--rounded);
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0;
}

.sectionTitle h2 {
  margin: 0;
  color: var(--ink);
  font-family: var(--rounded);
  font-size: clamp(3.2rem, 8vw, 6.8rem);
  font-weight: 900;
  letter-spacing: 0;
  line-height: 0.84;
}

.sectionTitle p {
  margin: 16px 0 0;
  color: var(--ink-soft);
  font-family: var(--rounded);
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0;
}

.sectionTitle--centered {
  padding: 54px 24px 62px;
  overflow: hidden;
  border-top: 2px solid var(--yellow);
  border-bottom: 2px solid var(--yellow);
  background: var(--white);
  text-align: center;
}

.sectionTitle--centered::before,
.sectionTitle--centered::after {
  display: none;
}

.sectionTitle--centered h2 {
  position: relative;
  display: inline-block;
  margin: 0 auto;
  padding: 13px 50px 17px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--white);
  box-shadow: 7px 8px 0 var(--yellow);
  font-size: clamp(3.1rem, 8vw, 6.5rem);
  line-height: 0.9;
}

.sectionLead {
  max-width: 42rem;
  margin: 8px 0 0 24px;
  font-family: var(--rounded);
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 2;
}

.aboutStage {
  display: grid;
  position: relative;
  grid-template-columns: minmax(0, 1.7fr) minmax(330px, 0.95fr);
  margin-top: 48px;
  overflow: hidden;
  border-top: 2px solid var(--yellow);
  border-bottom: 2px solid var(--yellow);
  background-color: #fffef8;
  background-image:
    linear-gradient(rgba(216, 157, 15, 0.13) 1px, transparent 1px),
    linear-gradient(90deg, rgba(216, 157, 15, 0.13) 1px, transparent 1px);
  background-size: 30px 30px;
}

.aboutStage__visual {
  position: relative;
  min-height: 540px;
}

.aboutStage__visual::before {
  position: absolute;
  top: 54px;
  left: 28px;
  width: 84px;
  height: 84px;
  border-top: 3px dotted rgba(216, 157, 15, 0.56);
  border-left: 3px dotted rgba(216, 157, 15, 0.56);
  content: "";
}

.aboutStage__character {
  position: absolute;
  top: 4px;
  bottom: -6px;
  left: -28%;
  width: 128%;
  height: calc(100% + 2px);
  opacity: 0;
  object-fit: contain;
  object-position: center bottom;
  filter: blur(9px) drop-shadow(0 14px 9px rgba(43, 41, 35, 0.1));
  transform: translateY(-180px) rotate(-20deg) scale(1.015);
  transform-origin: 56% 56%;
}

.aboutStage__character.is-visible {
  animation: aboutCharacterDrop 4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes aboutCharacterDrop {
  0% {
    opacity: 0;
    filter: blur(9px) drop-shadow(0 14px 9px rgba(43, 41, 35, 0.1));
    transform: translateY(-180px) rotate(-20deg) scale(1.015);
  }

  42% {
    opacity: 0.72;
  }

  100% {
    opacity: 1;
    filter: blur(0) drop-shadow(0 14px 9px rgba(43, 41, 35, 0.1));
    transform: translateY(-24px) rotate(-20deg) scale(0.955);
  }
}

@keyframes aboutCharacterDropMobile {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(-110px) rotate(-16deg) scale(1.03);
  }

  100% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) rotate(-16deg) scale(1);
  }
}

.aboutStage__message {
  position: absolute;
  top: 30px;
  right: 12px;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.aboutStage__message p {
  margin: 0;
  min-width: 68px;
  padding: 14px 17px 18px;
  opacity: 0;
  color: var(--white);
  background: var(--yellow);
  filter: blur(5px);
  font-family: var(--rounded);
  font-size: clamp(1.05rem, 2vw, 1.4rem);
  font-feature-settings: "palt" 0;
  font-kerning: none;
  font-weight: 900;
  letter-spacing: 0.08em;
  line-height: 1.25;
  transform: translateY(-26px);
  writing-mode: vertical-rl;
}

.aboutStage__message p:first-child {
  margin-top: 40px;
}

.aboutStage__message.is-visible p:last-child {
  animation: aboutMessageReveal 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
}

.aboutStage__message.is-visible p:first-child {
  animation: aboutMessageReveal 1.35s cubic-bezier(0.16, 1, 0.3, 1) 1.15s both;
}

@keyframes aboutMessageReveal {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

.aboutStage__profile {
  position: relative;
  z-index: 3;
  align-self: center;
  padding: 46px 38px 42px 30px;
}

.aboutStage__logo {
  display: block;
  width: min(118%, 360px);
  height: 158px;
  object-fit: contain;
  object-position: left center;
}

.aboutStage__affiliation {
  margin: 8px 0 0;
}

.aboutStage__affiliationLogo {
  display: block;
  width: min(100%, 240px);
  height: 72px;
  object-fit: contain;
  object-position: left center;
}

.aboutStage__name {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-top: 18px;
}

.aboutStage__name h3 {
  margin: 0;
  font-family: var(--rounded);
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  line-height: 1;
}

.aboutStage__name > span {
  color: var(--ink-soft);
  font-family: var(--rounded);
  font-size: 0.57rem;
  font-weight: 900;
}

.aboutStage__socials {
  display: flex;
  gap: 10px;
  margin-top: 22px;
}

.aboutStage__socials a {
  display: grid;
  width: 43px;
  height: 43px;
  place-items: center;
  border-radius: 50%;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;
}

.aboutStage__socials img {
  display: block;
  width: 100%;
  height: 100%;
}

.aboutStage__socials a:hover,
.aboutStage__socials a:focus-visible {
  filter: drop-shadow(3px 4px 0 var(--yellow));
  transform: translateY(-2px);
}

.aboutStage__details {
  margin-top: 30px;
}

.aboutStage__details summary {
  display: flex;
  width: min(100%, 270px);
  min-height: 52px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 24px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--white);
  box-shadow: 5px 6px 0 var(--yellow);
  cursor: pointer;
  font-family: var(--rounded);
  font-size: 0.78rem;
  font-weight: 900;
  list-style: none;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.aboutStage__details summary::-webkit-details-marker {
  display: none;
}

.aboutStage__details summary:hover,
.aboutStage__details summary:focus-visible {
  box-shadow: 1px 2px 0 var(--yellow);
  transform: translate(2px, 2px);
}

.aboutStage__details summary span {
  color: var(--yellow-deep);
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.aboutStage__details[open] summary span {
  transform: rotate(45deg);
}

.aboutStage__detailsBody {
  margin-top: 24px;
  padding-top: 18px;
  border-top: 2px solid var(--yellow);
}

.aboutStage__detailsBody > p {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.9;
}

.aboutStage__detailsBody dl {
  display: grid;
  margin: 18px 0 0;
}

.aboutStage__detailsBody dl > div {
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 12px;
  padding: 9px 0;
  border-top: 1px solid var(--line);
}

.aboutStage__detailsBody dt,
.aboutStage__detailsBody dd {
  margin: 0;
  font-size: 0.72rem;
}

.aboutStage__detailsBody dt {
  color: var(--yellow-deep);
  font-family: var(--rounded);
  font-weight: 900;
}

.aboutStage__detailsBody dd {
  font-weight: 700;
}

.aboutStage__profileLink {
  display: flex;
  width: min(100%, 270px);
  min-height: 52px;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0 20px 0 24px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--white);
  box-shadow: 5px 6px 0 var(--yellow);
  font-family: var(--rounded);
  font-size: 0.78rem;
  font-weight: 900;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.aboutStage__profileLink span {
  color: var(--yellow-deep);
  font-size: 1.2rem;
}

.aboutStage__profileLink:hover,
.aboutStage__profileLink:focus-visible {
  box-shadow: 1px 2px 0 var(--yellow);
  transform: translate(2px, 2px);
}

@media (min-width: 1200px) and (min-height: 800px) {
  .aboutSection {
    scroll-margin-top: 178px;
    padding: 54px 0 68px;
  }

  .aboutSection .sectionTitle--centered {
    padding: 32px 24px 38px;
  }

  .aboutSection .sectionTitle--centered h2 {
    font-size: 5.2rem;
  }

  .aboutSection .aboutStage {
    margin-top: 26px;
  }

  .aboutSection .aboutStage__visual {
    min-height: 490px;
  }

  .aboutSection .aboutStage__profile {
    padding: 28px 34px 30px 26px;
  }

  .aboutSection .aboutStage__logo {
    width: min(110%, 320px);
    height: 120px;
  }

  .aboutSection .aboutStage__affiliation {
    margin-top: 4px;
  }

  .aboutSection .aboutStage__affiliationLogo {
    width: min(100%, 210px);
    height: 58px;
  }

  .aboutSection .aboutStage__name {
    margin-top: 12px;
  }

  .aboutSection .aboutStage__socials {
    margin-top: 16px;
  }

  .aboutSection .aboutStage__profileLink {
    margin-top: 20px;
  }
}

.musicSection {
  background: var(--yellow);
}

.musicSection .sectionTitle--centered {
  border-top-color: var(--white);
  border-bottom-color: var(--white);
  background: transparent;
}

.musicSection .sectionTitle--centered h2 {
  background: var(--white);
  box-shadow: 7px 8px 0 var(--yellow-deep);
}

.musicSection .sectionTitle::before {
  background: var(--white);
}

.musicSection .sectionTitle::after {
  background: var(--white);
}

.musicSection .sectionTitle > span,
.musicSection .sectionTitle p {
  color: var(--ink);
}

.musicSection .movieGrid {
  display: grid;
  grid-auto-columns: 100%;
  grid-auto-flow: column;
  grid-template-columns: none;
  margin-top: 46px;
  padding: 3px;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-behavior: smooth;
  scroll-padding-inline: 3px;
  scroll-snap-type: inline mandatory;
  scrollbar-width: none;
}

.musicSection .movieGrid::-webkit-scrollbar {
  display: none;
}

.musicSection .movieCard {
  border-radius: 8px;
}

.musicSection .movieThumb {
  min-height: 0;
  aspect-ratio: 16 / 9;
}

.musicPage {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-content: start;
  gap: 20px;
  scroll-snap-align: start;
}

.musicCarousel {
  position: relative;
}

.musicCarousel__controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
}

.musicCarousel__button {
  position: relative;
  width: 48px;
  height: 48px;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: var(--white);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.musicCarousel__button::before {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11px;
  height: 11px;
  border-top: 3px solid var(--ink);
  border-right: 3px solid var(--ink);
  content: "";
}

.musicCarousel__button--prev::before {
  transform: translate(-35%, -50%) rotate(-135deg);
}

.musicCarousel__button--next::before {
  transform: translate(-65%, -50%) rotate(45deg);
}

.musicCarousel__button:hover {
  background: var(--yellow-pale);
  transform: translateY(-2px);
}

.musicCarousel__button:focus-visible {
  outline: 3px solid var(--ink);
  outline-offset: 3px;
}

.worksArchive {
  margin-top: 48px;
}

.worksYear {
  margin-top: 18px;
}

.worksYear summary {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  min-height: 108px;
  border-top: 2px solid var(--yellow);
  border-bottom: 2px solid var(--yellow);
  background: var(--yellow-pale);
  cursor: pointer;
  list-style: none;
  align-items: center;
  gap: 24px;
  padding: 0 22px;
  transition: background-color 0.2s ease;
}

.worksYear summary::-webkit-details-marker {
  display: none;
}

.worksYear summary:hover,
.worksYear[open] summary {
  background: var(--yellow);
}

.worksYear summary > span {
  font-family: var(--rounded);
  font-size: clamp(2.4rem, 6vw, 4.7rem);
  font-weight: 900;
  line-height: 1;
}

.worksYear summary small {
  color: var(--ink);
  font-family: var(--rounded);
  font-size: 0.72rem;
  font-weight: 900;
}

.worksList {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  padding: 20px 0 34px;
}

.workItem {
  display: flex;
  min-height: 116px;
  flex-direction: column;
  justify-content: center;
  padding: 20px 22px;
  border: 2px solid var(--yellow);
  border-radius: 8px;
  background: var(--white);
}

.workItem > span {
  color: var(--yellow-deep);
  font-family: var(--rounded);
  font-size: 0.62rem;
  font-weight: 900;
}

.workItem h3 {
  margin: 12px 0 0;
  font-family: var(--rounded);
  font-size: 0.96rem;
  line-height: 1.7;
}

.workItem h3:first-child {
  margin-top: 0;
}

.goodsSection {
  background: var(--yellow);
}

.goodsSection .sectionTitle--centered {
  border-top-color: var(--white);
  border-bottom-color: var(--white);
  background: transparent;
}

.goodsSection .sectionTitle--centered h2 {
  background: var(--white);
  box-shadow: 7px 8px 0 var(--yellow-deep);
}

.goodsGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 46px;
}

.goodsBanner {
  display: block;
  overflow: hidden;
  border: 2px solid var(--ink);
  border-radius: 8px;
  background: var(--white);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.goodsBanner:hover,
.goodsBanner:focus-visible {
  box-shadow: 6px 7px 0 var(--yellow);
  transform: translateY(-4px);
}

.goodsBanner img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 550 / 309;
  object-fit: cover;
}

.fanArtSection {
  background:
    linear-gradient(rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.76)),
    repeating-linear-gradient(
      135deg,
      var(--white) 0 64px,
      var(--yellow-pale) 64px 128px
    );
}

.fanArtSection .sectionTitle--centered {
  background: transparent;
}

.fanArtSection .sectionTitle--centered h2 {
  font-size: clamp(2.7rem, 6vw, 5rem);
}

.fanArtGallery {
  display: grid;
  overflow: hidden;
  grid-template-columns: minmax(0, 1fr);
  margin-top: 46px;
  border-top: 2px solid var(--yellow);
  border-bottom: 2px solid var(--yellow);
  background: var(--white);
}

.fanArtGallery__frames {
  display: grid;
  grid-column: 1;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 24px;
}

.fanArtGallery__frames:not(.is-expanded) .fanArtGallery__item:nth-child(n + 10) {
  display: none;
}

.fanArtGallery__more {
  display: inline-flex;
  grid-column: 1;
  min-width: 180px;
  min-height: 52px;
  align-items: center;
  justify-content: center;
  justify-self: center;
  margin: 0 24px 24px;
  padding: 0 26px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--white);
  box-shadow: 5px 6px 0 var(--yellow);
  color: var(--ink);
  font-family: var(--rounded);
  font-size: 0.88rem;
  font-weight: 900;
  cursor: pointer;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.fanArtGallery__more:hover,
.fanArtGallery__more:focus-visible {
  box-shadow: 2px 3px 0 var(--yellow);
  transform: translate(3px, 3px);
}

.fanArtGallery__frame {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 1;
  border: 2px solid var(--yellow);
  background:
    radial-gradient(circle at 18% 20%, var(--yellow) 0 5px, transparent 6px),
    radial-gradient(circle at 78% 72%, var(--yellow) 0 4px, transparent 5px),
    linear-gradient(135deg, var(--white) 0 52%, var(--yellow-pale) 52% 100%);
}

.fanArtGallery__frame::before,
.fanArtGallery__frame::after {
  position: absolute;
  content: "";
}

.fanArtGallery__frame::before {
  top: 18%;
  right: 18%;
  width: 34%;
  aspect-ratio: 1;
  border: 2px solid var(--yellow-deep);
  border-radius: 50%;
  opacity: 0.48;
}

.fanArtGallery__frame::after {
  bottom: 18%;
  left: 14%;
  width: 54%;
  height: 2px;
  background: var(--yellow-deep);
  box-shadow:
    0 8px 0 rgba(216, 157, 15, 0.48),
    0 16px 0 rgba(216, 157, 15, 0.28);
  opacity: 0.6;
}

.fanArtGallery__item {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 1;
  margin: 0;
  border: 2px solid var(--yellow);
  background: var(--yellow-pale);
}

.fanArtGallery__item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.fanArtGallery__item span {
  position: absolute;
  right: 8px;
  bottom: 8px;
  left: 8px;
  overflow: hidden;
  padding: 7px 9px;
  border: 1px solid rgba(43, 41, 35, 0.28);
  background: rgba(255, 255, 255, 0.92);
  font-family: var(--rounded);
  font-size: 0.68rem;
  font-weight: 900;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fanArtGallery__item:hover img,
.fanArtGallery__item:focus-visible img {
  transform: scale(1.045);
}

.contactSection {
  background: var(--white);
}

.contactLayout {
  display: grid;
  grid-template-columns: minmax(210px, 280px) minmax(0, 1fr);
  align-items: center;
  gap: clamp(50px, 8vw, 110px);
  margin-top: 46px;
  padding: 42px clamp(38px, 7vw, 82px);
  border-top: 2px solid var(--yellow);
  border-bottom: 2px solid var(--yellow);
  background: var(--yellow-pale);
}

.contactLayout > img {
  display: block;
  width: min(100%, 260px);
  aspect-ratio: 1;
  border: 3px solid var(--ink);
  border-radius: 50%;
  background: var(--white);
  box-shadow: 9px 10px 0 var(--yellow);
  object-fit: cover;
}

.contactLayout > div > p {
  max-width: 38rem;
  margin: 0;
  font-family: var(--rounded);
  font-size: 1rem;
  font-weight: 700;
  line-height: 2;
}

.contactButton {
  display: inline-flex;
  min-height: 60px;
  align-items: center;
  gap: 30px;
  margin: 28px 0 0;
  padding: 0 26px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: var(--white);
  box-shadow: 5px 6px 0 var(--yellow);
  font-family: var(--rounded);
  font-size: 0.86rem;
  font-weight: 900;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.contactButton:hover,
.contactButton:focus-visible {
  box-shadow: 2px 3px 0 var(--yellow);
  transform: translate(3px, 3px);
}

.siteFooter {
  width: 100%;
  margin: 0;
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  border-radius: 0;
}

.siteFooter nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 22px;
  margin: 16px 0;
}

.siteFooter nav a {
  font-family: var(--rounded);
  font-size: 0.65rem;
  font-weight: 900;
}

.siteFooter nav a:hover,
.siteFooter nav a:focus-visible {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.profilePage {
  min-height: 100svh;
  background: var(--white);
}

.profilePage__layout {
  display: grid;
  grid-template-columns: minmax(470px, 48vw) minmax(0, 1fr);
  align-items: start;
}

.profileVisual {
  position: relative;
  min-width: 0;
  align-self: stretch;
  background: #fffef8;
}

.profileVisual__sticky {
  position: sticky;
  top: 0;
  height: 100svh;
  min-height: 680px;
  overflow: hidden;
  border-right: 2px solid var(--yellow);
  background-color: #fffef8;
  background-image:
    linear-gradient(rgba(216, 157, 15, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(216, 157, 15, 0.15) 1px, transparent 1px),
    repeating-linear-gradient(
      -45deg,
      transparent 0,
      transparent 74px,
      rgba(255, 216, 77, 0.16) 74px,
      rgba(255, 216, 77, 0.16) 148px
    );
  background-size: 30px 30px, 30px 30px, auto;
}

.profileVisual__sticky::before,
.profileVisual__sticky::after {
  position: absolute;
  z-index: 1;
  content: "";
  pointer-events: none;
}

.profileVisual__sticky::before {
  top: 178px;
  right: 30px;
  width: 92px;
  height: 92px;
  border-top: 4px dotted rgba(216, 157, 15, 0.58);
  border-right: 4px dotted rgba(216, 157, 15, 0.58);
}

.profileVisual__sticky::after {
  right: 58px;
  bottom: 54px;
  width: 116px;
  height: 22px;
  background: repeating-linear-gradient(
    90deg,
    var(--yellow) 0,
    var(--yellow) 15px,
    transparent 15px,
    transparent 27px
  );
}

.profileVisual__character {
  position: absolute;
  top: 90px;
  bottom: 0;
  left: -51%;
  display: block;
  width: 174%;
  height: calc(100% - 70px);
  max-width: none;
  object-fit: contain;
  object-position: center bottom;
  filter: drop-shadow(0 18px 12px rgba(43, 41, 35, 0.1));
  transform: rotate(-11deg) scale(1);
  transform-origin: 54% 52%;
}

.profileVisual__dots {
  position: absolute;
  bottom: 52px;
  left: 32px;
  width: 74px;
  height: 74px;
  background-image: radial-gradient(var(--yellow-deep) 2px, transparent 2px);
  background-size: 15px 15px;
  opacity: 0.52;
}

.profileContent {
  min-width: 0;
  padding: 164px clamp(46px, 6vw, 92px) 126px;
}

.profileBreadcrumb {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 62px;
  color: var(--ink-soft);
  font-family: var(--rounded);
  font-size: 0.66rem;
  font-weight: 900;
}

.profileBreadcrumb a {
  color: var(--yellow-deep);
}

.profileBreadcrumb a:hover,
.profileBreadcrumb a:focus-visible {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.profileIdentity {
  padding-bottom: 74px;
}

.profileIdentity__logo {
  display: block;
  width: min(100%, 480px);
  height: 184px;
  object-fit: contain;
  object-position: left center;
}

.profileIdentity__affiliation {
  display: block;
  width: min(58%, 250px);
  height: 82px;
  margin-top: 14px;
  object-fit: contain;
  object-position: left center;
}

.profileIdentity__name {
  display: flex;
  align-items: baseline;
  gap: 22px;
  margin-top: 26px;
  padding-bottom: 27px;
  border-bottom: 3px solid var(--yellow);
}

.profileIdentity__name h1 {
  margin: 0;
  font-family: var(--rounded);
  font-size: 3.45rem;
  font-weight: 900;
  line-height: 1;
}

.profileIdentity__name span {
  color: var(--ink-soft);
  font-family: var(--rounded);
  font-size: 0.64rem;
  font-weight: 900;
}

.profileIdentity__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 27px;
}

.profileIdentity__socials a {
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 10px;
  padding: 0 18px 0 10px;
  border: 2px solid var(--ink);
  border-radius: 6px;
  background: var(--white);
  box-shadow: 4px 5px 0 var(--yellow);
  font-family: var(--rounded);
  font-size: 0.72rem;
  font-weight: 900;
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.profileIdentity__socials a:hover,
.profileIdentity__socials a:focus-visible {
  box-shadow: 1px 2px 0 var(--yellow);
  transform: translate(2px, 2px);
}

.profileIdentity__socials img {
  width: 30px;
  height: 30px;
}

.profileSectionLabel {
  margin: 0;
  color: var(--yellow-deep);
  font-family: var(--rounded);
  font-size: 0.69rem;
  font-weight: 900;
}

.profileIntroduction {
  margin-inline: calc(clamp(46px, 6vw, 92px) * -1);
  padding: 68px clamp(46px, 6vw, 92px) 72px;
  border-top: 2px solid var(--yellow);
  border-bottom: 2px solid var(--yellow);
  background: var(--white);
}

.profileIntroduction__box {
  margin-top: 24px;
  padding: 46px 48px 50px;
  border-radius: 4px 56px 56px;
  background: var(--yellow);
  color: var(--ink);
  box-shadow: 0 10px 0 var(--yellow-pale);
}

.profileIntroduction__box h2 {
  margin: 0;
  color: var(--ink-soft);
  font-family: var(--rounded);
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.45;
}

.profileIntroduction__box p {
  max-width: 45rem;
  margin: 30px 0 0;
  color: var(--ink-soft);
  font-size: 1rem;
  font-weight: 700;
  line-height: 2.15;
}

.profileIntroduction__lines {
  display: grid;
  justify-items: start;
  gap: 10px;
}

.profileIntroduction__box p + p {
  margin-top: 22px;
}

.profileIntroduction__box strong {
  font-size: 1.08em;
  font-weight: 900;
}

.profileDetails {
  padding: 84px 0 10px;
}

.profileSectionHeading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 26px;
  border-bottom: 3px solid var(--yellow);
}

.profileSectionHeading h2 {
  margin: 0;
  font-family: var(--rounded);
  font-size: 1.5rem;
  font-weight: 900;
}

.profileSectionHeading--profile {
  justify-content: flex-start;
}

.profileSectionHeading--profile h2 {
  color: var(--yellow-deep);
  font-size: 2.4rem;
}

.profileDetails dl {
  margin: 0;
}

.profileDetails dl > div {
  display: grid;
  grid-template-columns: minmax(150px, 0.42fr) minmax(0, 1fr);
  align-items: center;
  gap: 28px;
  min-height: 94px;
  padding: 18px 4px;
  border-bottom: 1px solid var(--line);
}

.profileDetails dt,
.profileDetails dd {
  margin: 0;
}

.profileDetails dt span {
  display: block;
}

.profileDetails dt span {
  font-family: var(--rounded);
  font-size: 0.84rem;
  font-weight: 900;
}

.profileDetails dd {
  font-family: var(--rounded);
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.7;
  text-align: right;
}

.profileTags {
  padding: 84px 0 10px;
}

.profileTags dl {
  margin: 0;
}

.profileTags dl > div {
  display: grid;
  grid-template-columns: minmax(150px, 0.42fr) minmax(0, 1fr);
  align-items: center;
  gap: 28px;
  min-height: 82px;
  padding: 14px 4px;
  border-bottom: 1px solid var(--line);
}

.profileTags dt,
.profileTags dd {
  margin: 0;
  font-family: var(--rounded);
  font-weight: 900;
}

.profileTags dt {
  font-size: 0.84rem;
}

.profileTags dd {
  text-align: right;
}

.profileTags a {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  color: var(--ink);
  font-size: 0.95rem;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.profileTags a span {
  color: var(--yellow-deep);
  font-size: 0.76rem;
}

.profileTags a:hover,
.profileTags a:focus-visible {
  color: var(--yellow-deep);
  transform: translateX(3px);
}

.profileGallery {
  padding: 84px 0 104px;
}

.profileGallery__subtitle {
  margin: 30px 0 0;
  color: var(--yellow-deep);
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0;
  text-align: center;
}

.profileGallery__stage {
  position: relative;
  display: grid;
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  margin-top: 18px;
  place-items: center;
  overflow: hidden;
  border-radius: 8px;
  background-color: var(--yellow-pale);
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.7) 0,
    rgba(255, 255, 255, 0.7) 56px,
    transparent 56px,
    transparent 112px
  );
}

.profileGallery__image {
  position: absolute;
  top: 24px;
  left: 36px;
  display: block;
  width: calc(100% - 72px);
  height: calc(100% - 74px);
  max-width: 100%;
  object-fit: contain;
  object-position: center;
  filter: drop-shadow(0 14px 10px rgba(43, 41, 35, 0.1));
  animation: profileGalleryEnter 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.profileGallery__image.profileGallery__image--closeup {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: auto;
  height: 100%;
  max-width: none;
  object-fit: contain;
  object-position: center;
  transform-origin: center center;
  animation-name: profileGalleryEnterCloseup;
}

.profileGallery__toggle {
  position: absolute;
  z-index: 1;
  top: 16px;
  right: 16px;
  display: grid;
  width: 38px;
  height: 38px;
  cursor: pointer;
  place-items: center;
  border: 2px solid var(--yellow);
  border-radius: 50%;
  background: var(--white);
  box-shadow: 2px 3px 0 rgba(216, 157, 15, 0.2);
}

.profileGallery__toggle span,
.profileGallery__toggle span::after {
  display: block;
  width: 3px;
  height: 13px;
  border-radius: 99px;
  background: var(--yellow-deep);
  content: "";
}

.profileGallery__toggle span {
  position: relative;
  transform: translateX(-3px);
}

.profileGallery__toggle span::after {
  position: absolute;
  left: 6px;
}

.profileGallery__toggle.is-paused span {
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 11px solid var(--yellow-deep);
  border-radius: 0;
  background: transparent;
  transform: translateX(2px);
}

.profileGallery__toggle.is-paused span::after {
  display: none;
}

.profileGallery__dots {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 18px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.profileGallery__dots button {
  width: 10px;
  height: 10px;
  padding: 0;
  cursor: pointer;
  border: 0;
  border-radius: 999px;
  background: var(--white);
  box-shadow: 0 0 0 1px rgba(216, 157, 15, 0.12);
  transition:
    width 0.25s ease,
    background-color 0.25s ease;
}

.profileGallery__dots button.is-active {
  width: 28px;
  background: var(--yellow);
}

.profileGallery__costumeBoard {
  width: 100%;
  margin-top: 36px;
  overflow: hidden;
  border-radius: 8px;
}

.profileGallery__costumeBoard img {
  display: block;
  width: 100%;
  height: auto;
}

.profileTurnaround {
  margin-top: 72px;
}

.profileTurnaround__title {
  margin: 0 0 26px;
  color: var(--yellow-deep);
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0;
  text-align: center;
}

.profileTurnaround__images {
  display: grid;
  gap: 28px;
}

.profileTurnaround__images img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.profileTurnaround__images .profileTurnaround__mascot {
  width: 68%;
  justify-self: center;
}

@keyframes profileGalleryEnter {
  from {
    opacity: 0;
    transform: translateX(36px) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes profileGalleryEnterCloseup {
  from {
    opacity: 0;
    transform: translateX(calc(-50% + 30px)) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}

@media (min-width: 901px) {
  .siteHeader {
    grid-template-columns: minmax(170px, 220px) minmax(0, 1fr) 116px;
    min-height: 98px;
    gap: clamp(16px, 2.2vw, 32px);
    padding-right: clamp(18px, 2.2vw, 32px);
    padding-left: clamp(28px, 3.4vw, 52px);
  }

  .siteHeader.is-scrolled {
    min-height: 124px;
  }

  .headerLogo {
    max-width: 210px;
    min-height: 58px;
  }

  .headerLogo img {
    height: 86px;
  }

  .desktopNav {
    gap: clamp(11px, 1.5vw, 24px);
    padding: 14px clamp(18px, 2vw, 28px) 12px;
  }

  .contactOrb {
    width: 116px;
    height: 116px;
  }

  .contactOrb__mascot {
    width: 44px;
    height: 44px;
  }

  .contactOrb strong {
    font-size: 0.82rem;
  }

  .contentSection {
    scroll-margin-top: 142px;
    padding: clamp(76px, 8vw, 108px) 0;
  }

  .sectionShell {
    width: min(1000px, calc(100% - 64px));
  }

  .sectionTitle {
    padding-bottom: 20px;
    padding-left: 20px;
  }

  .sectionTitle::before {
    bottom: 21px;
    width: 6px;
  }

  .sectionTitle::after {
    width: min(100%, 360px);
    margin-top: 18px;
  }

  .sectionTitle h2 {
    font-size: clamp(3rem, 6vw, 5.4rem);
  }

  .sectionTitle p {
    margin-top: 13px;
    font-size: 0.86rem;
  }

  .sectionTitle--centered {
    padding: 42px 22px 48px;
  }

  .sectionTitle--centered h2 {
    padding: 11px 42px 14px;
    font-size: clamp(2.9rem, 6vw, 5.2rem);
  }

  .sectionLead {
    max-width: 38rem;
    margin-left: 20px;
    font-size: 0.92rem;
    line-height: 1.85;
  }

  .aboutSection {
    scroll-margin-top: 142px;
    padding: clamp(70px, 7vw, 96px) 0;
  }

  .aboutSection .sectionTitle--centered {
    padding: 40px 22px 46px;
  }

  .aboutSection .sectionTitle--centered h2 {
    font-size: clamp(2.9rem, 6vw, 5.2rem);
  }

  .aboutStage,
  .aboutSection .aboutStage {
    grid-template-columns: minmax(0, 1.55fr) minmax(290px, 0.9fr);
    margin-top: 34px;
  }

  .aboutStage__visual,
  .aboutSection .aboutStage__visual {
    min-height: 460px;
  }

  .aboutStage__message p {
    min-width: 60px;
    padding: 12px 14px 15px;
    font-size: clamp(0.92rem, 1.5vw, 1.15rem);
  }

  .aboutStage__profile,
  .aboutSection .aboutStage__profile {
    padding: 30px 30px 32px 24px;
  }

  .aboutStage__logo,
  .aboutSection .aboutStage__logo {
    width: min(108%, 300px);
    height: 116px;
  }

  .aboutStage__affiliationLogo,
  .aboutSection .aboutStage__affiliationLogo {
    width: min(100%, 200px);
    height: 56px;
  }

  .aboutStage__name h3 {
    font-size: clamp(1.55rem, 2.2vw, 2.1rem);
  }

  .aboutStage__socials {
    margin-top: 16px;
  }

  .aboutStage__socials a {
    width: 38px;
    height: 38px;
  }

  .aboutStage__profileLink {
    min-height: 48px;
    margin-top: 22px;
  }

  .musicSection .movieGrid {
    margin-top: 34px;
  }

  .musicPage {
    gap: 16px;
  }

  .musicCarousel__button {
    width: 44px;
    height: 44px;
  }

  .worksArchive {
    margin-top: 36px;
  }

  .worksYear summary {
    min-height: 90px;
    padding-inline: 18px;
  }

  .worksYear summary > span {
    font-size: clamp(2.2rem, 4.2vw, 3.8rem);
  }

  .worksList {
    gap: 12px;
    padding: 16px 0 28px;
  }

  .workItem {
    min-height: 100px;
    padding: 17px 20px;
  }

  .goodsGrid {
    gap: 16px;
    margin-top: 34px;
  }

  .fanArtGallery {
    margin-top: 34px;
  }

  .fanArtGallery__frames {
    gap: 10px;
    padding: 20px;
  }

  .contactLayout {
    grid-template-columns: minmax(180px, 230px) minmax(0, 1fr);
    gap: clamp(42px, 6vw, 72px);
    margin-top: 34px;
    padding: 34px clamp(32px, 5vw, 58px);
  }

  .contactLayout > img {
    width: min(100%, 220px);
  }

  .contactLayout > div > p {
    font-size: 0.92rem;
    line-height: 1.85;
  }

  .contactButton {
    min-height: 54px;
    margin-top: 22px;
    padding-inline: 22px;
  }

  .guidelinePageIntro {
    padding: 140px 0 56px;
  }

  .guidelinePageIntro__inner {
    width: min(1000px, calc(100% - 64px));
  }

  .guidelineBreadcrumb {
    margin-bottom: 28px;
  }

  .guidelineDocument {
    width: min(100% - 64px, 800px);
    padding: 76px 0 104px;
  }

  .guidelineDocument__heading {
    padding-bottom: 52px;
  }

  .guidelineDocument__heading h2 {
    font-size: clamp(1.7rem, 3vw, 2.25rem);
  }

  .guidelineDocument__heading p {
    margin-top: 20px;
    font-size: 0.92rem;
    line-height: 1.9;
  }

  .guidelineChapter {
    grid-template-columns: 70px minmax(0, 1fr);
    gap: 24px;
    padding: 40px 12px 44px;
  }

  .guidelineChapter__number {
    font-size: 2rem;
  }

  .guidelineChapter h3 {
    font-size: 1.12rem;
  }

  .guidelineChapter p {
    margin-top: 14px;
    font-size: 0.9rem;
    line-height: 1.95;
  }

  .siteFooter {
    gap: 6px;
    padding: 48px 20px;
  }

  .siteFooter__art {
    width: min(70vw, 230px);
  }

  .siteFooter p {
    font-size: clamp(1.15rem, 2.4vw, 1.55rem);
  }

  .profilePage__layout {
    grid-template-columns: minmax(430px, 42vw) minmax(0, 1fr);
  }

  .profileVisual__character {
    top: 96px;
    left: -27%;
    width: 154%;
    height: calc(100% - 110px);
  }

  .profileVisual__sticky::before {
    top: 150px;
    right: 26px;
    width: 78px;
    height: 78px;
  }

  .profileVisual__sticky::after {
    right: 42px;
    bottom: 42px;
    width: 100px;
  }

  .profileVisual__dots {
    bottom: 40px;
    left: 26px;
    width: 64px;
    height: 64px;
  }

  .profileContent {
    padding: 130px clamp(42px, 5vw, 72px) 96px;
  }

  .profileBreadcrumb {
    margin-bottom: 44px;
  }

  .profileIdentity {
    padding-bottom: 56px;
  }

  .profileIdentity__logo {
    width: min(100%, 400px);
    height: 148px;
  }

  .profileIdentity__affiliation {
    width: min(52%, 220px);
    height: 68px;
    margin-top: 10px;
  }

  .profileIdentity__name {
    margin-top: 20px;
    padding-bottom: 22px;
  }

  .profileIdentity__name h1 {
    font-size: 2.9rem;
  }

  .profileIdentity__socials {
    margin-top: 22px;
  }

  .profileIntroduction {
    margin-inline: calc(clamp(42px, 5vw, 72px) * -1);
    padding: 52px clamp(42px, 5vw, 72px) 56px;
  }

  .profileIntroduction__box {
    padding: 36px 40px 40px;
    border-radius: 4px 46px 46px;
  }

  .profileIntroduction__box h2 {
    font-size: 1.7rem;
  }

  .profileIntroduction__box p {
    margin-top: 24px;
    font-size: 0.94rem;
    line-height: 1.95;
  }

  .profileDetails,
  .profileTags,
  .profileGallery {
    padding-top: 64px;
  }

  .profileDetails dl > div {
    min-height: 82px;
    padding-block: 14px;
  }

  .profileTags dl > div {
    min-height: 72px;
    padding-block: 12px;
  }

  .profileGallery {
    padding-bottom: 84px;
  }

  .profileGallery__subtitle,
  .profileTurnaround__title {
    font-size: 2.1rem;
  }

  .profileGallery__stage {
    width: min(100%, 480px);
    margin-right: auto;
    margin-left: auto;
  }

  .profileGallery__costumeBoard {
    width: min(100%, 500px);
    margin-right: auto;
    margin-left: auto;
  }

  .profileTurnaround {
    margin-top: 56px;
  }
}

@media (max-width: 900px) {
  .contentSection {
    scroll-margin-top: 120px;
  }

  .profilePage__layout {
    display: block;
  }

  .profileVisual__sticky {
    position: relative;
    height: 82svh;
    min-height: 630px;
    max-height: 760px;
    border-right: 0;
    border-bottom: 2px solid var(--yellow);
  }

  .profileVisual__character {
    top: 76px;
    left: -40%;
    width: 164%;
    height: calc(100% - 50px);
  }

  .profileContent {
    padding-top: 74px;
  }

  .contactLayout {
    grid-template-columns: 1fr;
  }

  .aboutStage {
    grid-template-columns: 1fr;
  }

  .aboutStage__visual {
    min-height: 520px;
  }

  .aboutStage__character {
    left: -18%;
    width: 116%;
  }

  .aboutStage__message {
    right: 6%;
  }

  .aboutStage__profile {
    padding: 38px clamp(24px, 7vw, 64px) 46px;
    border-top: 2px solid var(--yellow);
    background: rgba(255, 255, 255, 0.84);
  }

  .worksList,
  .goodsGrid {
    grid-template-columns: 1fr;
  }

  .fanArtGallery {
    grid-template-columns: 1fr;
  }

  .fanArtGallery__frames,
  .fanArtGallery__more {
    grid-column: 1;
    grid-row: auto;
  }

  .contactLayout > img {
    width: min(55vw, 280px);
    margin: 0 auto;
  }
}

@media (max-width: 640px) {
  .profileVisual__sticky {
    height: 74svh;
    min-height: 540px;
    max-height: 680px;
  }

  .profileVisual__sticky::before {
    top: 138px;
    right: 18px;
    width: 64px;
    height: 64px;
  }

  .profileVisual__sticky::after {
    right: 24px;
    bottom: 26px;
    width: 88px;
  }

  .profileVisual__character {
    top: 82px;
    left: -47%;
    width: 194%;
    height: calc(100% - 46px);
    transform: rotate(-11deg) scale(1);
  }

  .profileVisual__dots {
    bottom: 26px;
    left: 16px;
  }

  .profileContent {
    padding: 54px 20px 84px;
  }

  .profileBreadcrumb {
    margin-bottom: 38px;
  }

  .profileIdentity {
    padding-bottom: 56px;
  }

  .profileIdentity__logo {
    width: 100%;
    height: 130px;
  }

  .profileIdentity__affiliation {
    width: min(70%, 220px);
    height: 68px;
  }

  .profileIdentity__name {
    align-items: flex-start;
    flex-direction: column;
    gap: 9px;
  }

  .profileIdentity__name h1 {
    font-size: 2.55rem;
  }

  .profileIdentity__socials {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .profileIdentity__socials a {
    padding-right: 12px;
  }

  .profileIntroduction {
    margin-inline: -20px;
    padding: 52px 20px 56px;
  }

  .profileIntroduction__box {
    padding: 34px 24px 38px;
    border-radius: 4px 38px 38px;
  }

  .profileIntroduction__box h2 {
    font-size: 1.55rem;
  }

  .profileIntroduction__box p {
    margin-top: 24px;
    font-size: 0.9rem;
  }

  .profileDetails {
    padding-top: 66px;
  }

  .profileTags {
    padding-top: 66px;
  }

  .profileGallery {
    padding-top: 66px;
  }

  .profileSectionHeading {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 20px;
  }

  .profileSectionHeading--profile h2 {
    font-size: 2rem;
  }

  .profileDetails dl > div {
    grid-template-columns: 110px minmax(0, 1fr);
    gap: 14px;
    min-height: 86px;
  }

  .profileDetails dd {
    font-size: 0.82rem;
  }

  .profileTags dl > div {
    grid-template-columns: 110px minmax(0, 1fr);
    gap: 14px;
    min-height: 76px;
  }

  .profileTags a {
    font-size: 0.82rem;
  }

  .profileGallery__stage {
    height: auto;
    aspect-ratio: 3 / 4;
    margin-top: 26px;
  }

  .profileGallery__image {
    top: 20px;
    left: 17px;
    width: calc(100% - 34px);
    height: calc(100% - 68px);
  }

  .profileGallery {
    padding-bottom: 80px;
  }

  .contentSection {
    scroll-margin-top: 106px;
    padding: 82px 0;
  }

  .sectionShell {
    width: min(100% - 30px, 1120px);
  }

  .sectionTitle {
    display: block;
    padding: 0 0 18px 18px;
  }

  .sectionTitle::before {
    width: 5px;
  }

  .sectionTitle::after {
    margin-top: 16px;
  }

  .sectionTitle h2 {
    margin: 0;
    font-size: clamp(2.8rem, 16vw, 4.5rem);
  }

  .sectionTitle p {
    margin-top: 12px;
    font-size: 0.78rem;
  }

  .sectionTitle--centered {
    padding: 38px 14px 46px;
    background-size: auto;
  }

  .sectionTitle--centered h2 {
    padding: 11px 28px 14px;
    font-size: clamp(2.7rem, 15vw, 4rem);
  }

  .sectionLead {
    margin-left: 18px;
    font-size: 0.88rem;
  }

  .aboutStage {
    margin-top: 34px;
    background-size: 24px 24px;
  }

  .aboutStage__visual {
    min-height: 410px;
    overflow: hidden;
  }

  .aboutStage__visual::before {
    top: 28px;
    left: 18px;
    width: 54px;
    height: 54px;
  }

  .aboutStage__character {
    top: 2px;
    bottom: auto;
    left: -25%;
    width: 150%;
    height: 350px;
    object-position: center;
    transform: translateY(-110px) rotate(-16deg) scale(1.03);
    transform-origin: 58% 52%;
  }

  .aboutStage__character.is-visible {
    animation-name: aboutCharacterDropMobile;
  }

  .aboutStage__message {
    top: auto;
    right: 14px;
    bottom: 14px;
    left: 14px;
    display: grid;
    gap: 8px;
  }

  .aboutStage__message p {
    width: fit-content;
    min-width: 0;
    padding: 10px 14px 11px;
    font-size: 0.82rem;
    line-height: 1.45;
    letter-spacing: 0;
    white-space: nowrap;
    writing-mode: horizontal-tb;
  }

  .aboutStage__message p:first-child {
    justify-self: start;
    margin-top: 0;
  }

  .aboutStage__message p:last-child {
    justify-self: end;
  }

  .aboutStage__profile {
    display: grid;
    justify-items: center;
    padding: 28px 20px 38px;
    text-align: center;
  }

  .aboutStage__logo {
    width: min(100%, 280px);
    height: 116px;
    object-position: center;
  }

  .aboutStage__affiliationLogo {
    object-position: center;
  }

  .aboutStage__name {
    align-items: center;
    flex-direction: column;
    gap: 8px;
  }

  .aboutStage__socials {
    justify-content: center;
  }

  .aboutStage__profileLink {
    width: 100%;
  }

  .aboutStage__details summary {
    width: 100%;
  }

  .aboutStage__detailsBody dl > div {
    grid-template-columns: 78px 1fr;
  }

  .musicSection .movieGrid {
    margin-top: 34px;
  }

  .musicPage {
    gap: 12px;
  }

  .musicPage .movieThumb__play {
    top: 8px;
    right: 8px;
    width: 38px;
    height: 38px;
  }

  .musicPage .movieThumb__play::after {
    margin-left: 3px;
    border-top-width: 5px;
    border-bottom-width: 5px;
    border-left-width: 8px;
  }

  .musicCarousel__controls {
    margin-top: 22px;
  }

  .musicCarousel__button {
    width: 44px;
    height: 44px;
  }

  .worksArchive {
    margin-top: 40px;
  }

  .worksYear summary {
    grid-template-columns: minmax(0, 1fr) auto;
    min-height: 88px;
    gap: 12px;
    padding: 0 2px;
  }

  .worksYear summary > span {
    font-size: 2.35rem;
  }

  .worksList {
    padding: 0 2px 30px;
  }

  .fanArtSection .sectionTitle--centered h2 {
    padding: 10px 14px 13px;
    font-size: clamp(1.65rem, 7.2vw, 2.2rem);
    white-space: nowrap;
  }

  .fanArtGallery__frames {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
    padding: 14px;
  }

  .fanArtGallery__frames:not(.is-expanded) .fanArtGallery__item:nth-child(n + 7) {
    display: none;
  }

  .fanArtGallery__more {
    min-width: 168px;
    min-height: 48px;
    margin: 0 14px 20px;
  }

  .workItem {
    min-height: 0;
    padding: 18px;
  }

  .contactLayout {
    gap: 42px;
  }

  .contactLayout > div > p,
  .contactButton {
    margin-left: 0;
  }

  .contactButton {
    width: 100%;
    justify-content: space-between;
  }

  .siteFooter {
    width: 100%;
    border-radius: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
