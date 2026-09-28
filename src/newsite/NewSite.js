import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './newsite.scss';
import Header from './Header';
import Hero from './Hero';
import Teaser from './Teaser';
import Features from './Features';
import Repertoire from './Repertoire';
import Premium from './Premium';
import DownloadContact from './DownloadContact';
import Footer from './Footer';
import { jumpTo } from './common';

const TITLE = 'Thriill — Train Your Ear';
// The page <meta name="description"> lives in public/index.html (one tag, no duplicates).
const SHARE_DESCRIPTION =
  'Learn music theory, note reading, and intervals through short interactive drills. Free on iOS and Android.';
const SITE_URL = 'https://thriill.com/';
const OG_IMAGE = `${SITE_URL}og-image.png`;

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'Thriill: Train Your Ear',
  operatingSystem: 'iOS, Android',
  applicationCategory: 'EducationApplication',
  description:
    'Ear-training app that teaches music theory, note reading, and intervals through short interactive drills.',
  url: 'https://thriill.com',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

// The redesigned home page. Everything is scoped under .thriill-site (see newsite.scss)
// so it can't clash with the rest of the app's global Bootstrap/App styles.
const NewSite = () => {
  // When arriving from another page (e.g. the privacy policy) with a section in the URL,
  // scroll to that section once it has rendered; otherwise start at the top.
  const { hash } = useLocation();
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    jumpTo(target);
  }, [hash]);

  return (
  <div className="thriill-site">
    <Helmet>
      <title>{TITLE}</title>
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Thriill" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={SHARE_DESCRIPTION} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={SHARE_DESCRIPTION} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(STRUCTURED_DATA)}</script>
    </Helmet>

    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main">
      <Hero />
      <Teaser />
      <Features />
      <Repertoire />
      <Premium />
      <DownloadContact />
    </main>
    <Footer />
  </div>
  );
};

export default NewSite;
