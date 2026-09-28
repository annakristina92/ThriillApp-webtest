import './App.scss';
import NewSite from './newsite/NewSite';
import PrivacyPage from './newsite/PrivacyPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Both pages use the redesigned site (src/newsite). The previous design's components
// (Main, About, Screenshots, Availability, Particles, Header) are still in
// src/components, unused, for easy rollback: restore the old routes to bring the
// previous design back.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewSite />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
