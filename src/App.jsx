import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HairStyle from './components/HairStyle';
import Agency from './components/Agency';
import NewAgency from './components/NewAgency'; // Rename for proper casing

function App() {
  return (
    <Router>
      <div className="w-full max-w-full px-0 mx-auto">
        <Routes>
          <Route path="/" element={<HairStyle />} />
          <Route path="/agency" element={<Agency />} />
          <Route path="/agency1" element={<NewAgency />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
