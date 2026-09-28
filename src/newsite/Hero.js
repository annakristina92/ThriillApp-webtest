import { useEffect, useRef, useState } from 'react';
import { HERO_EMBED } from './data';
import { LazyIframe, StoreBadges } from './common';
import heroVideo from './assets/video/piano-hands-bg.mp4';

const Hero = () => {
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
              <svg className="icon-muted" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.8L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                />
              </svg>
              <svg className="icon-unmuted" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                />
              </svg>
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

export default Hero;
