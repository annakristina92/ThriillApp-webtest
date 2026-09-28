import { useEffect, useRef, useState } from 'react';
import { LEVEL_OPTIONS, REPERTOIRE_EMBED, SHEETS } from './data';
import { LazyIframe, Reveal, shareLink } from './common';

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    <path fill="currentColor" d="M8 5v14l11-7z" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path fill="currentColor" d="M5 20h14v-2H5v2zm7-18v11.17l3.59-3.58L17 11l-5 5-5-5 1.41-1.41L12 13.17V2h0z" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18.3 5.71 12 12.01l-6.3-6.3-1.41 1.41 6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z"
    />
  </svg>
);

const SheetCard = ({ sheet, visible, onPlay, onViewSheet }) => {
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef(null);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  const showCopied = () => {
    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 1500);
  };

  const shareUrl = `https://drive.google.com/file/d/${sheet.sheetId}/view?usp=drive_web`;

  return (
    <Reveal as="article" className={`sheet-card${visible ? '' : ' is-hidden'}`}>
      <img className="sheet-thumb" src={sheet.thumb} alt="" loading="lazy" />
      <div className="sheet-body">
        <h3>{sheet.title}</h3>
        <p className="sheet-meta">
          {sheet.composer} · {sheet.levelLabel}
        </p>
        <button className="play-btn" type="button" onClick={(e) => onPlay(sheet, e.currentTarget)}>
          <PlayIcon /> Play
        </button>
      </div>
      <div className="sheet-actions">
        <button
          className="btn-icon sheet-btn"
          type="button"
          aria-label={`View ${sheet.title} sheet`}
          onClick={(e) => onViewSheet(sheet, e.currentTarget)}
        >
          <DownloadIcon />
        </button>
        <button
          className={`btn-icon share-btn${copied ? ' is-copied' : ''}`}
          type="button"
          aria-label={copied ? 'Link copied' : `Share ${sheet.title}`}
          onClick={() => shareLink(sheet.shareTitle, shareUrl, showCopied)}
        >
          {copied ? '✓' : <ShareIcon />}
        </button>
      </div>
    </Reveal>
  );
};

const Repertoire = () => {
  const [level, setLevel] = useState('all');
  const [video, setVideo] = useState(null); // sheet whose reference video is open
  const [sheetView, setSheetView] = useState(null); // sheet whose PDF is open
  const lastFocus = useRef(null);

  const visibleCount = SHEETS.filter((s) => level === 'all' || s.level === level).length;

  const closeVideo = () => {
    setVideo(null);
    if (lastFocus.current) lastFocus.current.focus();
  };
  const closeSheet = () => {
    setSheetView(null);
    if (lastFocus.current) lastFocus.current.focus();
  };

  // Escape closes whichever pop-up is open.
  useEffect(() => {
    if (!video && !sheetView) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (video) closeVideo();
      else closeSheet();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <section className="repertoire" id="repertoire">
      <div className="repertoire-video-bg" aria-hidden="true">
        <LazyIframe
          src={REPERTOIRE_EMBED}
          title=""
          frameBorder="0"
          allow="autoplay"
        />
        <div className="repertoire-click-shield" />
      </div>
      <div className="repertoire-video-overlay" aria-hidden="true" />
      <div className="ts-container">
        <Reveal as="p" className="eyebrow">Repertoire inspiration</Reveal>
        <Reveal as="p" className="repertoire-intro">
          Search fun pieces by level and type, download sheets to your device, or share them with
          family, friends, colleagues, and loved ones.
        </Reveal>

        <Reveal className="repertoire-controls">
          <select
            id="level-filter"
            aria-label="Filter by level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {LEVEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Reveal>

        <div className="sheet-list" id="sheet-list">
          {SHEETS.map((sheet) => (
            <SheetCard
              key={sheet.key}
              sheet={sheet}
              visible={level === 'all' || sheet.level === level}
              onPlay={(s, button) => {
                lastFocus.current = button;
                setVideo(s);
              }}
              onViewSheet={(s, button) => {
                lastFocus.current = button;
                setSheetView(s);
              }}
            />
          ))}
        </div>

        <p className="repertoire-empty" id="repertoire-empty" hidden={visibleCount > 0}>
          No sheets match those filters yet.
        </p>
        <p className="repertoire-note">
          A preview from the full repertoire library in the app — hundreds more by level and style.
        </p>
      </div>

      {video && (
        <div className="video-modal" id="video-modal">
          <div className="video-modal-backdrop" onClick={closeVideo} />
          <div className="video-modal-dialog" role="dialog" aria-modal="true" aria-label="Video">
            <button className="video-modal-close" type="button" aria-label="Close video" onClick={closeVideo}>
              <CloseIcon />
            </button>
            <div className="video-modal-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
                title={video.videoTitle}
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {sheetView && (
        <div className="sheet-modal" id="sheet-modal">
          <div className="video-modal-backdrop" onClick={closeSheet} />
          <div className="sheet-modal-dialog" role="dialog" aria-modal="true" aria-label="Sheet music">
            <button className="video-modal-close" type="button" aria-label="Close sheet" onClick={closeSheet}>
              <CloseIcon />
            </button>
            <div className="sheet-modal-frame">
              <iframe
                src={`https://drive.google.com/file/d/${sheetView.sheetId}/preview`}
                title={sheetView.sheetTitle}
                frameBorder="0"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Repertoire;
