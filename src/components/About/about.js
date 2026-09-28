import { Reveal } from '../../siteHelpers';
import logoWordmark from '../../assets/logo-wordmark.svg';

const FEATURES = [
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

const About = () => (
  <section className="features" id="features">
    <div className="features-bg" aria-hidden="true">
      <img className="features-bg-logo" src={logoWordmark} alt="" />
    </div>
    <div className="ts-container">
      <Reveal as="h2">
        Unlock the world of music theory, from notations to intervals, in a fun and engaging
        way—right at your fingertips. Ready to level up your musical skills? Sign up and start
        the journey today!
      </Reveal>
      <div className="feature-grid">
        {FEATURES.map((feature) => (
          <Reveal as="article" className="feature-card" key={feature.title}>
            <span className={`feature-icon ${feature.icon}`} aria-hidden="true" />
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
