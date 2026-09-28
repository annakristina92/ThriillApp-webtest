import { useEffect, useRef, useState } from 'react';
import { REPERTOIRE_EMBED } from '../../siteData';
import { LazyIframe, Reveal, shareLink } from '../../siteHelpers';
import Icon from '../Icon/icon';
import thumbSicilienne from '../../assets/thumb-sicilienne.jpg';
import thumbEtude from '../../assets/thumb-etude25.jpg';
import thumbWinterWind from '../../assets/thumb-winterwind.jpg';

const LEVEL_OPTIONS = [
  { value: 'all', label: 'Level: All' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'upper-intermediate', label: 'Upper Intermediate' },
];

const SHEETS = [
  {
    key: 'sicilienne',
    title: 'Sicilienne',
    composer: 'O. Fauré, arr. L. Putt',
    level: 'beginner',
    levelLabel: 'Beginner Level',
    thumb: thumbSicilienne,
    videoId: '3yYUUy_f_ZI',
    videoTitle: 'Sicilienne — O. Fauré',
    sheetId: '16q9R6xG_mAYmAJchnc541AcYGMVYdDK1',
    sheetTitle: 'Sicilienne — O. Fauré',
    shareTitle: 'Thriill — Sicilienne (O. Fauré)',
  },
  {
    key: 'etude-25',
    title: 'Etude Nr. 25',
    composer: 'L. Schitte',
    level: 'intermediate',
    levelLabel: 'Intermediate Level',
    thumb: thumbEtude,
    videoId: 'kix0nR0AYLg',
    videoTitle: 'Etude Nr. 25 — L. Schitte',
    sheetId: '13sa5v0OHWFCsrIKdWYPkDumzw6XGhv8J',
    sheetTitle: 'Etude Nr. 25 — L. Schitte',
    shareTitle: 'Thriill — Etude Nr. 25 (L. Schitte)',
  },
  {
    key: 'winter-wind',
    title: 'Winter Wind',
    composer: 'G. Concone',
    level: 'upper-intermediate',
    levelLabel: 'Upper Intermediate Level',
    thumb: thumbWinterWind,
    videoId: '-vBirkgcou8',
    videoTitle: 'Winter Wind — G. Concone',
    sheetId: '1GW3NCGkQmNhgNfHQYm3aJ24le_jKf5eX',
    sheetTitle: 'Winter Wind — G. Concone',
    shareTitle: 'Thriill — Winter Wind (G. Concone)',
  },
];

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
          <Icon name="play" /> Play
        </button>
      </div>
      <div className="sheet-actions">
        <button
          className="btn-icon sheet-btn"
          type="button"
          aria-label={`View ${sheet.title} sheet`}
          onClick={(e) => onViewSheet(sheet, e.currentTarget)}
        >
          <Icon name="download" />
        </button>
        <button
          className={`btn-icon share-btn${copied ? ' is-copied' : ''}`}
          type="button"
          aria-label={copied ? 'Link copied' : `Share ${sheet.title}`}
          onClick={() => shareLink(sheet.shareTitle, shareUrl, showCopied)}
        >
          {copied ? '✓' : <Icon name="share" />}
        </button>
      </div>
    </Reveal>
  );
};

// Real repertoire preview: level filter, a muted looping background video, and each
// sheet's own reference video / PDF opening in an on-site pop-up rather than a new tab.
const Repertoire = () => {
  const [level, setLevel] = useState('all');
  const [video, setVideo] = useState(null);
  const [sheetView, setSheetView] = useState(null);
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
        <LazyIframe src={REPERTOIRE_EMBED} title="" frameBorder="0" allow="autoplay" />
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
              <Icon name="close" />
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
              <Icon name="close" />
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
