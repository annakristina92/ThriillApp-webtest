import './App.scss';
import './styles/newsite.scss';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Main from './components/Main/main';
import Teaser from './components/Teaser/teaser';
import About from './components/About/about';
import Repertoire from './components/Repertoire/repertoire';
import Premium from './components/Premium/premium';
import Availability from './components/availability/availability';
import PrivacyPolicy from './components/PrivacyPolicy/privacyPolicy';
import { jumpTo } from './siteHelpers';

const TITLE = 'Thriill — Train Your Ear';
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

// The redesigned home page. Everything below renders inside .thriill-site
// (see src/styles/newsite.scss) so it can't clash with the App-level Bootstrap styles.
function HomePage() {
  // When arriving from another page (e.g. the privacy policy) with a section in the
  // URL, scroll to that section once it has rendered; otherwise start at the top.
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
        <Main />
        <Teaser />
        <About />
        <Repertoire />
        <Premium />
        <Availability />
      </main>
      <Footer />
    </div>
  );
}

// The privacy policy: same header, footer and dark styling as the home page, so it
// reads as part of the same site rather than a separate legacy page.
function PrivacyPage() {
  useEffect(() => {
    jumpTo(null);
  }, []);

  return (
    <div className="thriill-site">
      <Helmet>
        <title>Privacy Policy — Thriill</title>
      </Helmet>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header home={false} />
      <main id="main">
        <PrivacyPolicy />
      </main>
      <Footer home={false} />
    </div>
  );
}

// Both routes use the redesigned components under src/components. The previous
// design's Particles/Screenshots/ContactDetails components and the old Card component
// are no longer used and were removed as part of the redesign.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
