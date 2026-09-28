import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { IOS_URL, ANDROID_URL } from './siteData';
import appleBadge from './assets/apple-badge.svg';
import googleBadge from './assets/google-badge.svg';

export function detectPlatform() {
  const ua = navigator.userAgent || navigator.vendor || '';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'desktop';
}

export function usePlatform() {
  const [platform] = useState(detectPlatform);
  return platform;
}

// Where a "Get the app" button should point: the visitor's own store on a phone,
// otherwise down to the download section.
export function storeHref(platform) {
  if (platform === 'ios') return IOS_URL;
  if (platform === 'android') return ANDROID_URL;
  return '#download';
}

// #top is the sticky header itself, which stays pinned at the viewport top
// regardless of scroll position, so the browser's native anchor jump sees it as
// "already in view" and never scrolls. Scroll explicitly instead.
export function goHome(e) {
  e.preventDefault();
  jumpTo(null);
}

// Jumps straight to the top of the page, or to an element, with no animation. Asked
// for explicitly ({behavior: 'instant'}) because the stylesheet sets smooth scrolling
// and toggling that style around the call does not reliably override it.
export function jumpTo(element) {
  if (element) element.scrollIntoView({ behavior: 'instant' });
  else window.scrollTo({ top: 0, behavior: 'instant' });
}

// Fades/slides an element in the first time it scrolls into view.
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = `${className} reveal${visible ? ' is-visible' : ''}`.trim();
  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}

// YouTube embed that only gets its real src once it is about to scroll into view,
// so the player's scripts/assets don't load with the initial page.
export const LazyIframe = forwardRef(function LazyIframe({ src, title, ...rest }, forwardedRef) {
  const localRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const setRefs = useCallback(
    (node) => {
      localRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  useEffect(() => {
    const el = localRef.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setLoaded(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            observer.unobserve(el);
          }
        });
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <iframe ref={setRefs} src={loaded ? src : undefined} title={title} {...rest} />;
});

// App Store + Google Play badges; the visitor's own store goes first and is highlighted.
export function StoreBadges() {
  const platform = usePlatform();
  const ios = (
    <a
      key="ios"
      href={IOS_URL}
      className={platform === 'ios' ? 'is-primary-store' : undefined}
      aria-label="Download on the App Store"
    >
      <img src={appleBadge} alt="Download on the App Store" height="48" />
    </a>
  );
  const android = (
    <a
      key="android"
      href={ANDROID_URL}
      className={platform === 'android' ? 'is-primary-store' : undefined}
      aria-label="Get it on Google Play"
    >
      <img src={googleBadge} alt="Get it on Google Play" height="48" />
    </a>
  );
  return <div className="store-badges">{platform === 'android' ? [android, ios] : [ios, android]}</div>;
}

function legacyCopy(url, onCopied) {
  // navigator.clipboard can be denied by permissions policy with no prompt at all;
  // this older approach works in more places.
  const input = document.createElement('textarea');
  input.value = url;
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.focus();
  input.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(input);
  if (ok) onCopied();
  else window.prompt('Copy this link:', url);
}

function copyFallback(url, onCopied) {
  if (!navigator.clipboard) {
    legacyCopy(url, onCopied);
    return;
  }
  navigator.clipboard.writeText(url).then(onCopied, () => legacyCopy(url, onCopied));
}

// Native share sheet where the platform provides one, copy-link everywhere else.
export function shareLink(title, url, onCopied) {
  if (navigator.share) {
    navigator.share({ title, url }).catch((err) => {
      if (err && err.name === 'AbortError') return;
      copyFallback(url, onCopied);
    });
    return;
  }
  copyFallback(url, onCopied);
}
