import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './newsite.scss';
import './privacy.scss';
import Header from './Header';
import Footer from './Footer';
import PrivacyPolicy from '../components/PrivacyPolicy/privacyPolicy';
import { jumpTo } from './common';

// The privacy policy inside the new site: same header, footer and dark styling as the
// home page. The policy text itself is the existing component, unchanged.
const PrivacyPage = () => {
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
      <main id="main" className="privacy-page">
        <div className="ts-container">
          <PrivacyPolicy />
        </div>
      </main>
      <Footer home={false} />
    </div>
  );
};

export default PrivacyPage;
