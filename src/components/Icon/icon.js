import iconPlay from '../../assets/icon-play.svg';
import iconDownload from '../../assets/icon-download.svg';
import iconShare from '../../assets/icon-share.svg';
import iconClose from '../../assets/icon-close.svg';
import iconMuted from '../../assets/icon-muted.svg';
import iconUnmuted from '../../assets/icon-unmuted.svg';

const ICONS = {
  play: iconPlay,
  download: iconDownload,
  share: iconShare,
  close: iconClose,
  muted: iconMuted,
  unmuted: iconUnmuted,
};

// Renders an .svg file as a mask filled with the current text color, so a button's
// icon still follows hover/state color changes (currentColor) even though the SVG
// itself lives in assets rather than as inline markup in the component.
// The mask url is set as an inline style (not a CSS custom property referenced from
// newsite.scss) because a relative url() stored in a custom property resolves against
// the stylesheet that reads it, not against the page — which pointed at the wrong path.
const Icon = ({ name, className = '', ...rest }) => (
  <span
    className={`icon ${className}`.trim()}
    style={{
      maskImage: `url(${ICONS[name]})`,
      WebkitMaskImage: `url(${ICONS[name]})`,
    }}
    aria-hidden="true"
    {...rest}
  />
);

export default Icon;
