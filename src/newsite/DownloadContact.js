import { useState } from 'react';
import { SOCIALS } from './data';
import { Reveal, StoreBadges } from './common';

// The address is kept out of the page until someone asks for it (same approach as the
// previous site): it isn't in the HTML, and it's assembled from two pieces here so it
// doesn't appear as one readable string in the code either. Simple bots that scrape
// pages for "name@domain" text or mailto: links won't find it.
const MAIL_USER = 'feedback';
const MAIL_HOST = 'thriill.com';

const DownloadContact = () => {
  const [showEmail, setShowEmail] = useState(false);
  const address = `${MAIL_USER}@${MAIL_HOST}`;

  return (
    <section className="download-cta" id="download">
      <Reveal className="ts-container final-cta-inner">
        <div className="final-cta-download">
          <h2>Start training your ear today</h2>
          <p>Download Thriill on the App Store or Google Play and become a better musician.</p>
          <StoreBadges />
        </div>

        <div className="final-cta-contact" id="contact">
          <h2>Write to us</h2>
          <p>Questions, feedback, or a bug to report? We read every message.</p>
          {showEmail ? (
            <a className="ts-btn ts-btn-primary" href={`mailto:${address}`}>
              {address}
            </a>
          ) : (
            <button className="ts-btn ts-btn-primary" type="button" onClick={() => setShowEmail(true)}>
              Email
            </button>
          )}

          <div className="socials">
            <p>Follow us</p>
            <ul>
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default DownloadContact;
