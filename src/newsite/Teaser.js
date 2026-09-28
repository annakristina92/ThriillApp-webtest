import { useEffect, useRef, useState } from 'react';
import { Reveal, storeHref, usePlatform } from './common';
import lessonKeys from './assets/img/lesson-keys.svg';
import dice from './assets/img/dice.png';

// Mirrors the app's real "Natural Notes" drill (NoteSelectorFragment + PianoInstrument):
// no audio and no separate submit. The target note is shown and tapping the matching
// piano key is the answer itself. Fixed order every time: this is a sample teaser.
const SEQUENCE = ['F4', 'C4', 'G4'];
const SOLFEGE = { C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' };
const WHITE_KEYS = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
const BLACK_KEY_POSITIONS = ['12.7%', '26.4%', '55.3%', '69%', '82.7%'];
const DEFAULT_FEEDBACK = 'Tap the key that matches the note above.';
const NEXT_QUESTION_DELAY = 1400;

const Teaser = () => {
  const platform = usePlatform();
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [result, setResult] = useState(null); // 'correct' | 'wrong' | null
  const [hadMistake, setHadMistake] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const answered = picked !== null;
  const letter = SEQUENCE[qIndex].charAt(0);

  const handleKey = (note) => {
    if (answered) return;
    const correct = note === SEQUENCE[qIndex];
    setPicked(note);
    setResult(correct ? 'correct' : 'wrong');
    if (!correct) setHadMistake(true);

    timer.current = setTimeout(() => {
      if (qIndex + 1 >= SEQUENCE.length) {
        setDone(true);
      } else {
        setQIndex(qIndex + 1);
        setPicked(null);
        setResult(null);
      }
    }, NEXT_QUESTION_DELAY);
  };

  let feedback = DEFAULT_FEEDBACK;
  let feedbackKind = '';
  if (done) {
    feedback = hadMistake
      ? 'You are in the right place! Download the app and you will rock it!'
      : 'Great job! Download the app to expand your knowledge.';
  } else if (result === 'correct') {
    feedback = 'Correct answer';
    feedbackKind = ' is-correct';
  } else if (result === 'wrong') {
    feedback = 'Incorrect answer';
    feedbackKind = ' is-wrong';
  }

  const ringState = result ? ` is-${result}` : '';

  return (
    <section className="teaser" id="teaser">
      <div className="teaser-visual" aria-hidden="true">
        <img src={lessonKeys} alt="" width="640" height="640" />
      </div>
      <div className="teaser-visual-dice" aria-hidden="true">
        <img src={dice} alt="" width="300" height="300" />
      </div>
      <div className="ts-container">
        <Reveal as="h2">See it. Tap it. Get it.</Reveal>
        <Reveal as="p" className="teaser-intro">
          A small taste of a real Thriill drill. We show you a note, you tap the matching key.
        </Reveal>

        <Reveal className="teaser-widget" id="teaser-widget">
          <div className="drill-header">
            <h3>Natural Notes</h3>
            <p className="drill-tag">DRILL #1</p>
          </div>

          <div className="mini-piano" id="mini-piano">
            <div className="black-keys" aria-hidden="true">
              {BLACK_KEY_POSITIONS.map((left) => (
                <span key={left} className="key black" style={{ left }} />
              ))}
            </div>
            <div className="white-keys">
              {WHITE_KEYS.map((note) => (
                <button
                  key={note}
                  className={`key white${picked === note ? ` ${result}` : ''}`}
                  type="button"
                  aria-label={note.charAt(0)}
                  disabled={answered}
                  onClick={() => handleKey(note)}
                />
              ))}
            </div>
          </div>

          <div className="prompt-ring-wrap">
            <svg className="progress-ring" viewBox="0 0 120 120" aria-hidden="true">
              <circle className="progress-ring-track" cx="60" cy="60" r="54" />
              <circle className={`progress-ring-arc${ringState}`} cx="60" cy="60" r="54" />
            </svg>
            <div className={`prompt-ring${ringState}`}>
              <span className="prompt-letter" id="prompt-letter">
                {done ? '✓' : letter}
              </span>
              <span className="prompt-solfege" id="prompt-solfege">
                {done ? '' : SOLFEGE[letter]}
              </span>
            </div>
          </div>

          <p className={`teaser-feedback${feedbackKind}`} id="teaser-feedback" aria-live="polite">
            {feedback}
          </p>
          <a
            className="ts-btn ts-btn-primary hero-cta"
            id="teaser1-cta"
            href={storeHref(platform)}
            hidden={!done}
          >
            Get the app
          </a>
          <p className="teaser-progress" id="teaser-progress">
            {Math.min(qIndex + 1, SEQUENCE.length)} / {SEQUENCE.length}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Teaser;
