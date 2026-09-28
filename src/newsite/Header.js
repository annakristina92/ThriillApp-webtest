import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from './data';
import { goHome, storeHref, usePlatform } from './common';
import logo from './assets/img/logo.svg';

// `home` is true on the home page (links scroll within the page). On other pages
// (e.g. the privacy policy) the links take the visitor back to the same section
// of the home page instead.
const Header = ({ home = true }) => {
  const [open, setOpen] = useState(false);
  const platform = usePlatform();

  const closeMenu = () => setOpen(false);

  const renderNavLink = (item) => {
    if (home) {
      return (
        <a
          href={item.href}
          onClick={(e) => {
            closeMenu();
            if (item.home) goHome(e);
          }}
        >
          {item.label}
        </a>
      );
    }
    return (
      <Link to={item.home ? '/' : { pathname: '/', hash: item.href }} onClick={closeMenu}>
        {item.label}
      </Link>
    );
  };

  const ctaClass = 'ts-btn ts-btn-primary ts-btn-small header-cta';
  // On a phone the button goes straight to the visitor's store; otherwise it goes to
  // the download section of the home page.
  const cta =
    !home && platform === 'desktop' ? (
      <Link className={ctaClass} to={{ pathname: '/', hash: '#download' }}>
        Get the app
      </Link>
    ) : (
      <a className={ctaClass} href={storeHref(platform)}>
        Get the app
      </a>
    );

  return (
    <header className="site-header" id="top">
      <div className="ts-container header-inner">
        <span className="brand">
          <img src={logo} alt="" width="28" height="28" />
          <span>Thriill</span>
        </span>

        <nav className={`main-nav${open ? ' open' : ''}`} id="main-nav" aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>{renderNavLink(item)}</li>
            ))}
          </ul>
        </nav>

        {cta}

        <button
          className="nav-toggle"
          id="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
