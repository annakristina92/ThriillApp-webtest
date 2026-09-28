import { PREMIUM_POINTS } from './data';
import { Reveal } from './common';
import bee from './assets/img/lesson3-bee.svg';
import skeleton from './assets/img/lesson4-skeleton.svg';
import moon from './assets/img/lesson5-moon.svg';
import eye from './assets/img/lesson6-eye.svg';
import dove from './assets/img/lesson7-dove.svg';

const FLOATING_ICONS = [
  { src: bee, pos: 'pos-1' },
  { src: skeleton, pos: 'pos-2' },
  { src: moon, pos: 'pos-3' },
  { src: eye, pos: 'pos-4' },
  { src: dove, pos: 'pos-5' },
];

const Premium = () => (
  <section className="premium" id="premium">
    <div className="premium-bg" aria-hidden="true">
      {FLOATING_ICONS.map((icon) => (
        <img key={icon.pos} className={`premium-bg-icon ${icon.pos}`} src={icon.src} alt="" />
      ))}
    </div>
    <div className="ts-container premium-inner">
      <Reveal as="p" className="eyebrow">Go further</Reveal>
      <Reveal as="h2">Free to start. Upgrade when you're ready.</Reveal>
      <Reveal as="p" className="premium-sub">
        Premium unlocks the full course library, unlimited practice and games — with a free
        trial in the app, so you can see it's worth it before you pay.
      </Reveal>
      <Reveal as="ul" className="premium-list">
        {PREMIUM_POINTS.map((point) => (
          <li key={point}>
            <span className="tick" aria-hidden="true">✓</span> {point}
          </li>
        ))}
      </Reveal>
    </div>
  </section>
);

export default Premium;
