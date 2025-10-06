import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GeneralProvider } from './context/GeneralContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Authenticate from './pages/Authenticate';
import Client from './pages/client/Client';
import Freelancer from './pages/freelancer/Freelancer';
import Admin from './pages/admin/Admin';
import './App.css';

function App() {
  return (
    <GeneralProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Authenticate />} />
            <Route path="/client/*" element={<Client />} />
            <Route path="/freelancer/*" element={<Freelancer />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </GeneralProvider>
  );
}

export default App;