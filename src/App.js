import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import AddSports from './AddSports';
import AddPlayer from './AddPlayer';
import CreateTeam from './CreateTeam';
import AddCoach from './AddCoach'; 
import ViewTeam from './ViewTeam';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-sports" element={<AddSports />} />
          <Route path="/add-player" element={<AddPlayer />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/add-coach" element={<AddCoach/>} /> 
          <Route path="/view-team/:teamId" element={<ViewTeam />} />

        </Routes>
      </div>


      
    </Router>
  );
}

export default App;
