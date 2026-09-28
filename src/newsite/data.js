import thumbSicilienne from './assets/img/thumb-sicilienne.jpg';
import thumbEtude from './assets/img/thumb-etude25.jpg';
import thumbWinterWind from './assets/img/thumb-winterwind.jpg';

export const IOS_URL = 'https://apps.apple.com/in/app/thriill-train-your-ear/id6744299502';
export const ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.thriill.app';

export const NAV_ITEMS = [
  { label: 'Home', href: '#top', home: true },
  { label: 'Try it', href: '#teaser' },
  { label: 'Features', href: '#features' },
  { label: 'Repertoire', href: '#repertoire' },
  { label: 'Premium', href: '#premium' },
  { label: 'Download & Contact', href: '#download' },
];

export const FEATURES = [
  {
    icon: 'icon-quiz',
    title: 'Interactive Tests',
    text: 'Train your ears, eyes, and mind with dynamic exercises that build essential music theory basics',
  },
  {
    icon: 'icon-play',
    title: 'Learn Through Play',
    text: "Enjoy a fun, game-like way to learn music! With a clear structure, it's great for all ages, from beginners to seasoned learners.",
  },
  {
    icon: 'icon-video',
    title: 'Visual Learning',
    text: 'Enjoy easy-to-follow video lessons that break down complex topics. Rewatch anytime, at your own pace!',
  },
  {
    icon: 'icon-read',
    title: 'On-the-Go Reading',
    text: 'Prefer reading? All topics are available in text format, so you can dive in whenever it suits you',
  },
];

export const LEVEL_OPTIONS = [
  { value: 'all', label: 'Level: All' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'upper-intermediate', label: 'Upper Intermediate' },
];

export const SHEETS = [
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

export const PREMIUM_POINTS = [
  'Full note & interval course library with video and text lessons',
  'Unlimited practice, no daily caps',
  'Progress tracking & scoreboard history',
  'Piano sheet repertoire library',
];

export const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/thriillapp?igsh=dWlmbWR5NWhyYnhq' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61558666558135' },
  { label: 'YouTube', href: 'https://youtube.com/@thriillapp?feature=shared' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@thriill.com?_t=8pkNUYkvnpg&_r=1' },
];

export const HERO_EMBED =
  'https://www.youtube-nocookie.com/embed/Tf2FhaH9suA?autoplay=1&mute=1&loop=1&playlist=Tf2FhaH9suA&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&controls=0&cc_load_policy=0&iv_load_policy=3&disablekb=1';

export const REPERTOIRE_EMBED =
  'https://www.youtube-nocookie.com/embed/unhLZzvQg_s?autoplay=1&mute=1&loop=1&playlist=unhLZzvQg_s&start=1&end=15&playsinline=1&rel=0&modestbranding=1&controls=0&cc_load_policy=0&iv_load_policy=3&disablekb=1';
