import { FEATURES } from './data';
import { Reveal } from './common';
import logoWordmark from './assets/img/logo-wordmark.svg';

const Features = () => (
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

export default Features;
