import { useEffect, useRef, useState } from 'react';
import { HERO_EMBED } from '../../siteData';
import { LazyIframe, StoreBadges } from '../../siteHelpers';
import Icon from '../Icon/icon';
import heroVideo from '../../assets/piano-hands-bg.mp4';

// The hero: real background video, then the phone-frame with the actual app-in-action
// video inside (starts muted for autoplay, with an unmute toggle).
const Main = () => {
  const videoRef = useRef(null);
  const embedRef = useRef(null);
  const [unmuted, setUnmuted] = useState(false);

  // React doesn't reliably reflect the `muted` prop as an attribute, and browsers
  // only autoplay muted video, so set it on the element and start playback directly.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playing = video.play();
    if (playing && playing.catch) playing.catch(() => {});
  }, []);

  const toggleSound = () => {
    const next = !unmuted;
    setUnmuted(next);
    const frame = embedRef.current;
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: next ? 'unMute' : 'mute', args: [] }),
        '*',
      );
    }
  };

  return (
    <section className="hero">
      <video
        ref={videoRef}
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero-video-overlay" aria-hidden="true" />
      <div className="ts-container hero-inner">
        <div className="hero-copy">
          <h1>Thriill! Train Your Ear</h1>
          <p className="hero-sub">
            A fun and engaging way to learn the basics of music theory and train your ear.
          </p>
          <StoreBadges />
          <p className="hero-note">Free to start · iOS &amp; Android</p>
        </div>
        <div className="hero-visual">
          <div className="phone-frame">
            <div className="phone-screen">
              <LazyIframe
                ref={embedRef}
                id="hero-video"
                src={HERO_EMBED}
                title="Thriill in action"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
              <div className="phone-click-shield" />
            </div>
            <button
              className={`unmute-btn${unmuted ? ' is-unmuted' : ''}`}
              id="unmute-btn"
              type="button"
              aria-pressed={unmuted}
              aria-label={unmuted ? 'Mute video' : 'Unmute video'}
              onClick={toggleSound}
            >
              <Icon name="muted" className="icon-muted" />
              <Icon name="unmuted" className="icon-unmuted" />
              <span className="unmute-label" id="unmute-label">
                {unmuted ? 'Mute' : 'Unmute'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
