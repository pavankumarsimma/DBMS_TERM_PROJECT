import './App.css';
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage.js';
import Explore from './pages/Explore/Explore.js';
import Search from './pages/Search/Search.js';

import Navbar from './components/Navbar/Navbar.js';
 
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
