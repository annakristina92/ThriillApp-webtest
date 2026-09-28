import { Link } from 'react-router-dom';
import { goHome } from '../../siteHelpers';
import logo from '../../assets/logo.svg';

// `home` is true on the home page (links scroll within the page). On other pages the
// links take the visitor back to the same section of the home page.
const Footer = ({ home = true }) => {
  const link = (href, children) =>
    home ? (
      <a href={href}>{children}</a>
    ) : (
      <Link to={{ pathname: '/', hash: href }}>{children}</Link>
    );

  return (
    <footer className="site-footer">
      <div className="ts-container footer-inner">
        {home ? (
          <a className="brand" href="#top" onClick={goHome}>
            <img src={logo} alt="" width="22" height="22" />
            <span>Thriill</span>
          </a>
        ) : (
          <Link className="brand" to="/">
            <img src={logo} alt="" width="22" height="22" />
            <span>Thriill</span>
          </Link>
        )}
        <nav aria-label="Footer">
          {home ? (
            <a href="#top" onClick={goHome}>Home</a>
          ) : (
            <Link to="/">Home</Link>
          )}
          {link('#teaser', <>Try<span className="hide-mobile"> it</span></>)}
          {link('#features', 'Features')}
          {link('#repertoire', 'Repertoire')}
          {link('#premium', 'Premium')}
          <Link to="/privacy-policy">Privacy<span className="hide-mobile"> policy</span></Link>
        </nav>
        <p className="copyright">© {new Date().getFullYear()} Thriill. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
