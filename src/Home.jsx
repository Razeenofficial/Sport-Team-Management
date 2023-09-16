import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AddSports from './AddSports';
import AddPlayer from './AddPlayer';
import CreateTeam from './CreateTeam';
import AddCoach from './AddCoach';
import './Button.css'


import NavigationDrawer from './NavigationDrawer';
import Footer from './Footer';


function Home() {
  return (
    <div className='main'>

   <NavigationDrawer/>
    

 




    <br/><br/><br/><br/><br/><br/><br/>
      <Link to="/add-sports">
        <button className="home_button">Add Sports</button>
      </Link>
      <br/><br/>
      <Link to="/add-player">
        <button className="home_button">Add Player</button>
      </Link>
      
      <br/><br/>
      <Link to="/add-coach"> 
      <button className="home_button">Add Coach</button>
    </Link>
    <br/><br/>
      <Link to="/create-team">
        <button className="home_button">Create Team</button>
      </Link>
      <br/><br/>

      <Routes>
        <Route path="/add-sports" element={<AddSports />} />
        <Route path="/add-player" element={<AddPlayer />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/add-coach" element={<AddCoach />} /> 
      </Routes>



<br/><br/><br/><br/>
      <br/><br/>
      
     <Footer/>
    </div>
  );
}

export default Home;
